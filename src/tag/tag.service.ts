import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag, TagQuestionReleation } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ) {}

  /**
   * 查询标签
   *
   */
  async findTag(queryData: any): Promise<Tag> {
    const info = await this.tagRepo.findOne({
      where: queryData,
    });
    return info;
  }

  /**
   * 查询所有标签
   *
   */
  async findTagAll(queryData: any): Promise<any> {
    const arr = await this.tagRepo.find({
      where: queryData,
      select: {
        tag_id: true,
        tag_name: true,
      },
    });

    return arr;
  }

  /**
   * 新增标签
   *
   * @param name 标签名称
   */
  async addTag(name: string): Promise<any> {
    const res = await this.tagRepo.insert({
      tag_name: name,
    });
    return res;
  }

  /**
   * 修改标签
   *
   */
  async updateTag(tag_id: number, updateData: any): Promise<any> {
    const res = await this.tagRepo.update(
      {
        tag_id,
      },
      updateData,
    );
    return res;
  }

  /**
   * 删除题库
   *
   * @param tag_id 题目id
   */
  async deleteTag(tag_id: number): Promise<any> {
    const res = await this.tagRepo.delete({
      tag_id,
    });
    return res;
  }
}

@Injectable()
export class TagQuestionReleationService {
  constructor(
    @InjectRepository(TagQuestionReleation)
    private readonly releationRepo: Repository<TagQuestionReleation>,
  ) {}

  /**
   * 查询标签关系
   *
   */
  async findTagQuestionReleation(
    queryData: any,
  ): Promise<TagQuestionReleation> {
    const info = await this.releationRepo.findOne({
      where: queryData,
    });
    return info;
  }

  /**
   * 新增关系
   *
   * @param name 标签名称
   */
  async addTagQuestionReleation(list: any): Promise<any> {
    const res = await this.releationRepo.save(list);
    return res;
  }

  /**
   * 修改关系
   *
   */
  async updateTagQuestionReleation(
    releation_id: number,
    updateData: any,
  ): Promise<any> {
    const res = await this.releationRepo.update(
      {
        releation_id,
      },
      updateData,
    );
    return res;
  }

  /**
   * 删除题库
   *
   * @param releation_id 关系id
   */
  async deleteTag(releation_id: number): Promise<any> {
    const res = await this.releationRepo.delete({
      releation_id,
    });
    return res;
  }
}
