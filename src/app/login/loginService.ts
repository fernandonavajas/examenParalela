import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  private isUserLoggedIn;
  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }

  login(rut: string, password: string) { // funcion que valida al usuario desde el api y retorna la respuesta del servidor
    const url = 'https://api.sebastian.cl/academia/api/v1/authentication/authenticate';
    //const url = 'http://138.68.23.14/api/v1/authentication/authenticate';
    return this.http.post(url, {
      rut: rut,
      password: password,
    });
  }
}