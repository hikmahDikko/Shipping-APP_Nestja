import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/auth.credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private userService : AuthService,
    ) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) createUserDto : CreateUserDTO) : Promise<User>{
        return this.userService.singUp(createUserDto);
    }
}
