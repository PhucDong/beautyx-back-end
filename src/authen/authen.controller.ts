import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe, Res, Req, ParseIntPipe, Query, ClassSerializerInterceptor, UseInterceptors} from '@nestjs/common';
import { AuthenService } from './authen.service';
import { loginDto, registerDto } from 'src/DTOs/AuthenDto';
import { Request, Response } from 'express'
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';
import JwtRefreshGuard from './authenRefresh.guard';
import { LocalAuthenGuard } from './authen.guard';
import JwtAuthenGuard from './authenAccess.guard';


@Controller('authen')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenController {
    constructor(
      private authenService: AuthenService,
      private readonly customerService: CustomerService,

    ){}
    @HttpCode(200)
    @UseGuards(LocalAuthenGuard)
    @Post('general/login')
    logIn(@Req() request) {
      //console.log("the user in the general login controller: ")
      console.log(request.user)
      const user = request.user;
      const accessTokenCookie = this.authenService.getCookieWithJwtAccessToken(user);
      const refreshTokenCookie = this.authenService.getCookieWithJwtRefreshToken(user);

      // console.log("access cookie in authen controller login: " + accessTokenCookie)
      // console.log("refresh cookie in authen controller login: " + refreshTokenCookie)

      //await this.customerService.setCurrentRefreshToken(refreshTokenCookie.token, user.id);
  
      request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

      //response.headers.set('Set-Cookie', accessCookie)
      
      console.log("sending cookie and user info")
      return user;
        
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    refresh(@Req() request) {
      const accessCookie = this.authenService.getCookieWithJwtAccessToken(request.user);
  
      request.res.setHeader('Set-Cookie', accessCookie);
      return request.user;
    }
    
    @UseGuards(JwtAuthenGuard)
    @Post('logout')
    @HttpCode(200)
    async logOut(@Req() request) {
      console.log("loging out controller")
      console.log("request user: " + request.user.id + ' ' + request.user.firstname)
      const loggedOut = await this.customerService.removeRefreshToken(request.user.id);
      console.log("refresh token has been removed from user ")
      const cookie = this.authenService.getCookieForLogOut();
      request.res.setHeader('Set-Cookie', cookie);
      console.log('finished removing refresh token, now sending logout cookie')
      return loggedOut;
    }

    @Post('general/register/')
    @UsePipes(ValidationPipe)
    register(@Body() newUser: registerDto){
        console.log('registering general user, customer or manager')
        return this.authenService.generalRegister(newUser)
    }

    // @Post('customer/login')
    // customerLogin(@Body() loginDetails: loginDto) {
    //   return this.authenService.customerLogin(loginDetails);
    // }
    // @Post('manager/login')
    // managerLogin(@Body() loginDetails: loginDto) {
    //   return this.authenService.managerLogin(loginDetails);
    // }

    

    // @Post('register')
    // @UsePipes(ValidationPipe)
    // registerCustomer(@Body() newCustomer: registerDto){
    //     console.log('registering customer')
    //     return this.authenService.registerCustomer(newCustomer)
    // }
    // @Post('register')
    // @UsePipes(ValidationPipe)
    // registerManager(@Body() newCustomer: registerDto){
    //     console.log('registering customer')
    //     return this.authenService.registerManager(newCustomer)
    // }

    // @UseGuards(LoginGuard)
    // @Get('profile')
    // getProfile(@Req() req) {
    //     console.log(req.user)
    //     return req.user;
    // }
}
