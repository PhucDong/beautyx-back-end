
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, RoleEnum } from 'src/Custom Decorator/roles.decorator';
  
@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      console.log('checking the jwt token------------')
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY, 
      [
        context.getHandler(),
        context.getClass(),
      ]);
    console.log("required roles:\n" + requiredRoles)

    if (!requiredRoles) {
      return true;
    }
    //const { user } = context.switchToHttp().getRequest();
    const request = context.switchToHttp().getRequest();
    const user = request.user
    console.log("role guard user: " + user.username + ' ' + user.roles)

    console.log("checking user role: ")
    console.log(requiredRoles[0] == user.roles)

    return requiredRoles.some((role) => user.roles == role);
  }
}

  