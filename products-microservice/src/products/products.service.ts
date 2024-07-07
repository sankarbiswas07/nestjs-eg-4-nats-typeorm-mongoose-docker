import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from "./dto/create-product.dto";
import { Product, ProductDocument } from "src/schemas/Product.schema";
import { RpcException } from "@nestjs/microservices";
import { UpdateProductDto } from "./dto/update-product.dto";
import { generateSkuId } from "src/utils/sku-generator";
import { ProductIdDto } from "./dto/query-products.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const product_sku  = generateSkuId();
    const newProduct = new this.productModel({...createProductDto, product_sku});
    return newProduct.save();
  }

  async getProduct(_id: ProductIdDto): Promise<ProductDocument> {
    const product = await this.productModel.findById(_id).exec();
    if (!product) {
      throw new RpcException('Product not found');
    }
    return product;
  }

  async getProducts(
    page: number,
    limit: number,
    filter: Partial<UpdateProductDto>,
  ): Promise<ProductDocument[]> {
    const skip = (page - 1) * limit;
    return this.productModel.find(filter).skip(skip).limit(limit).exec();
  }

  async updateProduct(_id: ProductIdDto, updateProductDto: UpdateProductDto): Promise<ProductDocument> {
    const existingProduct = await this.productModel.findById(_id).exec();
    console.log(existingProduct)
    if (!existingProduct) {
      throw new RpcException('Product not found');
    }

    Object.assign(existingProduct, updateProductDto);
    return existingProduct.save();
  }
}