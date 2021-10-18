import { Component, OnInit } from '@angular/core';
import {GoalService} from '../../../services/goals/goal.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Observable} from "rxjs";
import {LoadingControllerService} from "../../../services/loading/loading-controller-service";

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.page.html',
  styleUrls: ['./create-goal.page.scss'],
})
export class CreateGoalPage implements OnInit {
  public minDate = new Date().getFullYear();
  public maxDate = new Date().getFullYear() + 50;
  public isPending: Observable<boolean>;
  public goal = {
    description: '',
    deadline: '',
    value: 0
  };


  constructor(private goalService: GoalService,
              private router: Router,
              private location: Location,
              private loadingController: LoadingControllerService) { }

  ngOnInit() {
  }

  create() {
    this.isPending = this.loadingController.isPending;
    this.goalService.create(this.goal).subscribe(
      () =>{
        this.loadingController.pending.next(false);
        this.router.navigate(['/transactions']);
      },
      err => {
        this.loadingController.pending.next(false);
        console.error(err.message);
      }
    );
    this.loadingController.pending.next(true);
  }

  back() {
    this.location.back();
  }
}
