// model/Requirements.js
import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text } from '@nozbe/watermelondb/decorators'

export default class App_Updates extends Model {
  static table = 'app_updates';
  @text('updates_id')updates_id;
  @text('phone_number')phone_number;
  @text('app_services')app_services;
  @text('app_merchants')app_merchants;
  @text('app_sku_foods')app_sku_foods;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}

