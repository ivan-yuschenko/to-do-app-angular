import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddTodo, DeleteTodo, SetTodoList, ToggleTodo } from '../../stores/todo/todo.actions';
import { TodoState } from '../../stores/todo/todo.state';
import { AuthState } from '../../stores/user/auth.state';
import { IToDoItem } from '../../interfaces/IToDoItem.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  value: string = '';
  filter: string = '';

  @Select(TodoState.getActiveTodoList) activeTodoList$?: Observable<IToDoItem[]>;
  @Select(TodoState.getCompletedTodoList) completedTodoList$?: Observable<IToDoItem[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    const token = this.store.selectSnapshot(AuthState.token);
    if (token) {
      this.store.dispatch(new SetTodoList(token));
    }
  }

  addToDoItem() {
    const item: IToDoItem = {
      id: Math.random().toString(36).substring(7),
      title: this.value,
      completed: false,
      timestamp: new Date(Date.now())
    }
    if (this.value.length > 0) {
      this.store.dispatch(new AddTodo(item));
    }
    this.value = '';
  }

  removeItem(item: IToDoItem) {
    this.store.dispatch(new DeleteTodo(item));
  }

  toggleItemStatus(item: IToDoItem) {
    this.store.dispatch(new ToggleTodo(item));
  }
}
