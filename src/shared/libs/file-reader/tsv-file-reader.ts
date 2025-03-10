import {FileReader} from './file-reader.interface.js';
import {CityWithCoordinates, Coordinates, Offer} from '../../types/offer.type.js';
import {CityType} from '../../types/city-type.enum.js';
import {HousingType} from '../../types/housing-type.enum.js';
import {ConvenienceType} from '../../types/convenience-type.enum.js';
import {User, UserVariant} from '../../types/user.type.js';
import {EventEmitter} from 'node:events';
import {createReadStream} from 'node:fs';

const CHUNK_SIZE = 16384; // 16KB

export class TsvFileReader extends EventEmitter implements FileReader {
  constructor(private readonly fileName: string) {
    super();
  }

  private parseStringToNumber(str: string) {
    return Number.parseInt(str, 10);
  }

  private parseStringToBoolean(str: string) {
    return str.toLowerCase() === 'true';
  }

  private parseCityWithCoords(str: string): CityWithCoordinates {
    const [city, lat, lon] = str.split(',');

    return { city: city as CityType, coordinates: { latitude: Number(lat), longitude: Number(lon) } };
  }

  private parseStringToArray(str: string) {
    return str
      .split(',')
      .map((item) => item.trim());
  }

  private parseCoords(str: string): Coordinates {
    const [lat, lon] = str.split(',');

    return { latitude: Number(lat), longitude: Number(lon) };
  }

  private parseStringToUser(str: string): User {
    const [name, email, avatar, password, userType] = str.split(',');

    return { name, email, avatar, password, userType: userType as UserVariant };
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      publicationDate,
      city,
      previewImage,
      housingPhotos,
      isPremium,
      isFavorites,
      rating,
      housingType,
      roomsCount,
      guestsCount,
      rentalPrice,
      conveniences,
      user,
      commentsCount,
      coordinates,
    ] = line.split('\t');

    return {
      title,
      description,
      publicationDate: new Date(publicationDate),
      city: this.parseCityWithCoords(city),
      previewImage,
      housingPhotos: this.parseStringToArray(housingPhotos),
      isPremium: this.parseStringToBoolean(isPremium),
      isFavorites: this.parseStringToBoolean(isFavorites),
      rating: Number(rating),
      housingType: housingType as HousingType,
      roomsCount: this.parseStringToNumber(roomsCount),
      guestsCount: this.parseStringToNumber(guestsCount),
      rentalPrice: this.parseStringToNumber(rentalPrice),
      conveniences: this.parseStringToArray(conveniences) as ConvenienceType[],
      user: this.parseStringToUser(user),
      commentsCount: this.parseStringToNumber(commentsCount),
      coordinates: this.parseCoords(coordinates)
    };
  }

  public async read() {
    // Создаем поток чтения файла с заданным размером чанка и кодировкой
    const readStream = createReadStream(this.fileName, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf8',
    });

    let buffer = ''; // Буфер для хранения данных, которые еще не обработаны
    let importedRowCount = 0; // Счетчик импортированных строк

    // Асинхронно читаем файл чанками
    for await (const chunk of readStream) {
      buffer += chunk; // Добавляем текущий чанк в буфер

      // Обрабатываем строки, пока в буфере есть символ новой строки (\n)
      let newlineIndex;
      while ((newlineIndex = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, newlineIndex).trim(); // Извлекаем строку до \n и удаляем пробелы
        buffer = buffer.slice(newlineIndex + 1); // Оставляем остаток после \n

        if (line) { // Если строка не пустая, парсим и обрабатываем
          const parsedOffer = this.parseLineToOffer(line);

          await new Promise((resolve) => {
            this.emit('line', parsedOffer, resolve);
          });

          importedRowCount++;
        }
      }
    }

    // Если после чтения остались данные в буфере (без завершающего \n), обрабатываем их
    if (buffer.trim()) {
      const parsedOffer = this.parseLineToOffer(buffer.trim());
      this.emit('line', parsedOffer);
      importedRowCount++;
    }

    // Генерируем событие 'end' после завершения обработки файла
    this.emit('end', importedRowCount);
  }
}
