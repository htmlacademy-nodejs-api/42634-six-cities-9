import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {OfferEntity} from '../offer/offer.entity.js';
import {UserEntity} from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true, default: '' })
  public text: string;

  @prop({ ref: OfferEntity, required: true })
  public offerId: Ref<OfferEntity>;

  @prop({ required: true })
  public publicationDate: Date;

  @prop({ required: true })
  public rating: number;

  @prop({ ref: UserEntity, required: true })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
