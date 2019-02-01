import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class dataTableService {

  constructor(private http: HttpClient) {
  }

  getAsignaturas(apiKey: string): void { // funcion que guarda las asignaturas en el local storage
    this.ServicioAsignatura(apiKey)
      .subscribe(
        restRamos => {
          localStorage.setItem('Asignaturas', JSON.stringify(restRamos));
        }
      )
  }
  ServicioAsignatura(apiKey: string) { // funcion que hace la llamada a la api y reorna las asignaturas
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=UTF-8",  // declaracion de los headers
      "X-API-KEY": apiKey,
    })
    const url = `https://api.sebastian.cl/academia/api/v1/courses/subjects`;
    //const url = `http://138.68.23.14/api/v1/courses/subjects`;
    return this.http
      .get<any[]>(url, { headers })  // consulta get
      .pipe(map(data => data));
  }
}