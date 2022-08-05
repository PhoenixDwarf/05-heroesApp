import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate{

  constructor(private AuthService:AuthService,
              private Router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return this.AuthService.verificaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if( !estaAutenticado ) {
              this.Router.navigate(['./auth/login']);
            }
          })
        );
      
      //if (this.AuthService.auth.id){
      //  return true;
      //}

      //console.log('Bloqueado por el AuthGuard - canActivate');
      //return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> {

      return this.AuthService.verificaAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if( !estaAutenticado ) {
            this.Router.navigate(['./auth/login']);
          }
        })
      );

      //if (this.AuthService.auth.id){
      //  return true;
      //}

      //console.log('Bloqueado por el AuthGuard - canLoad');
      //return false;
  }

}
