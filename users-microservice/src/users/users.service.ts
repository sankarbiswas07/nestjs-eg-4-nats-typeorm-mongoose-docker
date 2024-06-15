import { Injectable } from "@nestjs/common";
import { User } from "src/typeorm/entities/User";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UsersService {

    constructor(  
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) { }

    createUser(createUserDto: CreateUserDto) {
        const newUser = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(newUser);
    }


}