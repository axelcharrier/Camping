import type { OrderItem } from '@/interfaces/orderItemInterface.ts'

export interface Order {
  id: string;
  orderNumber: number;
  customerName: string;
  items: OrderItem[];
  status: "pending" | "ready";
  time: string;
  desiredTime?: string;
  tableNumber?: string;
}