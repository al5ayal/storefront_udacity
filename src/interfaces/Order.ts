import { OrderDetail } from './OrderDetail';

export interface Order {
  id?: number;
  user_id: number;
  created_at: Date | string;
  status: string;
  order_details?: OrderDetail[];
}
