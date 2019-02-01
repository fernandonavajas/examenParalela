import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GraficoComponent } from '../grafico/grafico.component';
import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private grafico: GraficoComponent) { }

  ngOnInit() {
  }


  logout() {

    if (localStorage.getItem("Usuario") != null) {
      localStorage.removeItem("Usuario");
      localStorage.removeItem("Asignatura");
      this.router.navigateByUrl('');
    }


  }

}
