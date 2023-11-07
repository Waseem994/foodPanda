import { Component, OnInit, ViewChild,OnDestroy, NgZone, AfterViewChecked  } from '@angular/core';
import {MainService} from './main.service';
import { MainModale } from './main.modale';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Direction } from '@angular/cdk/bidi';
import { Devices } from '../../teachers/all-teachers/device.model';
import { DeviceHistoryComponent } from '../../teachers/all-teachers/dialogs/device-history/device-history.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})



export class MainComponent implements OnInit, OnDestroy{
  breadscrums = [
    {
      title: 'Dashboad',
      items: [],
      active: 'Dashboard 1',
    },
  ];
  
  listData: MainModale[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  counts:any={};
  id?: number;
  teachers?: Devices;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  private unsubscribe$ = new Subject<void>();
  constructor(private myService: MainService,
    private router: Router) {}
    item?: Devices;
    // openDeviceHistory(devices: Devices) {
    //   const dialogRef = this.dialog.open(DeviceHistoryComponent, {
    //     data: {
    //       teachers: devices,
    //       action: 'history',
    //     },
    //   });
    // }

  ngOnInit() {
    this.loadData();
    this.getAllCounts();
        // Start the auto-reload interval
        interval(30000)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.loadData();
          this.getAllCounts();
        });
        // this.filteredData()
    }
  
    ngOnDestroy() {
      // Complete the auto-reload interval
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  
    loadData() {
      this.myService.getDashboard().subscribe(
        (response) => {
          console.log('Response Data:', response);
    
          // Replace the specific date with "Sorry"
          const dateToReplace = 'Wednesday, August 9, 2023, 9:51:10 AM';
          const replacementText = 'This Device is Inactive. You can not see existing Calibration!';
    
          this.listData = response.map(item => {
            if (item.formattedDate === dateToReplace) {
              return { ...item, formattedDate: replacementText };
            }
            return item;
          });
    
          this.totalItems = this.listData.length;
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    }
    
  searchDeviceName: any
  searchCity: any
  searchPinLocation: any
  searchDeviceStatus: any
  searchWeatherStatus: any
  get filteredData() {
    return this.listData.filter((item) => {
      const DeviceName = !this.searchDeviceName || item.devnameicename.toLowerCase().includes(this.searchDeviceName.toLowerCase());
      const City = !this.searchCity || item.city.toString().includes(this.searchCity.toString());
      const Location = !this.searchPinLocation || item.pinPoint.toString().includes(this.searchPinLocation.toString());
      const DeviceStatus = !this.searchDeviceStatus || item.status.toString().includes(this.searchDeviceStatus.toString());
      const WeatherStatus = !this.searchWeatherStatus || item.recommendation.toString().includes(this.searchWeatherStatus.toString());
      return  DeviceName && City && Location && DeviceStatus && WeatherStatus;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedItems(): MainModale[] {
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
  
  getAllCounts() {
    this.myService.getAllCount().subscribe(
      (response) => {
        console.log('Response Counts:', response);
        this.counts = response;
        // this.totalItems = this.listData.length;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  // getItemColor(recommendation: string): string {
  //   if (recommendation === 'Drizzles') {
  //     return 'green';
  //   } else if (recommendation === 'Slow Rain') {
  //     return 'green';
  //   } else if (recommendation === 'High Rain') {
  //     return 'yellow';
  //   } 
  //   else if (recommendation === 'Thunderstorm') {
  //     return 'red';
  //   } 
  //   else {
  //     return 'green'; // Default color if none of the conditions match
  //   }
  // }

  // history(row: Devices) {
  //   console.log('row',row)
  //   this.id = row.id;
  //   let tempDirection: Direction;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogRef = this.dialog.open(DeviceHistoryComponent, {
  //     data: {
  //       teachers: row,
  //       action: 'history',
  //     },
  //     direction: tempDirection,
  //   });
  // }

  // context menu
  // onContextMenu(event: MouseEvent, item: Devices) {
  //   event.preventDefault();
  //   this.contextMenuPosition.x = event.clientX + 'px';
  //   this.contextMenuPosition.y = event.clientY + 'px';
  //   if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
  //     this.contextMenu.menuData = { item: item };
  //     this.contextMenu.menu.focusFirstItem('mouse');
  //     this.contextMenu.openMenu();
  //   }
  // }

}

