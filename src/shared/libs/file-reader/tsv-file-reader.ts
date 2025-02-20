import {FileReader} from './file-reader.interface.js';
import {Offer} from '../../types/offer.type.js';
import {CityType} from '../../types/city-type.enum.js';
import {HousingType} from '../../types/housing-type.enum.js';
import {readFileSync} from 'node:fs';

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
      authorId,
      commentsCount,
      coordinates,
    ] = line.split('\t');

    return {
      title,
      description,
      publicationDate: new Date(publicationDate),
      city: CityType.Amsterdam,
      previewImage,
      housingPhotos: [],
      isPremium: false,
      isFavorites: false,
      rating: 0,
      housingType: HousingType.Apartment,
      roomsCount: this.parseStringToNumber(roomsCount),
      guestsCount: this.parseStringToNumber(guestsCount),
      rentalPrice: this.parseStringToNumber(rentalPrice),
      conveniences: [],
      authorId,
      commentsCount: this.parseStringToNumber(commentsCount),
      coordinates: { latitude: 0, longitude: 0 }
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
