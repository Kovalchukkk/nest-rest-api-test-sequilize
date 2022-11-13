import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() dto: CreatePostDto,
    @Request() req,
    @UploadedFile() image,
  ) {
    return this.postsService.create(dto, req.user.id, image);
  }

  @Get()
  getAll() {
    return this.postsService.getAllPosts();
  }
}
