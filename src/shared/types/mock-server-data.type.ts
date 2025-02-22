import {HousingType} from './housing-type.enum.js';
import {ConvenienceType} from './convenience-type.enum.js';
import {User} from './user.type.js';
import {CityWithCoordinates, Coordinates} from './offer.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: CityWithCoordinates[];
  previewImages: string[];
  housingPhotos: string[];
  housingTypes: HousingType[];
  conveniences: ConvenienceType[];
  users: User[];
  coordinates: Coordinates[];
}
