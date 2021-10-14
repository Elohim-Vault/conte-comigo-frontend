import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController, ModalController} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {}



  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logout',
      message: 'Você tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.authService.signOut().then(() => {
              this.router.navigateByUrl('/login');
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

  logout() {
    this.presentAlert();
  }
}
