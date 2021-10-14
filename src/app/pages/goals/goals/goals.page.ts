import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonInfiniteScroll, LoadingController} from "@ionic/angular";
import {GoalService} from "../../../services/goals/goal.service";
import { ModalController } from '@ionic/angular';
import {GoalsDetailPage} from "../goals-detail/goals-detail.page";
import {BehaviorSubject, Observable} from 'rxjs';
import {LoadingControllerService} from "../../../services/loading/loading-controller-service";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) public infinite: IonInfiniteScroll;
  public goalData: Array<any> = [];
  public pageNumber = 0;

  public isPending: Observable<boolean>;
  constructor(private goalService: GoalService,
              private modalController: ModalController,
              private alertController: AlertController,
              private loadingController: LoadingControllerService
  ) { }


  ngOnInit() {
    this.isPending = this.loadingController.isPending;
    this.infiniteGoal();
  }

  async presentModal(goal) {
    const modal = await this.modalController.create({
      component: GoalsDetailPage,
      cssClass: 'goals-detail',
      componentProps: {
        goalInput: goal
      }
    });

    modal.onDidDismiss().then(data => {
      this.goalData = this.goalData.filter(goal => goal.id !== data.data.id);
      this.goalData.push(data.data);
    });
    return await modal.present();
  }

  async presentAlert(message, goal) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção',
      subHeader: 'Essa ação é irreversível',
      message,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            goal.done = 1;
            this.goalService.update(goal).subscribe((response) => {
              this.goalData = this.goalData.filter(data => data.id !== goal.id);
            });
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
        this.loadingController.pending.next(false);
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

  confirmTaskDone(goal) {
    if (goal.value === goal.current_value)
    {
      this.presentAlert('Você tem certeza que deseja marcar essa meta como concluida?', goal);
    }
    else
    {
      this.presentAlert('Essa meta não foi cumprida. Você tem certeza que deseja marcar essa meta como concluida?', goal);
    }
  }
}
