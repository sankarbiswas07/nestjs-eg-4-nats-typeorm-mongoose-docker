import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductCategory, ProductCategoryDocument } from '../schemas/ProductCategory.schema'
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { CategoryIdDto, QueryProductCategoriesDto } from './dto/query-product-categories.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel(ProductCategory.name) private readonly productCategoryModel: Model<ProductCategoryDocument>,
  ) {}

  async createProductCategory(createProductCategoryDto: CreateProductCategoryDto): Promise<ProductCategoryDocument> {
    const newProductCategory = new this.productCategoryModel(createProductCategoryDto);
    return newProductCategory.save();
  }

  async getProductCategoryById(_id: CategoryIdDto): Promise<ProductCategoryDocument> {
    const productCategory = await this.productCategoryModel.findById(_id).exec();
    if (!productCategory) {
      throw new RpcException('Product category not found');
    }
    return productCategory;
  }

  async getProductCategories(queryProductCategoriesDto: QueryProductCategoriesDto): Promise<ProductCategoryDocument[]> {
    const { page = 1, limit = 10 } = queryProductCategoriesDto;
    const skip = (page - 1) * limit;
    return this.productCategoryModel.find().skip(skip).limit(limit).exec();
  }

  async updateProductCategory(_id: CategoryIdDto, updateProductCategoryDto: UpdateProductCategoryDto): Promise<ProductCategoryDocument> {

    const existingProductCategory = await this.getProductCategoryById(_id);
    if (!existingProductCategory) {
      throw new RpcException('Product category not found');
    }

    console.log(existingProductCategory)
    console.log(updateProductCategoryDto)
    
    Object.assign(existingProductCategory, updateProductCategoryDto);
    console.log(_id)
    return existingProductCategory.save();
  }
}
