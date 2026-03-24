// model/schema
import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
  version: 16,
  tables: [
    tableSchema({
      name: 'registration',
      columns: [
        { name: 'profile', type: 'string' },
        { name: 'register_number', type: 'string' },
        { name: 'device_id', type: 'string' },
        { name: 'referral_code', type: 'string' },
        { name: 'firstname', type: 'string' },
        { name: 'lastname', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'city', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'parcel_transaction',
      columns: [
        { name: 'account_id', type: 'string' },
        { name: 'rider_account_id', type: 'string' },
        { name: 'transaction_id', type: 'string' },
        { name: 'pickup_address', type: 'string' },
        { name: 'dropoff_address', type: 'string' },// (arrayObject): multiple == true? 2(objectArray): 1(objectArray) notes: details of client && distance inside of dropOff
        { name: 'notes', type: 'string' },
        { name: 'total_distance', type: 'string' },
        { name: 'sender_payment', type: 'string' },// payment if sender or reciever yung payment   
        { name: 'multiple_dropoff', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'tip', type: 'string' },
        { name: 'price', type: 'string' },
        { name: 'date_createdAt', type: 'string' },
        { name: 'date_updatedAt', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'services',
      columns: [
        { name: 'services', type: 'string' },
        // { name: 'name', type: 'string' },
        // { name: 'key', type: 'string' },
        // { name: 'is_active', type: 'boolean' },
        // { name: 'status', type: 'string' },
        // { name: 'img', type: 'string' },
        // { name: 'updated_at', type: 'number' },
        // { name: 'created_at', type: 'number' },
        // { name: 'version', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'app_info',
      columns: [
        { name: 'device_id', type: 'string', isOptional:true  },
        { name: 'uuid', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'app_updates',
      columns: [
        { name: 'updates_id', type: 'string'},
        { name: 'phone_number', type: 'string'},
        { name: 'app_services', type: 'string'},
        { name: 'app_merchants', type: 'string' },
        { name: 'app_sku_foods', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'report_issues',
      columns: [
        { name: 'report_id', type: 'number'},
        { name: 'username', type: 'string' },
        { name: 'subject', type: 'string' },
        { name: 'types', type: 'string' },
        { name: 'message', type: 'string' },
        { name: 'is_confirm', type: 'boolean' },
        { name: 'upload_file', type: 'string' },
        { name: 'is_active', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'booking',
      columns: [
        { name: 'pickupAddress', type: 'string'},
        { name: 'multipleAddress', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'update_config',
      columns: [
        { name: 'config_name', type: 'string'},
        { name: 'update_version', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'booking_details',
      columns: [
        { name: 'address_name', type: 'string'},
        { name: 'address_details', type: 'string' },
        { name: 'recipient_number', type: 'string' },
        { name: 'recipient_name', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
  ]
})