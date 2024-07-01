import { Injectable } from "@nestjs/common";
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "src/schemas/User.schema";
import { RpcException } from "@nestjs/microservices";
import { UpdateUserDto } from "./dto/update-user.dto";
import mongoose from "mongoose";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    private getObjectId(id){
        return new mongoose.Types.ObjectId(id)
    }

    async createUser(createUserDto: CreateUserDto) {
        const { user_name } = createUserDto
        const existingUser = await this.userModel.findOne({ user_name })
        if (existingUser) throw new RpcException('user_name is already exists')

        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }

    async getUser(user_id: string) {
        return await this.userModel
        .findById(this.getObjectId(user_id))
        .populate('shipping_addresses').exec();
    }

    async getUsers(
        page: number,
        limit: number,
        filter: Partial<UpdateUserDto>,
    ) {
        console.log("page")
        console.log(page)
        console.log("limit")
        console.log(limit)
        console.log("filter")
        console.log(filter)
        return await this.userModel.find(filter).exec();
    }

    async updateUser(user_id: string, updateUserDto: Partial<User>) {
        const existingUser = await this.userModel.findById(this.getObjectId(user_id));
        if (!existingUser) {
            throw new RpcException('User not found');
        }

        Object.assign(existingUser, updateUserDto);
        return await existingUser.save();
    }


    async updateUserAddress(user_id: string, s_addresses: string) {
        const existingUser = await this.userModel.findById(this.getObjectId(user_id));
        if (!existingUser) {
            throw new RpcException('User not found');
        }

        existingUser.shipping_addresses.push(s_addresses)

        return await existingUser.save();
    }
}