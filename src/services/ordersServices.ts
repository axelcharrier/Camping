/// <reference types="vite/client" />

import type { Order } from '@/interfaces/orderInterface.ts'
import type { OrderItem } from '@/interfaces/orderItemInterface.ts'
import { inject } from 'vue'

export class OrderServices {
  private apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  getOrdersAsync(){
      return fetch(this.apiUrl + 'orders')
  }

  getOrderByIdAsync(id: number){
      return fetch(this.apiUrl + `/orders/${id}`)
  }

  addOrderAsync(order: Order){
      return fetch(this.apiUrl + 'orders', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
      })
  }

  markOrderReadyAsync(id: number){
      return fetch(this.apiUrl + `/orders/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: 'ready' })
      })
  }

  deleteOrderAsync(id: number){
      return fetch(this.apiUrl + `/orders/${id}`, {
          method: 'DELETE'
      })
  }

  getItemsByOrderIdAsync(orderId: number){
      return fetch(this.apiUrl + `/orders/${orderId}/items`)
  }

  addOrderItemAsync(orderId: number, item: OrderItem){
      return fetch(this.apiUrl + `/orders/${orderId}/items`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
      })
  }

  deleteOrderItemAsync(orderId: number, itemId: number){
      return fetch(this.apiUrl + `/orders/${orderId}/items/${itemId}`, {
          method: 'DELETE'
      })
  }
}
