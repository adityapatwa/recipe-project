import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
  }

  static isPasswordSame(group: FormGroup): { [s: string]: boolean } {
    if (group.get('password').value !== group.get('confirmPassword').value) {
      return {'passwordNoMatch': true};
    }
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.passwords.password;
    this.store.dispatch(new AuthActions.TrySignUp({username: email, password: password}));
  }

  onCancel() {
    this.router.navigate(['signin']);
  }

  private initForm() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'passwords': new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'confirmPassword': new FormControl(null, Validators.required)
      }, SignupComponent.isPasswordSame)
    });
  }
}
