import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodesPhoneI } from 'src/app/shared/interfaces/CodesPhoneI';
import { UserI } from 'src/app/shared/interfaces/UserI';
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
  @ViewChild('modal') modal: ElementRef;

  @Input() profilePic: string;

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
  editProfileForm: FormGroup;
  user: UserI;

  constructor(
    private codesService: CodesService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getPlacesCode();
    this.newContactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      emailornumber: ['', [Validators.required]],
    });
    this.editProfileForm = this.formBuilder.group({
      name: this.user[0].name,
      lastname: this.user[0].lastname,
      numberFormat: this.user[0].numberFormat,
      number: this.user[0].number,
      password: ['', Validators.required],
      url_img_profile: this.user[0].url_img_profile,
      email: this.user[0].email,
      id_number_format: this.user[0].id_number_format,
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

  private closeModal(): void {
    this.modal.nativeElement.click();
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
                this.closeModal();
                window.location.reload();
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

  updateProfile() {
    if (!this.editProfileForm.valid) {
      alert('Verifique los campos');
    } else {
      this.personService
        .updatePerson(this.editProfileForm.value)
        .subscribe((data) => {
          alert('Usuario actualizado correctamente.');
          localStorage.setItem('user', JSON.stringify(data));
          window.location.reload();
        });
    }
  }
}
