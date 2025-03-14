import {CreateOfferDto} from './dto/create-offer.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';

export interface OfferService {
  create: (dto: CreateOfferDto) => Promise<DocumentType<OfferEntity>>;
  updateById: (offerId: string) => Promise<DocumentType<OfferEntity>>;
  deleteById: (offerId: string) => void;
  findOfferList: () => Promise<DocumentType<OfferEntity>[]>;
  findById: (offerId: string) => Promise<DocumentType<OfferEntity> | null>
  findPremiumOfferList: () => Promise<DocumentType<OfferEntity>[]>;
  findFavoritesOfferList: () => Promise<DocumentType<OfferEntity>[]>;
  addOfferToFavorites: (offerId: string) => Promise<DocumentType<OfferEntity>>;
  deleteOfferFromFavorites: (offerId: string) => Promise<DocumentType<OfferEntity>>;
  incrementCommentCount: (offerId: string) => Promise<DocumentType<OfferEntity | null>>
  exists: (offerId: string) => boolean;
}
