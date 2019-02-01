import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort,MatTableDataSource } from '@angular/material';
import { map, filter } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { callbackify } from 'util';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  nombre: string;
  codigo: string;
}

// TODO: replace this with real data from your application
var EXAMPLE_DATA: DataTableItem[] = [
  { codigo: 'COM14200', nombre: 'Programación Ii' },
  { codigo: 'ICCOM200', nombre: 'Computación Ii' },


];

export class DataTableDataSource extends DataSource<DataTableItem> {

  data=new MatTableDataSource(EXAMPLE_DATA);
  cont1: number = 0;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
    var Asignaturas = JSON.parse(localStorage.getItem('Asignaturas'));
    //console.log(Asignaturas[0]);
    Asignaturas.forEach(element => {
      if (EXAMPLE_DATA[this.cont1] == null) {
        EXAMPLE_DATA[this.cont1] = { codigo: '2', nombre: 'Helium' };
      }
      EXAMPLE_DATA[this.cont1].codigo = element.code;
      EXAMPLE_DATA[this.cont1].nombre = element.name;
      this.cont1 = this.cont1 + 1;
    });

  }
  applyFilter(filterValue: string) {
    //console.log(this.data);
    this.data.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.nombre, b.nombre, isAsc);
        case 'id': return compare(+a.codigo, +b.codigo, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
