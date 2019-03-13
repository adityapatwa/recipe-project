import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.store.dispatch(new AuthActions.TrySignIn({username: email, password: password}));

  }

  signUp() {
    this.router.navigate(['signup']);
  }

  private initForm() {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
  }

}
