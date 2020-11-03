import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CodesPhoneI } from 'src/app/shared/interfaces/CodesPhoneI';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CodesService } from 'src/app/shared/services/codes.service';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  codesPhone: CodesPhoneI[] = [];
  selectedCode: CodesPhoneI;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private codesService: CodesService,
    private personService: PersonService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPlacesCode();
    this.registerForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              "[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+.){1,}([a-z]{2,16})"
            ),
          ],
        ],
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        number: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      },
      { validator: this.checkPasswords }
    );
  }

  getPlacesCode() {
    this.codesService.getCodes().subscribe((data) => {
      this.codesPhone = data.data;
    });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }
  doRegister(e) {
    e.preventDefault();
    if (this.registerForm.valid) {
      this.personService
        .savePerson(this.registerForm.value)
        .subscribe((data) => {
          alert('Usuario creado existosamente');
          this.goToLogin();
        });
    } else {
      alert('Verifique los campos');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
