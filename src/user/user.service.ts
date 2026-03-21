import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
  test(): any[] {
    return [];
  }
  private users: IUser [] ;

  constructor() {
    const filePath = join(process.cwd(),'data', 'users.json');
    const data = readFileSync(filePath, 'utf-8');
    this.users = JSON.parse(data);
  }
  findAll(): IUser[] {
    return this.users;
  }
}
