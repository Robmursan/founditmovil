import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class Materiales {
  private url ={
    allMateriales: 'http://4.208.84.82:3000/materiales/all',
    getMaterialnombre:'http://4.208.84.82:3000/materiales/name/:name',
    createMateriales:'http://4.208.84.82:3000/materiales',
    updateMateriales:'http://4.208.84.82:3000/materiales/:id',
    deleteMateriales:'http://4.208.84.82:3000/materiales/:id',
    
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
        movimientos: string;
      }>
    }
  ){
    return this.http.post<any>(this.url.createMateriales, data);
  }

  // Español: Actualiza el material asegurando que el cuerpo de la solicitud tenga la misma estructura que createMateriales (incluyendo 'celda' y 'materiales' como array).
  // English: Updates the material ensuring the request body matches createMateriales (including 'celda' and 'materiales' as array).
  updateMateriales(
    id: string,
    data: {
      celda: number;
      nombre: string;
      descripcion: string;
      cantidad: number;
      ubicacion: string;
      movimientos: string;
    }
  ) {
    const url = this.url.updateMateriales.replace(':id', id);
    return this.http.put<any>(url, data); // retorna el resultado de la actualización / returns the update result
  }

  deleteMateriales(
    id: string
  ){
    const url = this.url.deleteMateriales.replace(':id', id);
    return this.http.delete<any>(url);
  }

  
}
