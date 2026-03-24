// model/Post.js
import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Registration extends Model {
  static table = 'registration';
  @text('register_number')register_number;
  @text('referral_code')referral_code;
  @text('profile')profile;
  @text('firstname')firstname;
  @text('lastname')lastname;
  @text('email')email;
  @text('password')password;
  @text('gender')gender;
  @text('city')city;
}