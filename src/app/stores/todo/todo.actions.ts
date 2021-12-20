import { IToDoItem } from '../../interfaces/IToDoItem.interface';

export class AddTodo {
  static readonly type = '[Todo] Add';
  constructor(public payload: IToDoItem) { }
}
  
export class DeleteTodo {
  static readonly type = '[Todo] Delete';
  constructor(public payload: IToDoItem) { }
}

export class ToggleTodo {
  static readonly type = '[Todo] Toggle';
  constructor(public payload: IToDoItem) { }
}

export class SetTodoList {
  static readonly type = '[Todo] Set';
  constructor(public payload: string) { }
}