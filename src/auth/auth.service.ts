import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/auth.credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor (
        @InjectRepository(User)
        private userRepository : Repository<User>,
        private jwtService : JwtService
    ) {}

    async singUp(createUserDto : CreateUserDTO) : Promise<User>{
        const { username, password } = createUserDto;

        const user = new User();
        
        const salt = await bcrypt.genSalt();
        user.username = username;
        user.password = await this.hashPassword(password, salt);;

        try {
            const result = await user.save();

            return result;
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Username already exist');
            }else {
                console.log(error)
                throw new InternalServerErrorException()
            }
        }
    }

    async signIn(createUserDto : CreateUserDTO) : Promise<{ accessToken : string }>{
        const { username, password } = createUserDto;
        
        try {
            const user = await this.userRepository.findOneBy({username});
            const result = await bcrypt.compare(password, user.password);
            if (!user && !result) {
                throw new UnauthorizedException('Invalid credentials');
            }   
    
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);
            this.logger.debug(`Generate JWT Token with payload ${JSON.stringify(payload)}`)
    
            return { accessToken };
        } catch (error) {
            throw new InternalServerErrorException()
        }

    }

    private async hashPassword(password : string, salt : string) : Promise<string> {
        return bcrypt.hash(password, salt)
    }
}
