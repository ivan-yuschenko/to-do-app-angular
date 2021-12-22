import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { Routes } from '@angular/router';
import { AuthState } from '../../stores/user/auth.state';
import { NgxsModule, Store } from '@ngxs/store';
import { FakeBackend } from 'src/app/services/fake-backend.service';
import { RegisterComponent } from './register.component';
import { LogInComponent } from '../log-in/log-in.component';
import { Register } from 'src/app/stores/user/auth.actions';
import { AngularMaterialModule } from '../../angular-material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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

  const registerValues = {
    name: '',
    email: '',
    password: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, LogInComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    store = TestBed.inject(Store);
    store.reset(originalState);
    localStorage.setItem('toDoData', JSON.stringify([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check username input behaviour', () => {
    const regForm = component.registrationForm;
    const nameField = regForm.get('name');
    let regVal = {... registerValues};
    expect(nameField?.value).toEqual(regVal.name);
    expect(nameField?.errors).not.toBeNull();
    regVal.name = 'test';
    regForm.setValue(regVal);
    expect(nameField?.errors).toBeNull();
  });

  it('check email input behaviour', () => {
    const regForm = component.registrationForm;
    const emailField = regForm.get('email');
    let regVal = {... registerValues};
    expect(emailField?.value).toEqual(regVal.email);
    regVal.email = '123123';
    regForm.setValue(regVal);
    expect(emailField?.errors).not.toBeNull();
    regVal.email = 'tst@tst.com';
    regForm.setValue(regVal);
    expect(emailField?.errors).toBeNull();
  });

  it('check password input behaviour', () => {
    const regForm = component.registrationForm;
    const passwordField = regForm.get('password');
    let regVal = {... registerValues};
    expect(passwordField?.value).toEqual(regVal.email);
    regVal.password = '1';
    regForm.setValue(regVal);
    expect(passwordField?.errors).not.toBeNull();
    regVal.password = '123123';
    regForm.setValue(regVal);
    expect(passwordField?.errors).toBeNull();
  });

  it('check register button behaviour', () => {
    localStorage.setItem('toDoData', JSON.stringify([]));
    const button = fixture.debugElement.nativeElement.querySelector('#registerBtn');
    const regForm = component.registrationForm;
    let regVal = {... registerValues};
    regVal.name = 'Test';
    regVal.email = 'tst@tst.com';
    regVal.password = '123123';
    regForm.setValue(regVal);
    let existingUser = {
      name: 'Test',
      email: 'tst@tst.com',
      password:'123123',
      token: 'aaaaa'
    }
    store.dispatch(new Register(existingUser));
    button.click();
    expect(store.selectSnapshot(AuthState.isAuthenticated)).toEqual(false);
    expect(component.showError).toEqual(true);
    regVal.email = 'tst2@tst.com';
    regForm.setValue(regVal);
    button.click();
    expect(store.selectSnapshot(AuthState.isAuthenticated)).toEqual(true);
    expect(component.showError).toEqual(false);
     fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/main');
    });
  });

  it('check login button behaviour', () => {
    fixture.debugElement.nativeElement.querySelector('#loginBtn').click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/login');
    });
  })
});
