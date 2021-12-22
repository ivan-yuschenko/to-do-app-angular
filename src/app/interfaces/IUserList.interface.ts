import { IToDoItem } from './IToDoItem.interface';

export interface IUserList {
  name: string;
  email: string;
  password: string;
  token: string;
  todoList: Array<IToDoItem>;
}