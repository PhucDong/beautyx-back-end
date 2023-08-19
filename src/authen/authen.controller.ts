import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe, Res, Req} from '@nestjs/common';
import { AuthenService } from './authen.service';
import { loginDto, registerDto } from 'src/DTOs/AuthenDto';
import { LocalAuthenGuard, LoginGuard } from './authen.guard';
import { Request, Response } from 'express'
@Controller('authen')
export class AuthenController {
    constructor(private authenService: AuthenService) {}

    @HttpCode(200)
    @UseGuards(LocalAuthenGuard)
    @Post('general/login')
    async logIn(@Req() request, @Res() response: Response) {
      console.log("the user in the controller: ")
      console.log(request.user)
      const user = request.user;
      const cookie = this.authenService.getCookieWithJwtToken(user);
      response.setHeader('Set-Cookie', cookie);
      //response.cookie("access_token", "who let the dogs out")
      //response.headers.set('Set-Cookie', cookie)
      console.log("sending cookie and user info")
      return response.send(user);
    }

    @Post('customer/login')
    customerLogin(@Body() loginDetails: loginDto) {
      return this.authenService.customerLogin(loginDetails);
    }
    @Post('manager/login')
    managerLogin(@Body() loginDetails: loginDto) {
      return this.authenService.managerLogin(loginDetails);
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    registerCustomer(@Body() newCustomer: registerDto){
        console.log('registering customer')
        return this.authenService.registerCustomer(newCustomer)
    }
    @Post('register')
    @UsePipes(ValidationPipe)
    registerManager(@Body() newCustomer: registerDto){
        console.log('registering customer')
        return this.authenService.registerManager(newCustomer)
    }

    @UseGuards(LoginGuard)
    @Get('profile')
    getProfile(@Req() req) {
        console.log(req.user)
        return req.user;
    }
}
