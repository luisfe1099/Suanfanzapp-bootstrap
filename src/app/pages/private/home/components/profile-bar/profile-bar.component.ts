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
  newContact: ContactI;

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
    this.personService
      .findPerson(this.newContactForm.get('emailornumber').value)
      .subscribe(
        (data) => {
          this.newContact.contact_id = data.number;
          this.newContact.contact_name = this.newContactForm.get('name').value;
          this.newContact.person_id_from = JSON.parse(
            localStorage.getItem('user')
          ).number;
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
