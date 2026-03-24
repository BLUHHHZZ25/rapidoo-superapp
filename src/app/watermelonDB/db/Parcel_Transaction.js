// model/Post.js
import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Parcel_Transaction extends Model {
  static table = 'parcel_transaction';
  @text('account_id')account_id;
  @text('rider_account_id')rider_account_id;
  @text('transaction_id')transaction_id;
  @text('pickup_address')pickup_address;
  @text('dropoff_address')dropoff_address;
  @text('notes')notes;
  @text('total_distance')total_distance;
  @text('sender_payment')sender_payment;
  @text('multiple_dropoff')multiple_dropoff;
  @text('status')status;
  @text('tip')tip;
  @text('price')price;
  @text('date_createdAt')date_createdAt;
  @text('date_updatedAt')date_updatedAt;
}