import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('comment') private readonly commentModel: Model<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const newCom = new this.commentModel(createCommentDto);
    await newCom.save();
    return newCom;
  }

  async findAll() {
    const commentAll = await this.commentModel.find();
    return commentAll;
  }

  async findOne(id: string) {
    const commentById = await this.commentModel.findById(id);
    return commentById;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.commentModel.findByIdAndUpdate(id, updateCommentDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.commentModel.findByIdAndDelete(id);
  }
}
