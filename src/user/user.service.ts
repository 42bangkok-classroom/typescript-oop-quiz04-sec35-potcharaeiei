import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  test(): any[] {
    return [];
  }

  private users: IUser[];

  constructor() {
    const filePath = join(process.cwd(), 'data', 'users.json');
    const data = readFileSync(filePath, 'utf-8');
    this.users = JSON.parse(data) as IUser[];
  }

  findOne(id: string, fields?: string[]): Partial<IUser> {
    const user = this.users.find((u) => String(u.id) === String(id));

    // ❌ ไม่เจอ → ต้องใช้ NotFoundException
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!fields) {
      return user;
    }

    // ❌ fields = [] → ต้อง return {}
    if (fields.length === 0) {
      return {};
    }

    // ✅ filter fields
    const result: Partial<IUser> = {};

    fields.forEach((field) => {
      if (field in user) {
        result[field as keyof IUser] = user[field as keyof IUser];
      }
    });

    return result;
  }

  //P05 generate id ใหม่
  create(dto: CreateUserDto) {
    const newId = (
      Math.max(...this.users.map((u) => Number(u.id))) + 1
    ).toString();

    const newUser = {
      id: newId,
      ...dto,
    };
    //P05 เพิ่ม user ใหม่ลงใน array
    this.users.push(newUser);

    const filePath = join(process.cwd(), 'data', 'users.json');
    writeFileSync(filePath, JSON.stringify(this.users, null, 2));

    return newUser;

    return newUser;
  }

  findAll(): IUser[] {
    return this.users;
  }
}
