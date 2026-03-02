import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  test(): any[] {
    return [];
  }

  async findAll(): Promise<IUser[]> {
    const data = await readFile('data/users.json', 'utf-8');
    return JSON.parse(data) as IUser[];
  }
}
