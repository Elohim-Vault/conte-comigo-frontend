import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account/account.service';
import {GoalService} from "../../services/goals/goal.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  public account;
  public goal;

  constructor(private goalService: GoalService, private accountService: AccountService) {
    this.accountService.userAccount().subscribe(response => {
      this.account = response;
      console.log(this.account);
    });

    this.goalService.get().subscribe((response) => {
      response = response['data'];
      this.goal = response[Object.keys(response).length - 1];
    });
  }

  ngOnInit() {

  }


}
