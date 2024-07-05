import { Injectable } from "@nestjs/common";
import { Model, ObjectId, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "src/schemas/User.schema";
import { RpcException } from "@nestjs/microservices";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserIdDto } from "./dto/query-users.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const { user_name } = createUserDto
        const existingUser = await this.userModel.findOne({ user_name })
        if (existingUser) throw new RpcException('user_name is already exists')

        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }


    async getUser(_id: UserIdDto) {
        try {
            const user = await this.userModel
                .findById(_id)
                .populate('shipping_addresses').exec();

            // console.log(user)
            return user
        } catch (err) {
            throw new Error(err)
        }
    }

    async getUsers(
        page: number,
        limit: number,
        filter: Partial<UpdateUserDto>,
    ) {
        return await this.userModel.find(filter).exec();
    }

    async updateUser(user_id: UserIdDto, updateUserDto: UpdateUserDto) {
        const existingUser = await this.userModel.findById(user_id);
        // const existingUser = await this.getUser(user_id);
        if (!existingUser) {
            throw new RpcException('User not found');
        }
        Object.assign(existingUser, updateUserDto);
        console.log(existingUser)
        return await existingUser.save();
    }


    async updateUserAddress(user_id: UserIdDto, s_addresses: string) {
        const existingUser = await this.userModel.findById(user_id);
        if (!existingUser) {
            throw new RpcException('User not found');
        }

        existingUser.shipping_addresses.push(s_addresses)

        return await existingUser.save();
    }
}