import { Controller, Post, Body, Get, Param, Patch, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { AsyncWrapper } from 'src/utils/async-wrapper.decorator';

@Controller('products')
export class ProductsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }


  @Post('create')
  @AsyncWrapper()
  async create(@Body() createProductDto: CreateProductDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'createProduct' }, createProductDto)
    );
  }

  @Get(':id')
  @AsyncWrapper()
  async findOne(@Param('id') id: string) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getProduct' }, { id })
    );
  }

  @Get()
  @AsyncWrapper()
  async findAll(@Query() queryProductsDto: QueryProductsDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getProducts' }, {...queryProductsDto})
    );
  }

  @Patch(':id')
  @AsyncWrapper()
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'updateProduct' }, { id, updateProductDto })
    );
  }
}
