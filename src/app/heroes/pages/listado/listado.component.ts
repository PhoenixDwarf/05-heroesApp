import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit {

  heroesArray:Heroe[] = [];

  constructor( private HeroesService:HeroesService ) { }

  ngOnInit(): void {

    this.HeroesService.getHeroes().subscribe({
      next: (res) => {
        this.heroesArray = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
    
  }

}
