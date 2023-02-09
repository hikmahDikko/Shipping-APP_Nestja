import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'jsonwebtoken';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as config from 'config';
import { Repository } from 'typeorm';
import { User } from './user.entity';

const jwtConfig = config.get('jwt');

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.JWT_SECRET || jwtConfig.secret,
        });
    }

    async validate(payload : JwtPayload) : Promise<User> {
        const { username } = payload;
        const user = this.userRepository.findOneBy({username})

        if(!user) {
            throw new UnauthorizedException()
        }

        return user;
    }
}