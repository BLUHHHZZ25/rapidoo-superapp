// model/Requirements.js
import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text } from '@nozbe/watermelondb/decorators'

export default class BookingDetails extends Model {
    static table = 'booking_details';
    @field('address_name') address_name;
    @field('address_details') address_details;
    @field('recipient_number') recipient_number;
    @field('recipient_name') recipient_name;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt
  }
  
  