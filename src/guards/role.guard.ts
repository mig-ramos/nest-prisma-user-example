import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly refletor: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requeriRoles = this.refletor.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log({ requeriRoles });

    if (!requeriRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const rolesFilted = requeriRoles.filter((role) => role === user.role);

    return rolesFilted.length > 0;
  }
}
