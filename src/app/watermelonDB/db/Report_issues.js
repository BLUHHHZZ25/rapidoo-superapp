// model/Requirements.js
import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text } from '@nozbe/watermelondb/decorators'

export default class Report_Issues extends Model {
  static table = 'report_issues';
  @text('report_id')report_id;
  @text('username')username;
  @text('subject')subject;
  @text('types')types;
  @text('message')message;
  @text('is_confirm')is_confirm;
  @text('update_file')update_file;
  @text('is_active')is_active;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}

