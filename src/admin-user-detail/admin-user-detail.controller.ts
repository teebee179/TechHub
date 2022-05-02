import { Controller, Get, Post, Render, Redirect, Body, Param, UseFilters, UseGuards } from '@nestjs/common';
import { Admin_AuthExceptionFilter } from 'src/Guards/admin-auth-exception.filter';
import { AuthenticatedGuard } from 'src/Guards/authenticated.guard';
import { AdminUserDetailService } from './admin-user-detail.service';

@Controller('admin/manages/user-detail')
// @UseFilters(Admin_AuthExceptionFilter)
// @UseGuards(AuthenticatedGuard)

export class AdminUserDetailController {
  constructor(private readonly adminUserDetailService: AdminUserDetailService) {}

  @Get('/:id')
  @Render('./Admin/user-detail')
  async root(@Param('id') id){
    const user = await this.adminUserDetailService.getUser(id);
    return {user:user};
  }

  @Post()
  async Delete(@Body() body){
    await this.adminUserDetailService.deleteById(body.user_id);
  }
}