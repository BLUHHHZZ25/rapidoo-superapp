// model/Requirements.js
import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text } from '@nozbe/watermelondb/decorators'

export default class UpdateConfig extends Model {
  static table = 'update_config';
  @field('config_name') config_name;
  @field('update_version') update_version;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt
}

