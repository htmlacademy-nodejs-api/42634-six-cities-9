import {OfferGenerator} from './offer-generator.interface.js';
import {MockServerData} from '../../types/mock-server-data.type.js';
import {CityWithCoordinates} from '../../types/offer.type.js';
import {getRandomBoolean} from '../../helpers/getRandomBoolean.js';
import {getRandomItem} from '../../helpers/getRandomItem.js';
import {generateRandomNumber} from '../../helpers/generateRandomValue.js';
import {getRandomItems} from '../../helpers/getRandomItems.js';
import dayjs from 'dayjs';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 8;

const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 10;

const MIN_RENTAL_PRICE = 100;
const MAX_RENTAL_PRICE = 100000;

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mock: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mock.titles);
    const description = getRandomItem(this.mock.descriptions);
    const publicationDate = dayjs()
      .subtract(generateRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city: CityWithCoordinates = getRandomItem(this.mock.cities);
    const previewImage = getRandomItem(this.mock.previewImages);
    const housingPhotos = getRandomItems(this.mock.housingPhotos).join(';');
    const isPremium = getRandomBoolean();
    const isFavorites = getRandomBoolean();
    const rating = generateRandomNumber(MIN_RATING, MAX_RATING);
    const housingType = getRandomItem(this.mock.housingTypes);
    const roomsCount = generateRandomNumber(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT);
    const guestsCount = generateRandomNumber(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT);
    const rentalPrice = generateRandomNumber(MIN_RENTAL_PRICE, MAX_RENTAL_PRICE);
    const conveniences = getRandomItems(this.mock.conveniences).join(';');
    const user = getRandomItem(this.mock.users);
    const coordinates = getRandomItem(this.mock.coordinates);

    return [
      title,
      description,
      publicationDate,
      city,
      previewImage,
      housingPhotos,
      isPremium,
      isFavorites,
      rating,
      housingType,
      roomsCount,
      guestsCount,
      rentalPrice,
      conveniences,
      user,
      coordinates
    ].join('\t');
  }
}
