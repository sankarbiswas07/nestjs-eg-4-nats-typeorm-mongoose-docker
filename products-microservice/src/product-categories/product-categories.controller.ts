import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcCatch } from 'src/utils/rpc-exception.decorator';
import { ProductCategoryService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { QueryProductCategoriesDto } from './dto/query-product-categories.dto';

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
  async getProductCategory(@Payload() productCategoryId: string) {
    return this.productCategoryService.getProductCategoryById(productCategoryId);
  }


  @MessagePattern({ cmd: 'getProductCategories' })
  @RpcCatch()
  async getProductCategories(@Payload() queryProductCategoriesDto: QueryProductCategoriesDto) {
    return this.productCategoryService.getProductCategories(queryProductCategoriesDto);
  }


  @MessagePattern({ cmd: 'updateProductCategory' })
  @RpcCatch()
  async updateProductCategory(
    @Payload() productCategoryId: string,
    @Payload() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.updateProductCategory(productCategoryId, updateProductCategoryDto);
  }
}
