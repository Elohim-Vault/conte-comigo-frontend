import { Component, OnInit } from '@angular/core';
import {GoalService} from "../../../services/goals/goal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.page.html',
  styleUrls: ['./create-goal.page.scss'],
})
export class CreateGoalPage implements OnInit {
  public minDate = new Date().getFullYear();
  public maxDate = new Date().getFullYear() + 50;
  public goal = {
    description: '',
    deadline: '',
    value: 0
  };


  constructor(private goalService: GoalService, private router: Router) { }

  ngOnInit() {
  }

  async create() {
    this.goalService.create(this.goal).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
