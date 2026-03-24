// model/Requirements.js
import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text } from '@nozbe/watermelondb/decorators'

export default class Booking extends Model {
  static table = 'booking';
  @text('pickupAddress')pickupAddressJson;
  @text('multipleAddress')multipleAddressJson;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}

