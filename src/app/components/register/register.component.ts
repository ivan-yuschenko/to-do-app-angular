import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { Store } from '@ngxs/store';
import { Register } from 'src/app/stores/user/auth.actions';
import { AuthState } from '../../stores/user/auth.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  showError: boolean = false;

  constructor(private formBuilder: FormBuilder, private readonly store: Store, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    });
  }

  onRegister() {
    if (!this.registrationForm.controls['email'].invalid && !this.registrationForm.controls['password'].invalid && !this.registrationForm.controls['name'].invalid) {
      const user: IUser = {
        name: this.registrationForm.get('name')?.value,
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
        token: Math.random().toString(36).substring(7)
      }
      this.store.dispatch(new Register(user)).subscribe(() => 
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
