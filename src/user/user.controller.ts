import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UpdatePatchUserDTO } from 'src/user/dto/update-patch-user.dto';
import { UpdatePutUserDTO } from 'src/user/dto/update-put-user.dto';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParamId } from 'src/decorators/param-id-decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  async create(@Body() { name, email, password, active, role }: CreateUserDTO) {
    return this.userService.create({ name, email, password, active, role });
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  // @Get(':id')
  // async show(@Param() param) {
  //     return { user: {}, param }
  // }

  @Get(':id')
  async show(@ParamId() id: number) {
    await this.exists(id);
    return this.userService.show(id);
  }

  // @Put(':id')
  // async update(@Body() { name, email, password }: UpdatePutUserDTO, @Param() param) {
  //     return {
  //         method: 'put',
  //         name, email, password,
  //         param
  //     }
  // }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    await this.exists(id);
    return this.userService.update(id, data);
  }

  // @Patch(':id')
  // async updatePartial(@Body() { name, email, password }: UpdatePatchUserDTO, @Param() param) {
  //     return {
  //         method: 'patch',
  //         name, email, password,
  //         param
  //     }
  // }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    await this.exists(id);
    return this.userService.updatePartial(id, data);
  }

  // @Delete(':id')
  // async delete(@Param('id') id) {
  //     return { id }
  // }

  // No caso do Id ser número, esta alteraçõ deve ser feita em toda a api

  @Delete(':id')
  async delete(@ParamId() id: number) {
    await this.exists(id);
    return this.userService.delete(id);
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('O Usuário não existe.');
    }
  }
}
