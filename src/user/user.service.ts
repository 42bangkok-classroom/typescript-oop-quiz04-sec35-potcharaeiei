import { Injectable } from '@nestjs/common';
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
  findOne(id: string,fields?:string[]): Partial<IUser> { 
    const user = this.users.find((u) => u.id === id);
    //ถ้าหาไอดีไม่เจอให้โยน Error ออกมา
    if (!user) {
      throw new Error('User not found');
    }
    //ถ้าไม่มีการระบุ fields หรือ fields เป็น array ว่าง ให้ return user ทั้งหมด
    if (!fields || fields.length === 0) {
      return user;
    }
    //ถ้ามีการระบุ fields ให้ return เฉพาะ field ที่ระบุ
    const result: Partial<IUser> = {};
    //วนลูป fields ที่ระบุมา แล้วเช็คว่า field นั้นมีอยู่ใน user หรือไม่ ถ้ามีให้เพิ่มเข้าไปใน result
    fields.forEach((field) => {
      if (field in user) {
        result[field] = user[field as keyof IUser];
      } 
  });   
    return result;
  }
  
  findAll(): IUser[] {
    return this.users;
  }
}
