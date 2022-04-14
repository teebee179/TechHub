import { Controller, Get, Post, Render, Redirect, Param, Res } from '@nestjs/common';
import { AdminManagementService } from './admin-management.service';

@Controller('admin/manages')
export class AdminManagementController {
  constructor(private readonly adminManagementService: AdminManagementService) {}
  @Get()
  @Render('./Admin/manage-users')
  async root(){
    const page = 1;
    const user = await this.adminManagementService.getAllUsersByPage((page-1)*5,5).then();
    const total  = await this.adminManagementService.getTotalUsers();
    const totalPages = Math.ceil(total/5);
    let nextPage = page + 1;
    if(nextPage > totalPages){
      nextPage = totalPages;
    }
    let prevPage = page - 1;
    if(prevPage < 1){
      prevPage = 1;
    }
    return {users: user, totalPages, pages: Array.from(Array(totalPages).keys()).map(i=>i+1),nextPage, prevPage,};
  }

  @Get(':page')
  async adminProductPaging(@Param('page') page, @Res() res){
    if(!page || isNaN(page)) page = 1;
    else{
      page = parseInt(page);
    }
    const users = await this.adminManagementService.getAllUsersByPage((page-1)*5,5).then();
    const total  = await this.adminManagementService.getTotalUsers();
    const totalPages = Math.ceil(total/5);
    let nextPage = page + 1;
    if(nextPage > totalPages){
      nextPage = totalPages;
    }
    let prevPage = page - 1;
    if(prevPage < 1){
      prevPage = 1;
    }
    return res.json(users);
  }


  @Get('/del/:id')
  @Redirect('/admin/manages')
  async view(@Param('id') id){
    return await this.adminManagementService.deleteById(id);
  }
}