import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddTodo, ToggleTodo, DeleteTodo, SetTodoList } from './todo.actions';
import { IToDoItem } from '../../interfaces/IToDoItem.interface';
import { IToDoState } from '../../interfaces/IToDoState.interface';
import { updateItem, patch } from '@ngxs/store/operators';
import { AuthState } from '../user/auth.state';
import { Store } from '@ngxs/store';
import { FakeBackend } from '../../services/fake-backend.service';
import { Injectable } from '@angular/core';
import { IUserList } from '../../interfaces/IUserList.interface';
import { first } from 'rxjs';

@State<IToDoState>({
  name: 'todo',
  defaults: {
    todoList: [],
  }
})

@Injectable()
export class TodoState {

  constructor(private backendService: FakeBackend, private store: Store) {}

  @Selector()
  static getActiveTodoList(state: IToDoState): IToDoItem[] {
    let newList = state.todoList.filter(item => {
      return item.completed === false;
    })
    return newList;
  }

  @Selector()
  static getCompletedTodoList(state: IToDoState): IToDoItem[] {
    let newList = state.todoList.filter(item => {
      return item.completed === true;
    })
    return newList;
  }

  @Action(AddTodo)
  createTodo(ctx: StateContext<IToDoState>, action: AddTodo) {
    const token =  this.store.selectSnapshot(AuthState.token);
    if (token) {
      this.backendService.createTodo(token, action.payload).pipe(first()).subscribe((res: IToDoItem) => {
        if (res) {
            ctx.patchState({
              todoList: [res, ...ctx.getState().todoList]
            });
        } 
      });
    }
  }

  @Action(DeleteTodo)
  deleteTodo(ctx: StateContext<IToDoState>, action: DeleteTodo) {
    const token =  this.store.selectSnapshot(AuthState.token);
    if (token) {
      this.backendService.deleteTodo(token, action.payload).pipe(first()).subscribe((res: IToDoItem) => {
        if (res) {
          const { todoList } = ctx.getState();
          ctx.patchState({
            todoList: todoList.filter(item => item !== res)
          });
        } 
      });
    }
  }

  @Action(ToggleTodo)
  toggleTodo(ctx: StateContext<IToDoState>, action: ToggleTodo) {
    const token =  this.store.selectSnapshot(AuthState.token);
    if (token) {
      this.backendService.toggleTodo(token, action.payload).pipe(first()).subscribe((res: IToDoItem) => {
        if (res) {
          ctx.setState(
            patch({
                todoList: updateItem((item) => item === action.payload, patch({ completed: res.completed }))
            })
          );
        } 
      });
    }
  }

  @Action(SetTodoList)
  setTodoList(ctx: StateContext<IToDoState>, action: SetTodoList) {
    this.backendService.getUser(action.payload).pipe(first()).subscribe((res: IUserList) => {
      if (res && res.todoList) {
        for (const data of res.todoList) {
          ctx.patchState({
            todoList: [data, ...ctx.getState().todoList]
          });
        }
      } else {
        ctx.patchState({
          todoList: []
        });
      }
    });
  }
}