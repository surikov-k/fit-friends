import { EntityInterface } from '@fit-friends/core';
import {
  OrderInterface,
  PaymentMethod,
  PurchaseType,
} from '@fit-friends/shared-types';

export class OrderEntity
  implements EntityInterface<OrderEntity>, OrderInterface
{
  createdAt: Date;
  payment: PaymentMethod;
  price: number;
  purchaseType: PurchaseType;
  quantity: number;
  serviceId: number;
  total: number;
  userId: string;

  constructor(order: OrderInterface) {
    this.fillEntity(order);
  }

  fillEntity(entity: OrderInterface): void {
    this.payment = entity.payment;
    this.price = entity.price;
    this.purchaseType = entity.purchaseType;
    this.quantity = entity.quantity;
    this.serviceId = entity.serviceId;
    this.total = entity.price * entity.quantity;
    this.userId = entity.userId;
  }

  decreaseQuantity() {
    this.quantity = Math.max(this.quantity - 1, 0);
  }

  toObject(): OrderEntity {
    return { ...this };
  }
}
