import Customer from '@modules/customers/typeorm/entities/Customer';

import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrdersProducts from './OrdersProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer) // Varios Orders para um Customer
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  }) // Um Order para varios Products
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
