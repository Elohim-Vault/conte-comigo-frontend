import { Component, OnInit } from '@angular/core';
import {GainService} from "../../services/gain/gain.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-gain',
  templateUrl: './create-gain.page.html',
  styleUrls: ['./create-gain.page.scss'],
})
export class CreateGainPage implements OnInit {
  value: any;
  isChecked: any;

  gain = {
    description: '',
    value: 0,
    recurrence_date: '',
    receipt_date: ''
  };
  constructor(private gainService: GainService, private router: Router) { }

  ngOnInit() {
  }

  async create() {
    console.log(this.gain);
    this.gainService.create(this.gain).subscribe(() =>{
      this.router.navigate(['/home']);
    });
  }

  changeRecurrence() {
    document.getElementById('recurrenceDate').setAttribute('disabled', String(this.isChecked));
    this.gain.recurrence_date = '';
    console.log(this.gain.recurrence_date);
  }
}
