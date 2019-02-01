import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort,MatTableDataSource } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { dataTableService } from './data-tableService';
import { filter } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';


export interface DataTableItem {
  nombre: string;
  codigo: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  constructor(private dataTableService: dataTableService) {
    var User = JSON.parse(localStorage.getItem('Usuario'));
    this.dataTableService.getAsignaturas(User.apiKey);
    var Asignaturas = JSON.parse(localStorage.getItem('Asignaturas'));
    //console.log(Asignaturas);
  }
  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);
  }
  doFilter(filterValue: string) {
    this.dataSource.applyFilter(filterValue);
    console.log(this.dataSource.data.filteredData);
    this.dataSource.data.filter = filterValue.trim().toLowerCase();

  }
  buscar(codigo: string){
    this.dataSource.applyFilter(codigo);
    //console.log(this.dataSource.data.filteredData);
    this.dataSource.data.filter = codigo.trim().toLowerCase();
    
  }


}
