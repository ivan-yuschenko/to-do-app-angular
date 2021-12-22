import { Action, Selector, State, StateContext, NgxsOnInit } from '@ngxs/store';
import { IAuthState } from "src/app/interfaces/IAuthState.interface";
import { Login, Logout, Register } from './auth.actions';
import { FakeBackend } from '../../services/fake-backend.service';
import { Injectable } from '@angular/core';
import { IUserState } from '../../interfaces/IUserState.interface'
import { first } from 'rxjs';

@State<IAuthState>({
  name: 'auth',
  defaults: {
    token: '',
    name: '',
  }
})

@Injectable()
export class AuthState implements NgxsOnInit  {

  constructor(private backendService: FakeBackend) {}

  @Selector()
  static token(state: IAuthState) { 
    return state.token; 
  }

  @Selector()
  static isAuthenticated(state: IAuthState): boolean {
    return !!state.token;
  }

  @Selector()
  static getUserName(state: IAuthState) {
    return state.name;
  }

  ngxsOnInit(ctx: StateContext<IAuthState>) {
    const token = this.backendService.getToken();
    this.backendService.loginWithToken(token).pipe(first()).subscribe((res: IUserState) => {
      if (res.token) {
        ctx.patchState({
          token: res.token,
          name: res.name
        });
      }
    });
  }


  @Action(Register)
  register(ctx: StateContext<IAuthState>, action: Register) {
    if (!this.backendService.isUserRegistered(action.payload.email)) {
      this.backendService.register(action.payload.name, action.payload.email, action.payload.password, action.payload.token).pipe(first()).subscribe((res: IUserState) => {
        if (res.token) {
          ctx.patchState({
            token: res.token,
            name: res.name
          });
          this.backendService.setToken(res.token);
        }
      });
    }
  }

  @Action(Login)
  login(ctx: StateContext<IAuthState>, action: Login) {
    this.backendService.login(action.payload.email, action.payload.password).pipe(first()).subscribe((res: IUserState) => {
      if (res.token) {
        ctx.patchState({
          token: res.token,
          name: res.name
        });
        this.backendService.setToken(res.token);
      }
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<IAuthState>, action: Logout) {
    ctx.patchState({
      token: '',
      name: ''
    });
    this.backendService.setToken('');
  }
}