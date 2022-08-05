import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
      margin: 10px;
    }

  `]
})
export class HomeComponent implements OnInit {

  get auth(){
    return this.AuthService.auth;
  }

  constructor(private Router:Router,
              private AuthService:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.Router.navigate(['./auth']);
  }
}
