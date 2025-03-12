import {CityType} from './city-type.enum.js';
import {HousingType} from './housing-type.enum.js';
import {ConvenienceType} from './convenience-type.enum.js';
import {User} from './user.type.js';

export type Coordinates = {
  latitude: number;
  longitude: number;
}

export type CityWithCoordinates = { city: CityType, coordinates: Coordinates };

export type Comment = {
  text: string;
  publicationDate: Date;
  rating: number;
  author: User;
}

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: CityWithCoordinates;
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
  user: User;
  commentsCount?: number;
  coordinates: Coordinates;
}
