import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcCatch } from 'src/utils/rpc-exception.decorator';
import { ProductCategoryService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { CategoryIdDto, QueryProductCategoriesDto } from './dto/query-product-categories.dto';

@Controller()
export class ProductCategoriesMicroServiceController {
  constructor(private readonly productCategoryService: ProductCategoryService) { }


  @MessagePattern({ cmd: 'createProductCategory' })
  @RpcCatch()
  async createProductCategory(@Payload() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.createProductCategory(createProductCategoryDto);
  }


  @MessagePattern({ cmd: 'getProductCategory' })
  @RpcCatch()
  async getProductCategory(@Payload() _id: CategoryIdDto) {
    return this.productCategoryService.getProductCategoryById(_id);
  }


  @MessagePattern({ cmd: 'getProductCategories' })
  @RpcCatch()
  async getProductCategories(@Payload() queryProductCategoriesDto: QueryProductCategoriesDto) {
    return this.productCategoryService.getProductCategories(queryProductCategoriesDto);
  }


  @MessagePattern({ cmd: 'updateProductCategory' })
  @RpcCatch()
  async updateProductCategory(
    @Payload() data: { productCategoryId: CategoryIdDto, updateCategoryDto: UpdateProductCategoryDto }
  ) {
    const { productCategoryId, updateCategoryDto } = data
    return this.productCategoryService.updateProductCategory(productCategoryId, updateCategoryDto);
  }
}
