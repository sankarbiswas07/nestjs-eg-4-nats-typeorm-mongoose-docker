import { Controller,  Post, Body, Get, Param, Patch, Inject, Query } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { QueryProductCategoriesDto } from './dto/query-product-categories.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('categories')
export class ProductCategoriesController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }


  @Post('create')
  async create(@Body() createCategoryDto: CreateProductCategoryDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'createProductCategory' }, createCategoryDto)
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getProductCategory' }, { id })
    );
  }

  @Get()
  async findAll(@Query() queryProductCategoriesDto: QueryProductCategoriesDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getAllCategories' }, {queryProductCategoriesDto})
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateProductCategoryDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'updateCategory' }, { id, updateCategoryDto })
    );
  }
}
