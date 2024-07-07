import { Controller,  Post, Body, Get, Param, Patch, Inject, Query } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { QueryProductCategoriesDto } from './dto/query-product-categories.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AsyncWrapper } from 'src/utils/async-wrapper.decorator';

@Controller()
export class ProductCategoriesController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }


  @Post('create')
  @AsyncWrapper()
  async create(@Body() createCategoryDto: CreateProductCategoryDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'createProductCategory' }, createCategoryDto)
    );
  }

  @Get(':_categoryId')
  @AsyncWrapper()
  async findOne(@Param('_categoryId') _id: string) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getProductCategory' }, { _id })
    );
  }

  @Get()
  @AsyncWrapper()
  async findAll(@Query() queryProductCategoriesDto: QueryProductCategoriesDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getProductCategories' }, {...queryProductCategoriesDto})
    );
  }

  @Patch(':productCategoryId')
  @AsyncWrapper()
  async update(@Param('productCategoryId') productCategoryId: string, @Body() updateCategoryDto: UpdateProductCategoryDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'updateProductCategory' }, { productCategoryId, updateCategoryDto })
    );
  }
}
