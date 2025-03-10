import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {CityType} from '../../types/city-type.enum.js';
import {HousingType} from '../../types/housing-type.enum.js';
import {UserEntity} from '../user/user.entity.js';
import {ConvenienceType} from '../../types/convenience-type.enum.js';
import {Coordinates} from '../../types/offer.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, min: 10, max: 100 })
  public title: string;

  @prop({ required: true, min: 20, max: 1024 })
  public description: string;

  @prop({ required: true })
  public publicationDate: Date;

  @prop({ required: true, type: String, enum: CityType })
  public city: CityType;

  @prop({ required: true })
  public previewImage: string;

  @prop({ required: true })
  public housingPhotos: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorites: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating: number;

  @prop({ required: true, type: String, enum: HousingType })
  public housingType: HousingType;

  @prop({ required: true, min: 1, max: 8, default: 1 })
  public roomsCount: number;

  @prop({ required: true, min: 1, max: 10, default: 1 })
  public guestsCount: number;

  @prop({ required: true, min: 100, max: 100000 })
  public rentalPrice: number;

  @prop({ required: true, type: () => [String], enum: ConvenienceType })
  public conveniences: ConvenienceType[];

  @prop({ required: true, ref: UserEntity })
  public userId: Ref<UserEntity>;

  @prop({ required: true, default: 0 })
  public commentsCount: number;

  @prop({ required: true, type: Object })
  public coordinates: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
