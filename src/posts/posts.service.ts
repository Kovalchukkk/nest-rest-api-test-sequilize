import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    private readonly filesService: FilesService,
  ) {}

  async create(dto: CreatePostDto, ownerId: number, image: any) {
    const fileName = await this.filesService.createFile(image);
    const post = await this.postRepository.create({
      ...dto,
      userId: ownerId,
      image: fileName,
    });
    return post;
  }

  async getAllPosts() {
    const posts = await this.postRepository.findAll({ include: { all: true } });
    return posts;
  }
}
