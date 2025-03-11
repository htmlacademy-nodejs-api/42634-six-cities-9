import {HousingType} from '../../../types/housing-type.enum.js';
import {ConvenienceType} from '../../../types/convenience-type.enum.js';
import {CityWithCoordinates, Coordinates} from '../../../types/offer.type.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public publicationDate: Date;
  public city: CityWithCoordinates;
  public previewImage: string;
  public housingPhotos: string[];
  public isPremium: boolean;
  public isFavorites: boolean;
  public rating: number;
  public housingType: HousingType;
  public roomsCount: number;
  public guestsCount: number;
  public rentalPrice: number;
  public conveniences: ConvenienceType[];
  public userId: string;
  public commentsCount?: number;
  public coordinates: Coordinates;
}
