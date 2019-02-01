import { Component, Injectable, OnInit } from '@angular/core';
import { graficoService } from './graficoService';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})

@Injectable()
export class GraficoComponent implements OnInit {
  cont = 0;
  // lineChart
  public lineChartData: Array<any> = [
    { data: [], label: 'Asignatura' },
    { data: [], label: 'Promedio Utem' }
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(private graficoService: graficoService) {

  }

  ngOnInit() {
  }


  public randomize(codigo: string): void {
    var Asignatura = JSON.parse(localStorage.getItem('Asignatura'));
    var Anio = JSON.parse(localStorage.getItem('Anio'));
    let _lineChartData: Array<any> = new Array();
    var User = JSON.parse(localStorage.getItem('Usuario'));
    this.graficoService.getAsignatura(User.apiKey, codigo);
    this.graficoService.getAnio(User.apiKey);
    //console.log(Anio)
    if (Asignatura == null) {  // si la asignatura es nula que guarde los nuevos datos
    }
    else {   // cuando asignatura tenga valores
      if (Anio == null) {

      }
      else {
        //console.log(Anio);
        this.lineChartLabels = [];
        Asignatura.forEach(element => {
          //console.log(element.year);

          if (this.lineChartLabels[this.cont] == null) {
            this.lineChartLabels[this.cont] = 'a';
          }
          this.lineChartLabels[this.cont] = element.year;
          //console.log(this.cont);
          //console.log(this.lineChartData[0].data[this.cont]);

          if (this.lineChartData[0] == null) {
            this.lineChartData[0].data[this.cont] = 'a';
            this.lineChartData[0].label = 'Asignatura'
          }
          if (this.lineChartData[1] == null) {
            this.lineChartData[1].data[this.cont] = 'a';
            this.lineChartData[1].label = 'Promedio Utem'
          }
          this.lineChartData[0].data[this.cont] = element.average;
          this.lineChartData[1].data[this.cont] = element.average;

          this.cont++;

        });
        this.cont = 0;
      }
    }
    
    if (Anio == null) {
    }
    else {
      var cont2=0;
      //console.log(this.lineChartData);
      //console.log(this.lineChartLabels);
      //console.log(Anio);
      this.lineChartLabels.forEach(cl => {
        Anio.forEach(an => {
          if(cl==an.year){
            this.lineChartData[1].data[cont2]=an.average;
          }
        });
        cont2++;
      });
    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}