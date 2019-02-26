import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'passwords': new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'confirmPassword': new FormControl(null, Validators.required)
      }, this.isPasswordSame)
    });
  }

  isPasswordSame(group: FormGroup): { [s: string]: boolean } {
    if (group.get('password').value !== group.get('confirmPassword').value) {
      return {'passwordNoMatch': true};
    }
  }

  onSubmit() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.passwords.password;
    this.authService.signUpUser(email, password);
  }

  onCancel() {
    this.router.navigate(['signin']);
  }
}
