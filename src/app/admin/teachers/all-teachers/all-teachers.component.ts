import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DevicesService } from './device.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Devices } from './device.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { ViewDialogComponent } from './dialogs/view-dialog/view-dialog.component';
import { DeviceHistoryComponent } from './dialogs/device-history/device-history.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.scss'],
})
export class AllTeachersComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'select',
    'name',
    'deviceMacAddress',
    'city',
    'pinPoint',
    'gpslocation',
    'status',
    'actions',
  ];
  exampleDatabase?: DevicesService;
  dataSource!: any;
  selection = new SelectionModel<Devices>(true, []);
  id?: number;
  teachers?: Devices;
  breadscrums = [
    {
      title: 'All Device',
      items: ['Deveice'],
      active: 'All Device',
    },
  ];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public teachersService: DevicesService,
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) {
    super();
  }
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();
  }

  listData:any
  totalItems = 0
  currentPage = 1;
  itemsPerPage = 10;
  searchDeviceName: any
  searchCity: any
  searchPinLocation: any
  searchDeviceStatus: any

  filteredData() {
    return this.listData.filter((item: any) => {
      const DeviceName = !this.searchDeviceName || item.deviceName.toLowerCase().includes(this.searchDeviceName.toLowerCase());
      const City = !this.searchCity || item.city.toString().includes(this.searchCity.toString());
      const Location = !this.searchPinLocation || item.pinPoint.toString().includes(this.searchPinLocation.toString());
      const DeviceStatus = !this.searchDeviceStatus || item.status.toString().includes(this.searchDeviceStatus.toString());
      return  DeviceName && City && Location && DeviceStatus;
    });
  }

  loadData() {
    this.teachersService.getDevices().subscribe(
      (response) => {
        console.log('Response Data:', response);
        this.listData = response;
        this.totalItems = this.listData.length;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedItems(): any {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.listData.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  changeItemsPerPage() {
    this.currentPage = 1; // Reset to first page
    this.loadData(); // Reload the data based on new itemsPerPage value
  }

  refresh() {
    this.loadData();
  }
  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        teachers: this.teachers,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase?.dataChange.value.unshift(
          this.teachersService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  editCall(row: Devices) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        teachers: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.teachersService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
          this.showNotification(
            'black',
            'Edit Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }
  viewCall(row: Devices) {
    console.log('row',row)
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(ViewDialogComponent, {
      data: {
        teachers: row,
        action: 'view',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.teachersService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
          this.showNotification(
            'black',
            'Edit Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }

  history(row: Devices) {
    console.log('row',row)
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeviceHistoryComponent, {
      data: {
        teachers: row,
        action: 'history',
      },
      direction: tempDirection,
    });
  }

  deleteItem(row: Devices) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
          this.showNotification(
            'snackbar-danger',
            'Delete Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row:any) =>
        this.selection.select(row)
      );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d:any) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase?.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Devices>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
 
  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x:any) => ({
        Name: x.name,
        DiviceMacAddress:x.deviceMacAddress,
        City: x.city,
        District: x.district,
        PinPoint: x.pinPoint,
        Location: x.gpsLocation,
        WeatherStatus: x.weatherStatus,
        Status: x.status
        // 'Joining Date': formatDate(new Date(x.date), 'yyyy-MM-dd', 'en') || '',
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: Devices) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}

export class ExampleDataSource extends DataSource<Devices> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Devices[] = [];
  renderedData: Devices[] = [];
  constructor(
    public exampleDatabase: DevicesService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Devices[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllDevices();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((teachers: Devices) => {
            const searchStr = (
              teachers.name +
              teachers.deviceMacAddress +
              teachers.city +
              teachers.district +
              teachers.pinPoint +
              teachers.gpsLocation +
              teachers.recommendation +
              teachers.status
              // teachers.weatherStatus
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
          
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {
    //disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: Devices[]): Devices[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
          case 'locationName':
            [propertyA, propertyB] = [a.locationName, b.locationName];
            break;
          case 'diviceMacAddress':
            [propertyA, propertyB] = [a.deviceMacAddress, b.deviceMacAddress];
            break;
        case 'city':
          [propertyA, propertyB] = [a.city, b.city];
          break;
        case 'district':
          [propertyA, propertyB] = [a.district, b.district];
          break;
        case 'pinPoint':
          [propertyA, propertyB] = [a.pinPoint, b.pinPoint];
          break;
          case 'gpslocation':
            [propertyA, propertyB] = [a.gpsLocation, b.gpsLocation];
            break;
        case 'recommendation':
          [propertyA, propertyB] = [a.recommendation, b.recommendation];
          break;
        // case 'weatherStatus':
        //   [propertyA, propertyB] = [a.weatherStatus, b.weatherStatus];
        //   break;
        case 'status':
          [propertyA, propertyB] = [a.status, b.status];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
