import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class Materiales {
  private url ={
    allMateriales: 'http://localhost:3000/materiales/all',
    getMaterialnombre:'http://localhost:3000/materiales/name/:name',
    createMateriales:'http://localhost:3000/materiales',
    updateMateriales:'http://localhost:3000/materiales/:id',
    deleteMateriales:'http://localhost:3000/materiales/:id',
    
  }
  
  constructor(private http: HttpClient){}

  getAllMateriales(){
    return this.http.get<any>(this.url.allMateriales);
  }//cierre de getAllMateriales

  getMaterialNombre(){
    return this.http.get<any>(this.url.getMaterialnombre);
  }


  createMateriales(
    data:{
      celda: number;
      materiales:Array<{
        nombre: string;
        descripcion: string;
        cantidad: number;
        ubicacion: string;
        movimientos: string[];
      }>
    }
  ){
    return this.http.post<any>(this.url.createMateriales, data);
  }

  updateMateriales(
    id: string,
    data:{
      nombre: string;
      descripcion: string;
      cantidad: number;
      ubicacion: string;
      movimientos: string[];
    }
  ){
    const url = this.url.updateMateriales.replace(':id', id);
    return this.http.put<any>(url, data);
  }

  deleteMateriales(
    id: string
  ){
    const url = this.url.deleteMateriales.replace(':id', id);
    return this.http.delete<any>(url);
  }

  
}
