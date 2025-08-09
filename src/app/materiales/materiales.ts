import { Component, OnInit } from '@angular/core';
import { Materiales as MaterialesService } from '../servicios/materiales';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe } from '@angular/common';


@Component({
  selector: 'app-materiales',
  imports: [FormsModule, NgFor, NgIf, DatePipe],
  templateUrl: './materiales.html',
  styleUrl: './materiales.css'
})
export class Materiales {
  material = {
    nombre: '',
    descripcion: '',
    cantidad: '',
    ubicacion: '',
    movimientos: []
  }
  materiales: any;
  
  constructor(private materialesService: MaterialesService, private router: Router){}
  
  consultarTodosMateriales(){
    this.materialesService.getAllMateriales().subscribe(
      res =>{
        this.materiales = res.materiales,
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    )
  }

  navigateToCreate() {
    this.router.navigate(['/create-material']);
  }
}
