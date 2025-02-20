import {FileReader} from './file-reader.interface.js';
import {CityWithCoordinates, Coordinates, Offer} from '../../types/offer.type.js';
import {CityType} from '../../types/city-type.enum.js';
import {HousingType} from '../../types/housing-type.enum.js';
import {readFileSync} from 'node:fs';
import {ConvenienceType} from '../../types/convenience-type.enum.js';
import {User, UserVariant} from '../../types/user.type.js';

export class TsvFileReader implements FileReader {
  private rowData = '';

  constructor(private readonly fileName: string) {}

  private validateRowData() {
    if (!this.rowData) {
      throw new Error('File was not read');
    }
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

  private parseRowDataToOffers(): Offer[] {
    return this.rowData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  public read() {
    this.rowData = readFileSync(this.fileName, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    this.validateRowData();
    return this.parseRowDataToOffers();
  }
}
