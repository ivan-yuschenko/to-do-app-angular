export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { email: string; password: string }) {}
}
  
export class Logout {
    static readonly type = '[Auth] Logout';
}

export class Register {
    static readonly type = '[Auth] Register';
    constructor(public payload: { name: string; email: string; password: string, token: string }) {}
}