import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcCatch } from '../utils/rpc-exception.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductIdDto, QueryProductsDto } from './dto/query-products.dto';

@Controller()
export class ProductsMicroServiceController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'createProduct' })
  @RpcCatch()
  async createProduct(@Payload() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @MessagePattern({ cmd: 'updateProduct' })
  @RpcCatch()
  async updateProduct(
    @Payload() data: { _id: ProductIdDto, updateProductDto: UpdateProductDto}
  ) {
    const {_id, updateProductDto} = data
    console.log(_id)
    console.log(updateProductDto)
    return this.productService.updateProduct(_id, updateProductDto);
  }

  @MessagePattern({ cmd: 'getProduct' })
  @RpcCatch()
  async getProduct(@Payload() _id: ProductIdDto) {
    return this.productService.getProduct(_id);
  }

  @MessagePattern({ cmd: 'getProducts' })
  @RpcCatch()
  async getProducts(
    @Payload() queryProductsDto: QueryProductsDto,
  ) {
    const { page, limit, filter } = queryProductsDto;
    return this.productService.getProducts(page, limit, filter);
  }
}
