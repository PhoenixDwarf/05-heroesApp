import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private Router:Router,
              private AuthService:AuthService) { }

  login(){
    // Go to backend
    // User
    this.AuthService.login().subscribe({
      next: (res) => {
        if (res.id){
          this.Router.navigate(['/heroes']);
        }
      }
    });
  }

  ingresarSinlogin(){
    this.AuthService.logout();
    this.Router.navigate(['/heroes']);
  }
}
