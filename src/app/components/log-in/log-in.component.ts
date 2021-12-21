import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../stores/user/auth.actions';
import { AuthState } from '../../stores/user/auth.state';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  loginForm: FormGroup;
  showError: boolean = false; 

  constructor(private formBuilder: FormBuilder, private readonly store: Store,  private router: Router ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    console.log('snap', this.store.snapshot())
    if (!this.loginForm.controls['email'].invalid && !this.loginForm.controls['password'].invalid) {
      const payload: {email: string; password: string} = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.store.dispatch(new Login(payload)).subscribe(() => 
      {
        if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
          this.showError = false;
          this.router.navigate(['/main']);
        } else {
          this.showError = true;
        }
      });
    }
  }
}
