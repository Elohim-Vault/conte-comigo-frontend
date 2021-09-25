import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account/account.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-goals-detail',
  templateUrl: './goals-detail.page.html',
  styleUrls: ['./goals-detail.page.scss'],
})
export class GoalsDetailPage implements OnInit {
  @Input() currentValue: number;
  @Input() value: number;
  public account;
  public newValue = new FormControl(0);
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.userAccount().subscribe((response) => {
      this.account = response;
      console.log(this.value);
    });
  }


}
