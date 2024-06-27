import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetaiils } from './orderdetails.entity';
import { Users } from './users.entity';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @OneToOne(() => OrderDetaiils, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetaiils;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
