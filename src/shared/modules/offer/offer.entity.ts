import {defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity} from '@typegoose/typegoose';
import {HousingType} from '../../types/housing-type.enum.js';
import {UserEntity} from '../user/user.entity.js';
import {ConvenienceType} from '../../types/convenience-type.enum.js';
import {CityWithCoordinates, Coordinates} from '../../types/offer.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }, options: {
    allowMixed: Severity.ALLOW
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public title: string;

  @prop({ required: true })
  public description: string;

  @prop({ required: true })
  public publicationDate: Date;

  @prop({ required: true, type: Object })
  public city: CityWithCoordinates;

  @prop({ required: true })
  public previewImage: string;

  @prop({ required: true })
  public housingPhotos: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorites: boolean;

  @prop({ required: true })
  public rating: number;

  @prop({ required: true, type: String, enum: HousingType })
  public housingType: HousingType;

  @prop({ required: true, default: 1 })
  public roomsCount: number;

  @prop({ required: true, default: 1 })
  public guestsCount: number;

  @prop({ required: true })
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
