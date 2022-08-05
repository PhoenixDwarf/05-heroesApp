import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
    mat-card{
      margin-top: 20px;
    }
`
  ]
})
export class HeroeTarjetaComponent  {

  @Input() heroe!:Heroe; //We are telling typescript "trust me bro, you'll always have a hero" by adding the exclamation mark !

}
