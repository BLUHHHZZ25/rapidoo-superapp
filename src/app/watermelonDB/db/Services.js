// model/Requirements.js
import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text } from '@nozbe/watermelondb/decorators'

export default class Services extends Model {
  static table = 'services';
  // @text('service_id')service_id;
  // @text('name')name;
  // @text('key')key;
  // @field('is_active')is_active;
  // @text('status')status;
  // @text('img')img;
  @field('services') services;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
  // @text('version')version;
}

