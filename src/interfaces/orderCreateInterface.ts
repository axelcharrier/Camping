import type { OrderItem } from '@/interfaces/orderItemInterface.ts'

export interface OrderCreate {
  customer_name: string;
  status: string
  time: string;
  desired_time?: string;
  items: OrderItem[];
  table_number?: string;
}