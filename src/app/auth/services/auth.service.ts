import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environment.baseUrl;
  private _auth:Auth | undefined;

  get auth():Auth{
    return {...this._auth!};
  }

  constructor( private http:HttpClient) { }


  verificaAutenticacion():Observable<boolean>{

    if( !localStorage.getItem('token') ){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map( res => {
          this._auth = res;
          return true;
        })
      );
  }


  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap( res => this._auth = res),
        tap( res => localStorage.setItem('token', res.id))
      );
  }


  logout(){
    this._auth = undefined;
    localStorage.removeItem('token');
  }
}
