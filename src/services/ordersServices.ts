/// <reference types="vite/client" />

import type { Order } from '@/interfaces/orderInterface.ts'
import type { OrderItem } from '@/interfaces/orderItemInterface.ts'
import type { OrderCreate } from '@/interfaces/orderCreateInterface.ts'

export class OrderServices {
  private apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  async getOrdersAsync(){
      return fetch(this.apiUrl + 'orders')
  }

  getOrderByIdAsync(id: string){
      return fetch(this.apiUrl + `/orders/${id}`)
  }

  addOrderAsync(order: OrderCreate){
      return fetch(this.apiUrl + 'orders', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
      })
  }

  markOrderReadyAsync(id: string){
      return fetch(this.apiUrl + `/orders/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: 'ready' })
      })
  }

  deleteOrderAsync(id: string){
      return fetch(this.apiUrl + `/orders/${id}`, {
          method: 'DELETE'
      })
  }

  getItemsByOrderIdAsync(orderId: string){
      return fetch(this.apiUrl + `/orders/${orderId}/items`)
  }

  addOrderItemAsync(orderId: string, item: OrderItem){
      return fetch(this.apiUrl + `/orders/${orderId}/items`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
      })
  }

  deleteOrderItemAsync(orderId: string, itemId: string){
      return fetch(this.apiUrl + `/orders/${orderId}/items/${itemId}`, {
          method: 'DELETE'
      })
  }
}
