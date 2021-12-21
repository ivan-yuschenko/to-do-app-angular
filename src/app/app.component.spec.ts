import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { Routes } from '@angular/router';
import { AuthState } from './stores/user/auth.state';
import { NgxsModule, Store } from '@ngxs/store';
import { FakeBackend } from 'src/app/services/fake-backend.service';
import { LogInComponent } from './components/log-in/log-in.component';
import { Login, Register } from './stores/user/auth.actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let store: Store;

  let registerData = {
    name: 'test',
    email: 'tst@tst.com',
    password: '123123',
    token: Math.random().toString(36).substring(7)
  }
  let loginData = {
    email: 'tst@tst.com',
    password: '123123',
  }

  const routes: Routes = [
    { path: 'login', component: LogInComponent },
  ];

  const originalState = {
    auth: { token: "", name: "" },
    todo: { todoList: [] }
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule.withRoutes(routes), NgxsModule.forRoot([AuthState])],
      providers: [FakeBackend]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    store = TestBed.inject(Store);
    store.reset(originalState);
    localStorage.setItem('toDoData', JSON.stringify([]));
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('check original data', () => {
    localStorage.setItem('toDoData', JSON.stringify([]));
    const name = component.name;
    const showLogout = component.showLogout;
    expect(name).toEqual('Stranger');
    expect(showLogout).toEqual(false);
  });

  it('check data after login', () => {
    localStorage.setItem('toDoData', JSON.stringify([]));
    store.dispatch(new Register(registerData));
    store.dispatch(new Login(loginData));
    expect(component.name).toEqual(registerData.name);
    expect(component.showLogout).toEqual(true);
  });

});
