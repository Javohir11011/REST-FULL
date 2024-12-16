import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel('post') private readonly postModel: Model<Post>) {}
  async create(createPostDto: CreatePostDto) {
    const newCom = new this.postModel(createPostDto);
    await newCom.save();
    return newCom;
  }

  async findAll() {
    const allPost = await this.postModel.find();
    return allPost;
  }

  async findOne(id: string) {
    const postById = await this.postModel.findById(id);
    return postById;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatePost = await this.postModel.findOneAndUpdate(
      { id, ...updatePostDto },
      { new: true },
    );
    return updatePost;
  }

  async remove(id: string) {
    const deletePost = await this.postModel.findByIdAndDelete(id);
    return deletePost;
  }
}
