import {HousingType} from './housing-type.enum.js';
import {ConvenienceType} from './convenience-type.enum.js';
import {User} from './user.type.js';
import {CityWithCoordinates, Coordinates} from './offer.type.js';

export type MockServerData = {
  title: string[];
  description: string[];
  publicationDate: Date[];
  city: CityWithCoordinates[];
  previewImage: string[];
  housingPhotos: string[];
  isPremium: boolean;
  isFavorites: boolean;
  rating: number[];
  housingType: HousingType[];
  roomsCount: number[];
  guestsCount: number[];
  rentalPrice: number[];
  conveniences: ConvenienceType[];
  user: User[];
  commentsCount?: number[];
  coordinates: Coordinates;
}
