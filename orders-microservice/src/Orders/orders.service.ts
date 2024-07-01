import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { lastValueFrom } from 'rxjs';
import { UserOrders } from 'src/typeorm/entities/UserOrder.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    @InjectRepository(UserOrders) private readonly ordersRepository: Repository<UserOrders>,
  ) { }

  async createOrder(createOrderDto: CreateOrderDto): Promise<UserOrders> {

    const [product, user, shipping] = await Promise.all([
      await lastValueFrom(
        this.natsClient.send({ cmd: 'getProduct' }, { id: createOrderDto.product_id })
      ),
      await lastValueFrom(
        this.natsClient.send({ cmd: 'getUser' }, { id: createOrderDto.user_id })
      ),
      await lastValueFrom(
        this.natsClient.send({ cmd: 'getShippingDetailsById' }, { id: createOrderDto.shipping_id })
      )
    ])
    console.log(product)

    const newOrder = this.ordersRepository.create({
      ...createOrderDto,
      product_sku: product.product_sku,
      product_name: product.product_name,
      description: product.description,
      categories_uuids: product.categories_uuids,
      mrp: product.mrp,
      stockQty: product.stockQty,
      stockType: product.stockType,
      image_urls: product.image_urls,

      user_name: user.user_name,
      display_name: user.display_name || user.user_name,
      avatar_url: user.avatar_url,

      shipping_name: shipping.name,
      shipping_phone: shipping.phone,
      shipping_line_1: shipping.line_1,
      shipping_landmark: shipping.landmark,
      shipping_state: shipping.state,
    });

    console.log(newOrder)

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
    const query = this.ordersRepository.createQueryBuilder('order');

    if (user_id) {
      query.andWhere('order.user_id = :user_id', { user_id });
    }

    query.skip(page * limit).take(limit);

    return query.getMany();
  }

  async getOrder(id: string): Promise<UserOrders> {
    return this.ordersRepository.findOneBy({ id });
  }
}
