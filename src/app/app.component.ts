import { Component, OnInit } from '@angular/core';
import { AuthState } from './stores/user/auth.state';
import { Logout } from './stores/user/auth.actions';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SetTodoList } from './stores/todo/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name: string = 'Stranger';
  showLogout: boolean = false;

  constructor(private readonly store: Store,  private router: Router) {}

  @Select(AuthState.getUserName) username$?: Observable<string>;

  ngOnInit(): void {
    this.username$?.subscribe(data => {
      if (data) {
        this.name = data;
        this.showLogout = true;
      } else {
        this.name = 'Stranger';
        this.showLogout = false;
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(new Logout()).subscribe(() => 
    {
      if (!this.store.selectSnapshot(AuthState.isAuthenticated)) {
        this.store.dispatch(new SetTodoList(''));
        this.router.navigate(['/login']);
      }
    });
  }
}
