import type { OrderItem } from '@/interfaces/orderItemInterface.ts'

export interface OrderUpdate {
  customer_name?: string;
  desired_time?: string;
  status?: string;
  table_number?: string;
  time?: string;
}