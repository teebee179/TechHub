import { Controller, Get,UseGuards, Render, Request, Post, Body, Req, Res, Param, Redirect } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { AuthenticatedGuard } from 'src/Guards/authenticated.guard';
import { use } from 'passport';

@Controller('/profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  @Render("./User/userProfile")
  getProfile(@Request() req) {
    return {user: req.user};
  }

  @Post()
  @Render("./User/userProfile")
  async updateProfile(@Body() user, @Req() req,  @Res() res){
    const updatedUser =  await this.userProfileService.updateUser(req.user.user_id, user.username, user.email, user.telephone, user.address);
    req.user = updatedUser
    return {message: "Cập nhật thông tin thành công", user: updatedUser}
  }

  @Post('/password')
  @Render("./User/userProfile")
  async updatePassword(@Body() user, @Req() req,  @Res() res){
    const checkPassword = await this.userProfileService.checkPassword(req.user.user_id, user.currPassword, user.newPassword);
    if(!checkPassword){
      return {message: "Incorrect current password"};
    }
    else{
      return {message: "Change password successfully"};
    }
  }

  @Get('/check-email-exist/:email')
  async api_Check_Exists_Username(@Param('email') email, @Res() res, @Req() req){
    const currEmail = req.user.user_email;
    const exists = await this.userProfileService.is_Exists(email, currEmail);    
    return res.json(!!exists);
    
  }
}
