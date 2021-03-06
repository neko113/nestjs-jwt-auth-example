import { Body, Controller, Delete, Get, Post, Req, Res } from "@nestjs/common";
import { SignInRequest } from "@/user/dto/sign-in-request.dto";
import { AuthService } from "@/user/service/auth.service";
import { Response, Request } from "express";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signIn(
    @Body() signInRequest: SignInRequest,
    @Res({ passthrough: true }) signInResponse: Response
  ): Promise<string> {
    return this.authService.signIn(signInRequest, signInResponse);
  }

  @Delete()
  signOut(@Res({ passthrough: true }) sigOutResponse: Response): string {
    return this.authService.signOut(sigOutResponse);
  }

  @Get()
  async verifyToken(@Req() req: Request) {
    return await this.authService.verifyToken(req);
  }
}
