import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { TodoState } from '../../stores/todo/todo.state';
import { FakeBackend } from 'src/app/services/fake-backend.service';
import { TodoTableComponent } from '../todo-table/todo-table.component';
import { AngularMaterialModule } from '../../angular-material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main.component';
import { environment } from 'src/environments/environment';
import { AuthState } from '../../stores/user/auth.state';
import { FormsModule } from '@angular/forms';
import { Register, Login } from '../../stores/user/auth.actions';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let store: Store;

  const originalState = {
    auth: { token: "", name: "" },
    todo: { todoList: [] }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent, TodoTableComponent],
      imports: [
        NgxsModule.forRoot([AuthState, TodoState], {
          developmentMode: !environment.production
        }),
        AngularMaterialModule, 
        BrowserAnimationsModule,
        FormsModule
      ],
      providers: [FakeBackend]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    store.reset(originalState);
    localStorage.setItem('toDoData', JSON.stringify([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.value).toEqual('');
    expect(component.filter).toEqual('');
  });

  it('check adding new item', () => {
    localStorage.setItem('toDoData', JSON.stringify([]));
    expect(store.selectSnapshot(TodoState.getActiveTodoList).length).toEqual(0);
    let existingUser = {
      name: 'Test',
      email: 'tst@tst.com',
      password:'123123',
      token: 'aaaaa'
    }
    let loginData = {
      email: 'tst@tst.com',
      password:'123123',
    }
    component.value = 'test';
    store.dispatch(new Register(existingUser));
    store.dispatch(new Login(loginData));
    fixture.detectChanges();
    component.addToDoItem();
    expect(store.selectSnapshot(TodoState.getActiveTodoList).length).toEqual(1);
    expect(component.value).toEqual('');
  });
});
