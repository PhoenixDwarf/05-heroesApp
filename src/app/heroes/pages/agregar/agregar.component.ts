import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`

    .imgdiv{
      display:flex;
      justify-content: center;
    }
    img{
      width:80%;
      border-radius: 10px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ];

  heroe:Heroe ={
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher:Publisher.DCComics,
    alt_img: ''
  }

  constructor( private HeroesService:HeroesService,
               private ActivatedRoute:ActivatedRoute,
               private Router:Router,
               private SnackBar: MatSnackBar,
               public Dialog: MatDialog ) { }

  ngOnInit(): void {

    if(this.Router.url.includes('editar')){

      this.ActivatedRoute.params
      .pipe(
        switchMap(({id}) => this.HeroesService.getHeroePorId(id))
      )
      .subscribe((heroe) => this.heroe = heroe);
    }

  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0 ){
      return;
    }

    if(this.heroe.id){

      this.HeroesService.actualizarHeroe( this.heroe ).subscribe({
        next: (heroe) => {
          this.mostrarSnackbar('Registro actualizado correctamente');
          this.heroe = heroe;
        }
      });

    } else {

      this.HeroesService.agregarHeroe(this.heroe).subscribe({
        next: (heroe) => {
          this.Router.navigate(['/heroes/editar',heroe.id]);
          this.mostrarSnackbar('Registro creado correctamente');
        }
      });
    }
  }

  borrarHeroe(){

    const dialog = this.Dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe({
      next: (res) =>{
        if(res){
          this.HeroesService.borrarHeroe(this.heroe.id!).subscribe( () => {
            this.Router.navigate(['/heroes']);
          });
        }
      }
    });
  }

  mostrarSnackbar(mensaje:string):void{
    this.SnackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }

}
