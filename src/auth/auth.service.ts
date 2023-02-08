import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/auth.credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ) {}

    async singUp(createUserDto : CreateUserDTO) : Promise<User>{
        const { username, password } = createUserDto;

        const user = new User();
        user.username = username;
        user.password = password;
        try {
            const result = await user.save();

            return result;
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Username already exist');
            }else {
                throw new InternalServerErrorException()
            }
        }
    }
}
