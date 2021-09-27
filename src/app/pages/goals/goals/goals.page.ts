import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from "@ionic/angular";
import {GoalService} from "../../../services/goals/goal.service";
import { ModalController } from '@ionic/angular';
import {GoalsDetailPage} from "../goals-detail/goals-detail.page";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) public infinite: IonInfiniteScroll;
  goalData: Array<any> = [];
  pageNumber = 0;
  constructor(private goalService: GoalService, private modalController: ModalController) { }

  ngOnInit() {
    this.infiniteGoal();
  }

  async presentModal(goal) {
    const modal = await this.modalController.create({
      component: GoalsDetailPage,
      cssClass: 'goals-detail',
      componentProps: {
        id: goal.id,
        currentValue: goal.current_value,
        value: goal.value
      }
    });
    console.log(goal);
    return await modal.present();
  }
  infiniteGoal(isFirstLoad = false, event?) {
    this.goalService.get(7)
      .subscribe((response: any) => {
        response.data.forEach((item) => {
          this.goalData.push(item);
        });
        if (response.next_page_url == null) {
          this.infinite.disabled = true;
        }
        if (isFirstLoad) {
          this.infinite.complete();
        }
        this.pageNumber++;
      }, error => {
        console.log(error);
      });
  }

  doInfinite(event) {
    this.infiniteGoal(true, event);
  }

  changeStatus(goal) {
    console.log(goal);
  }
}
