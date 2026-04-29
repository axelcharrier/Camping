import type { orderItemCreate } from '@/interfaces/orderItemCreateInterface.ts'

export interface OrderCreate {
  customer_name: string;
  status: string
  time: string;
  desired_time?: string;
  items: orderItemCreate[];
  table_number?: string;
}