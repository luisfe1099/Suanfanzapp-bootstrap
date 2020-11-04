import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodesPhoneI } from 'src/app/shared/interfaces/CodesPhoneI';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CodesService } from 'src/app/shared/services/codes.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { ContactI } from '../../interfaces/ContactI';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss'],
})
export class ProfileBarComponent implements OnInit {
  isEmail: boolean = false;
  isPhone: boolean = false;
  codesPhone: CodesPhoneI[] = [];
  selectedCode: CodesPhoneI;
  newContact: ContactI = {
    contact_id: '',
    contact_name: '',
    person_id_from: '',
  };
  newContactForm: FormGroup;

  constructor(
    private codesService: CodesService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.getPlacesCode();
    this.newContactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      emailornumber: ['', [Validators.required]],
    });
  }

  getPlacesCode() {
    this.codesService.getCodes().subscribe((data) => {
      this.codesPhone = data.data;
    });
  }

  logout() {
    this.authService.logout();
  }

  saveContact() {
    if (!this.newContactForm.valid) {
      alert('Verifique los campos');
    } else {
      this.personService
        .findPerson(this.newContactForm.get('emailornumber').value)
        .subscribe(
          (data) => {
            this.newContact.contact_id = data[0].number;
            this.newContact.contact_name = this.newContactForm.get(
              'name'
            ).value;
            this.newContact.person_id_from = JSON.parse(
              localStorage.getItem('user')
            )[0].number;
            console.log(JSON.parse(localStorage.getItem('user'))[0].number);

            this.personService.saveContact(this.newContact).subscribe(
              (data) => {
                alert('Creado existosamente.');
              },
              (error) => {
                alert(error.error.message);
              }
            );
          },
          (error) => {
            alert(error.error.message);
          }
        );
    }
  }
}
