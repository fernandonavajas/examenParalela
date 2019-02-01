import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class graficoService {

    constructor(private http: HttpClient) {
    }
    getAsignatura(apiKey: string, codigo: string) {
        this.servicioAsignatura(apiKey, codigo)
            .subscribe(
                restAsignatura => {
                    localStorage.setItem('Asignatura', JSON.stringify(restAsignatura));
                })
    };
    servicioAsignatura(apiKey: string, codigo: string) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json;charset=UTF-8",  // declaracion de los headers
            "X-API-KEY": apiKey,
        })
        const url = `https://api.sebastian.cl/academia/api/v1/rankings/years/${codigo}`;
        return this.http
            .get<any[]>(url, { headers })  // consulta get
            .pipe(map(data => data));
    }

    getAnio(apiKey: string) {
        this.servicioAnio(apiKey)
            .subscribe(
                restAnio => {
                    localStorage.setItem('Anio', JSON.stringify(restAnio));
                })
    };
    servicioAnio(apiKey: string) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json;charset=UTF-8",  // declaracion de los headers
            "X-API-KEY": apiKey,
        })
        const url = `https://api.sebastian.cl/academia/api/v1/rankings/years`;
        return this.http
            .get<any[]>(url, { headers })  // consulta get
            .pipe(map(data => data));
    }

}