import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderViaCartDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserOrders } from 'src/typeorm/entities/UserOrder.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(UserOrders) private readonly ordersRepository: Repository<UserOrders>,
  ) { }

  async createOrder(createOrderDto: CreateOrderViaCartDto): Promise<Omit<UserOrders, 'id'>> {
    const newOrder = this.ordersRepository.create({ ...createOrderDto });
    return this.ordersRepository.save(newOrder);
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<UserOrders> {
    const order = await this.ordersRepository.findOneBy({ id });
    if (!order) {
      throw new Error('Order not found');
    }

    const updatedOrder = this.ordersRepository.merge(order, updateOrderDto);
    return this.ordersRepository.save(updatedOrder);
  }

  async getOrders(user_id?: string, page: number = 0, limit: number = 10): Promise<UserOrders[]> {
    const query = this.ordersRepository.createQueryBuilder('orders');
    if (user_id) {
      query.andWhere('orders.user_id = :user_id', { user_id });
    }
    query.skip(page * limit).take(limit);
    return query.getMany();
  }

  async getOrder(id: string): Promise<UserOrders> {
    return this.ordersRepository.findOneBy({ id });
  }
}
