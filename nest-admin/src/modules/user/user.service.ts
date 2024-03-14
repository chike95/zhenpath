import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // 注解
    private readonly usersRepository: Repository<User>, // 得到实例
  ) {}

  findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id }); // 返回实例内容
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    user.avatar = createUserDto.avatar;
    user.nickname = createUserDto.nickname;
    user.active = 1;

    return this.usersRepository.save(user);
  }

  update(id: number, createUserDto: CreateUserDto) {
    return this.usersRepository.update(id, createUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }
}
