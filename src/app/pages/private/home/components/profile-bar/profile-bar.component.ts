import { Component, OnInit } from '@angular/core';
import { CodesPhoneI } from 'src/app/shared/interfaces/CodesPhoneI';
import { CodesService } from 'src/app/shared/services/codes.service';

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


  constructor(
    private codesService: CodesService,

  ) {}

  ngOnInit(): void {
    this.getPlacesCode();
  }

  getPlacesCode() {
    this.codesService.getCodes().subscribe((data) => {
      this.codesPhone = data.data;
    });
  }
}
