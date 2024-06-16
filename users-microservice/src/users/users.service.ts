import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "src/schemas/User.schema";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
}