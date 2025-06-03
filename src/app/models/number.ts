export interface PhoneNumber {
  id: number;
  phone: string;
  status: 'active' | 'inactive';
  country: string;
  carrier: string;
  created_at: string;
  expires_at: string;
  message_count: number;
} 