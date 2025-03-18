import {CreateOfferDto} from '../offer/dto/create-offer.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';

export interface CommentService {
  create: (dto: CreateOfferDto) => Promise<DocumentType<CommentEntity>>
  findByOfferId: (offerId: string) => Promise<DocumentType<CommentEntity>[]>
  deleteByOfferId: (offerId: string) => Promise<number | null>
}
