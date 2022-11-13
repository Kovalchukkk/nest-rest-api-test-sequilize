import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Post } from './posts.model';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([User, Post]), AuthModule, FilesModule],
})
export class PostsModule {}
