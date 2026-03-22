import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import { readFileSync } from 'fs';
import { join } from 'path';

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

    // ✅ ไม่มี fields → return ทั้ง object
    if (!fields || fields.length === 0) {
      return user;
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

  findAll(): IUser[] {
    return this.users;
  }
}