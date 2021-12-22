import { ComponentFixture, TestBed} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { Routes } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { NgxsModule, Store } from '@ngxs/store';
import { AuthState } from '../../stores/user/auth.state';
import { Register } from '../../stores/user/auth.actions';
import { FakeBackend } from 'src/app/services/fake-backend.service';
import { LogInComponent } from './log-in.component';
import { AngularMaterialModule } from '../../angular-material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let location: Location;
  let store: Store;

  const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'register', component: RegisterComponent }
  ];

  const originalState = {
    auth: { token: "", name: "" },
    todo: { todoList: [] }
  }

  const loginValues = {
    email: '',
    password: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogInComponent, RegisterComponent],
      imports: [
        FormsModule, 
        ReactiveFormsModule, 
        RouterTestingModule.withRoutes(routes), 
        NgxsModule.forRoot([AuthState], {
          developmentMode: !environment.production
        }),
        AngularMaterialModule,
        BrowserAnimationsModule
      ],
      providers: [FakeBackend]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    store = TestBed.inject(Store);
    store.reset(originalState);
    localStorage.setItem('toDoData', JSON.stringify([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.showError).toEqual(false);
  });

  it('check email input behaviour', () => {
    const loginForm = component.loginForm;
    const emailField = loginForm.get('email');
    let loginVal = {... loginValues};
    expect(emailField?.value).toEqual(loginVal.email);
    loginVal.email = '123123';
    loginForm.setValue(loginVal);
    expect(emailField?.errors).not.toBeNull();
    loginVal.email = 'tst@tst.com';
    loginForm.setValue(loginVal);
    expect(emailField?.errors).toBeNull();
  });

  it('check password input behaviour', () => {
    const loginForm = component.loginForm;
    const passwordField = loginForm.get('password');
    let loginVal = {... loginValues};
    expect(passwordField?.value).toEqual(loginVal.password);
    expect(passwordField?.errors).not.toBeNull();
    loginVal.password = '123123';
    loginForm.setValue(loginVal);
    expect(passwordField?.errors).toBeNull();
  });

  it('check login button behaviour', () => {
    localStorage.setItem('toDoData', JSON.stringify([]));
    store.reset(originalState);
    const button = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    const loginForm = component.loginForm;
    let loginValues = {
      email: 'tst@tst.com',
      password: '123123'
    };
    loginForm.setValue(loginValues);
    button.click();
    expect(store.selectSnapshot(AuthState.isAuthenticated)).toEqual(false);
    expect(component.showError).toEqual(true);
    let registerData = {
      name: 'test',
      email: 'tst@tst.com',
      password: '123123',
      token: Math.random().toString(36).substring(7)
    }
    store.dispatch(new Register(registerData));
    button.click();
    expect(store.selectSnapshot(AuthState.isAuthenticated)).toEqual(true);
    expect(component.showError).toEqual(false);
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/main');
    });
  });

  it('check register button behaviour', () => {
    fixture.debugElement.nativeElement.querySelector('#registerBtn').click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/register');
    });
  })
});
