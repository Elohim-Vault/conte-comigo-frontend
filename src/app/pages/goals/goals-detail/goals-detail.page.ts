import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account/account.service";
import {FormControl, Validators} from "@angular/forms";
import {GoalService} from "../../../services/goals/goal.service";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-goals-detail',
  templateUrl: './goals-detail.page.html',
  styleUrls: ['./goals-detail.page.scss'],
})
export class GoalsDetailPage implements OnInit {
  @Input() goalInput: Array<any>;
  public account;
  public newValue;
  constructor(private accountService: AccountService,
              private goalService: GoalService,
              private router: Router,
              private modalController: ModalController) { }

  ngOnInit() {
    this.accountService.userAccount().subscribe((response) => {
      this.account = response;
      this.newValue = new FormControl(0, [Validators.max(100)]);
      console.log(this.goalInput);
    });
  }

  updateValue() {
    const goal = Object.assign({}, this.goalInput);
    goal['current_value'] += this.newValue.value;
    const newAccount = Object.assign({}, this.account);
    newAccount.value -= this.newValue.value;
    this.accountService.update(newAccount).subscribe();
    this.goalService.update(goal).subscribe((response) => {
      this.modalController.dismiss(goal);
    });
  }
}
