// model/Requirements.js
import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text } from '@nozbe/watermelondb/decorators'

export default class App_Info extends Model {
  static table = 'app_info';
  @text('device_id')device_id;
  @text('uuid')uuid;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}

