import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/auth.credentials.dto';
import { GetUser } from './get-user.decorator';
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

    @Post('/signin')
    async signIn(@Body(ValidationPipe) createUserDto : CreateUserDTO) : Promise<{ accessToken : string }>{
        return this.userService.signIn(createUserDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user : User){
        console.log(user.username);
    }
}
