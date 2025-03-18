import {CreateOfferDto} from './dto/create-offer.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {CityWithCoordinates} from '../../types/offer.type.js';

export interface OfferService {
  create: (dto: CreateOfferDto) => Promise<DocumentType<OfferEntity>>;
  updateById: (offerId: string, dto: CreateOfferDto) => Promise<DocumentType<OfferEntity> | null>;
  deleteById: (offerId: string) => void;
  findOfferList: () => Promise<DocumentType<OfferEntity>[]>;
  findById: (offerId: string) => Promise<DocumentType<OfferEntity> | null>
  findPremiumOfferList: (city: CityWithCoordinates) => Promise<DocumentType<OfferEntity>[]>;
  findFavoritesOfferList: () => Promise<DocumentType<OfferEntity>[]>;
  addOfferToFavorites: (offerId: string) => Promise<DocumentType<OfferEntity> | null>;
  deleteOfferFromFavorites: (offerId: string) => Promise<DocumentType<OfferEntity> | null>;
  exists: (offerId: string) => Promise<boolean>;
}
