import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonInfiniteScroll} from "@ionic/angular";
import {GoalService} from "../../../services/goals/goal.service";
import { ModalController } from '@ionic/angular';
import {GoalsDetailPage} from "../goals-detail/goals-detail.page";
import {Router} from "@angular/router";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) public infinite: IonInfiniteScroll;
  goalData: Array<any> = [];
  pageNumber = 0;
  constructor(private goalService: GoalService,
              private modalController: ModalController,
              private router: Router,
              private alertController: AlertController
  ) { }

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
    return await modal.present();
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção',
      subHeader: 'Essa ação é irreversível',
      message,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
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

  taskDone(goal) {
    if (goal.value === goal.current_value)
    {
      this.presentAlert('Você tem certeza que deseja marcar essa meta como concluida?');
    }
    else
    {
      this.presentAlert('Essa meta não foi cumprida. Você tem certeza que deseja marcar essa meta como concluida?');
    }
  }
}
