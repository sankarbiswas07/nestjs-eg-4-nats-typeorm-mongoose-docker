import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "src/schemas/User.schema";
import { RpcException } from "@nestjs/microservices";

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
}