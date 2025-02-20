import {CityType} from './city-type.enum.js';
import {HousingType} from './housing-type.enum.js';
import {ConvenienceType} from './convenience-type.enum.js';

type Coordinates = {
  latitude: number;
  longitude: number;
}

export type Offer = {
  title: string;
  description: string;
  publicationDate: string;
  city: CityType;
  previewImage: string;
  housingPhotos: string[];
  isPremium: boolean;
  isFavorites: boolean;
  rating: number;
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  rentalPrice: number;
  conveniences: ConvenienceType[];
  authorId: string;
  commentsCount?: number;
  coordinates: Coordinates;
}
