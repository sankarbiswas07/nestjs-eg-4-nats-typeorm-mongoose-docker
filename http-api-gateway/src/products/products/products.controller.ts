import { Controller, Post, Body, Get, Param, Patch, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';

@Controller()
export class ProductsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }


  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'createProduct' }, createProductDto)
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getProduct' }, { id })
    );
  }

  @Get()
  async findAll(@Query() queryProductsDto: QueryProductsDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getAllCategories' }, {queryProductsDto})
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'updateProduct' }, { id, updateProductDto })
    );
  }
}
