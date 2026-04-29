import type { OrderItem } from '@/interfaces/orderItemInterface.ts'

export interface OrderWithItem {
  created_at: string;
  customer_name: string;
  desired_time?: string;
  id: string;
  order_items: OrderItem[];
  order_number: number;
  status: "pending" | "ready";
  table_number?: string;
  time: string;
  updated_at: string;
}