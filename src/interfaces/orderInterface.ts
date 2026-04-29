export interface Order {
  created_at: string;
  id: string;
  order_number: number;
  customer_name: string;
  status: "pending" | "ready";
  time: string;
  desired_time?: string;
  table_number?: string;
  updated_at: string;
}