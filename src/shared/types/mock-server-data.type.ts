import {User} from './user.type.js';
import {CityWithCoordinates, Coordinates} from './offer.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: CityWithCoordinates[];
  previewImages: string[];
  housingPhotos: string[];
  users: User[];
  coordinates: Coordinates;
}
