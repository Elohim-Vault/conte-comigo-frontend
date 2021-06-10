import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public signUp(): void {
    this.auth.signUp(this.user).subscribe((response) => {
      console.log(response);
      this.auth.setNameLocal(response['user'].name);
      this.auth.setTokenLocal(response['token']);
      this.router.navigate(['/home']);
    });
  }
}
