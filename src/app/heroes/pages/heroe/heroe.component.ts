import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    .left-side{
      display: flex;
      flex-direction: column;
      align-items: center;
      
    }
    img{
      border-radius: 10px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;


  constructor(private ActivatedRoute:ActivatedRoute, 
              private HeroesService:HeroesService) { }

  ngOnInit(): void {

    // this.ActivatedRoute.params.subscribe( ({id}) => {
    //   this.HeroesService.getHeroePorId(id).subscribe({
    //     next: (res) => {
    //       this.heroe = res;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     }
    //   });
    // });

    this.ActivatedRoute.params
    .pipe(
      switchMap( 
        ({id}) => this.HeroesService.getHeroePorId(id))
    )
    .subscribe( heroe => this.heroe = heroe );

  }

}
