import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service"; // Ajouter l'importation du JwtHelperService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  hiddenPassword: boolean = true;

  constructor(private router: Router, private authService: AuthService) {
  }

  Login() {

    let user = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(user).subscribe()
  }
}
