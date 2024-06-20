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

  @Get(':id')
  @AsyncWrapper()
  async findOne(@Param('id') id: string) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getProductCategory' }, { id })
    );
  }

  @Get()
  @AsyncWrapper()
  async findAll(@Query() queryProductCategoriesDto: QueryProductCategoriesDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getAllCategories' }, {queryProductCategoriesDto})
    );
  }

  @Patch(':id')
  @AsyncWrapper()
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateProductCategoryDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'updateCategory' }, { id, updateCategoryDto })
    );
  }
}
