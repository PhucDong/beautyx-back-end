import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { loginDto } from 'src/DTOs/AuthenDto';
import { LoginGuard } from './authen.guard';

@Controller('authen')
export class AuthenController {
    constructor(private authenService: AuthenService) {}

    //@HttpCode(HttpStatus.OK)
    @Post('customer/login')
    customerLogin(@Body() loginDetails: loginDto) {
      return this.authenService.customerLogin(loginDetails);
    }

    @UseGuards(LoginGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log(req.user)
        return req.user;
    }
}
