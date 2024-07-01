import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { RpcException } from "@nestjs/microservices";

import { Model, Types } from 'mongoose'

import { ShippingAddress } from "src/schemas/ShippingAddress.schema";

import { UpdateAddressDto } from "./dto/update-address.dto";
import { CreateAddressDto } from "./dto/create-address.dto";
import { User } from "src/schemas/User.schema";

@Injectable()
export class AddressesService {

    constructor(
        @InjectModel(ShippingAddress.name) private shippingModel: Model<ShippingAddress>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    private getObjectId(id) {
        return new Types.ObjectId(id)
    }

    async createShippingAddress(createAddressDto: CreateAddressDto) {
        const existingShippingAddress = await this.getShippingAddresses(
            {
                user_id: createAddressDto.user_id,
                is_default: true
            },
            null, null)

        // force to have a is_default address if there is no is_default address
        if (!existingShippingAddress.length){
            createAddressDto.is_default = true
        }else{
            createAddressDto.is_default = false
        }


        const newShippingAddress = new this.shippingModel(createAddressDto);
        const savedAddress = await newShippingAddress.save();

        return savedAddress
    }

    async getShippingAddress(shippingAddressId: string) {
        return await this.shippingModel.findById(this.getObjectId(shippingAddressId)).exec();
    }

    async getShippingAddresses(
        filter: Partial<CreateAddressDto>,
        page: number,
        limit: number,
    ) {
        return await this.shippingModel.find(filter).exec();
    }

    async updateShippingAddress(shippingAddressId: string, updateAddressDto: Partial<ShippingAddress>) {
        const existingShippingAddress = await this.shippingModel.findById(this.getObjectId(shippingAddressId));
        if (!existingShippingAddress) {
            throw new RpcException('ShippingAddress not found');
        }

        Object.assign(existingShippingAddress, updateAddressDto);
        return await existingShippingAddress.save();
    }
}