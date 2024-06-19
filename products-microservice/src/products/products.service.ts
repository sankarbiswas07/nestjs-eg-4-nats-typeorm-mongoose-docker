import { Injectable } from "@nestjs/common";
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from "./dto/create-product.dto";
import { Product, ProductDocument } from "src/schemas/Product.schema";
import { RpcException } from "@nestjs/microservices";
import { UpdateProductDto } from "./dto/update-product.dto";
import { generateSkuId } from "src/utils/sku-generator";


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

  private validateObjectId(id: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
        throw new RpcException('Invalid ObjectId');
    }
    return new Types.ObjectId(id);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const product_sku  = generateSkuId();
    const newProduct = new this.productModel({...createProductDto, product_sku});
    return newProduct.save();
  }

  async getProduct(productId: string): Promise<ProductDocument> {
    const validId = this.validateObjectId(productId);
    const product = await this.productModel.findById(validId).exec();
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

  async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<ProductDocument> {
    const validId = this.validateObjectId(productId);
    const existingProduct = await this.productModel.findById(validId).exec();
    if (!existingProduct) {
      throw new RpcException('Product not found');
    }

    Object.assign(existingProduct, updateProductDto);
    return existingProduct.save();
  }
}