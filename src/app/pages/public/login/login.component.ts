import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/interfaces/Login';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login: Login = {
    numberoremail: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      place1: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  doLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.login).subscribe(
        (data) => {
          if (data === null) {
            alert('Nelson Mandela');
          } else {
            window.localStorage.setItem('user', JSON.stringify(data));
            this.router.navigate(['']);
          }
        },
        (error) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Verifique los campos.');
    }
  }
  
}
