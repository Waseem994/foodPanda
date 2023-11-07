import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, ViewChild, OnInit, NgZone, ElementRef, AfterViewInit } from '@angular/core';
import { DevicesService } from '../../device.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { Devices } from '../../device.model';
import * as moment from 'moment';
import { format, addMonths, addDays, subMonths, subDays } from 'date-fns';
import { AgmPolygon } from '@agm/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexFill,
  ApexResponsive,
  ApexTheme,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Chart, ChartDataset, ChartOptions} from 'chart.js';
import { GraphResponse } from './interfaces';


export type chartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  legend: ApexLegend;
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
  colors: string[];
  responsive: ApexResponsive[];
  labels: string[];
  theme: ApexTheme;
  series2: ApexNonAxisChartSeries;
};

export interface DialogData {
  id: number;
  action: string;
  teachers: Devices;
}

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})

export class ViewDialogComponent implements OnInit  {

  // @ViewChild('chart') chart!: ChartComponent;
  public areaChartOptions!: Partial<chartOptions>;
  public barChartOptions!: Partial<chartOptions>;
  public performanceRateChartOptions!: Partial<chartOptions>;
  public polarChartOptions!: Partial<chartOptions>;

  range: FormGroup;
  listData: any[] = [];
  deviceCalibrationData: any[] = [];
  formattedDateTime: any;
  deviveName: any;
  pullsAlue: any;
  pullsLastTime: any;
  finalPullsValue: any;
  // graphValue: any;
  graphValue: GraphResponse = { data: { time_interval: [], count_value: [] } };

  // Abdullah Work
  // Chart Work !
    public ChartOptions: any = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context:any) => {
              const label = context.parsed.y.toFixed(3); // Show decimal value
              return label;
            },
            title: () => {
              return null; // Hide label data in tooltip title
            }
          }
        }
      },
    }

    public barChartLabels: any = [];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData: any = []
    public chartPlugins: any[] = [{
      beforeInit: (chart:any) => {
        chart.options.plugins.tooltip.enabled = false;
      }
    }];
  // Chart Work !

  // map Work 
    map:any
    mapClickListener:any
    lat: any;
    lng: any;
    pinpoint: any
  //map work

  // End Work 
  

  constructor(public dialog: MatDialog, private datePipe: DatePipe,
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public deviceService: DevicesService,  private zone: NgZone) {

    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  }

  ngOnInit() {
    this.loadData();
    this.getCalibration();
    this.chart3();
    this.CurrentDateGraphData();
  }
  OneWeekDate(){
    const today = new Date();
    const OneWeekStart = today; 
    const OneWeekEnd = subDays(today, 6); 
    this.generateDataBySelectBox(OneWeekEnd,OneWeekStart)

    console.log('OneWeekStart', OneWeekStart )
    console.log('OneWeekEnd', OneWeekEnd)
  }

  TwoWeekDate(){
    const today = new Date();
    const TwoWeekStart = today; 
    const TwoWeekEnd = subDays(today, 13); 
    this.generateDataBySelectBox(TwoWeekEnd,TwoWeekStart)

    console.log('TwoWeekStart', TwoWeekStart )
    console.log('TwoWeekEnd', TwoWeekEnd)
  }

  OneMonthDate(){
    const today = new Date();
    const OneStart = today;
    const OneEndDate = subMonths(today, 1); 
    this.generateDataBySelectBox(OneEndDate,OneStart)

    console.log('OneStart', OneStart )
    console.log('OneEndDate', OneEndDate)
  }

  TwoMonthDate(){
    const today = new Date();
    const TwoStart = today;
    const TwoEndDate = subMonths(today, 2); 
    this.generateDataBySelectBox(TwoEndDate,TwoStart)
  }

  ThreeMonthDate(){
    const today = new Date();
    const threeStart = today;
    const threeEndDate = subMonths(today, 3); 
    this.generateDataBySelectBox(threeEndDate,threeStart)

    console.log('threeStart', threeStart )
    console.log('threeEndDate', threeEndDate)
  }

  SixMonthDate(){
    const today = new Date();
    const sixStart = today;
    const sixEndDate  = subMonths(today, 6); 
    this.generateDataBySelectBox(sixEndDate,sixStart)
    console.log('sixStart', sixStart )
    console.log('sixEndDate', sixEndDate)
  }

  NineMonthDate(){
    const today = new Date();
    const nineStart =  today;
    const nineEndDate  = subMonths(today, 9); 
    this.generateDataBySelectBox(nineEndDate,nineStart)
    console.log('NineStart', nineStart )
    console.log('NineEnd', nineEndDate)
  }

  OneYearDate(){
    const today = new Date();
    const yearStart =  today;
    const yearEndDate  = subMonths(today, 12); 
    this.generateDataBySelectBox(yearEndDate,yearStart)
    console.log('yearStart', yearStart )
    console.log('yearEndDate', yearEndDate)
  }

  generateDataBySelectBox(Start: any, end: any){
    this.barChartLabels = [];
    this.barChartData = [];
    
    const deviceId = this.data.teachers.deviceId;
    
     this.deviceService.getPullRequests(deviceId, Start, end)
      .subscribe(
        (response) => {

          console.log("graph Data:", response);
          const currentDate =new Date(Start);
          while (currentDate <= end) {
            const label = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
            this.barChartLabels.push(label);
            currentDate.setDate(currentDate.getDate() + 1);
          }

          if (Array.isArray(response)) {
            const valuesArray = response.map(obj => obj.plusValue);
            console.log("Values Array:", valuesArray);
            const nDate = new Date(Start);
            const oDate = new Date(end); 
            const dateRange = this.getDateRange(nDate, oDate);
            const dailySums = this.calculateDailySums(valuesArray, nDate, dateRange);
            this.barChartData = [{ data: dailySums, label: 'Rain Graph' }];
          }
        },
        (error) => {
          console.error(error);
        }
      )
  }

  intervalHours = 3;
  totalHours = 24;

  CurrentDateGraphData(){
//     const label = ['0-3', '3-6', '6-9', '9-12', '12-15', '15-18', '18-21', '21-24'];
//     this.barChartLabels = label;

//     const totalRainfall = 3270.5
//     const arr = [{
//     data: Array.from({ length: 24 / this.intervalHours }, () => totalRainfall / (24 / this.intervalHours)),
//     label: 'Rain Graph'
//   }]

//  this.barChartData = arr
         


    // const dataValue = 3.689;
    // const intervalHours = 3;
    // const totalHours = 24;
    // const rainfallPerHour = dataValue / totalHours;
    // const rainfallPerInterval = rainfallPerHour * intervalHours;

    // const labels = [];
    // const rainfallData = [];

    // for (let i = 0; i < totalHours; i += intervalHours) {
    //   const label = `${i}-${i + intervalHours} hours`;
    //   labels.push(label);
    //   rainfallData.push(rainfallPerInterval);
    // }



    
    // this.barChartLabels = [];
    // this.barChartData = [];
    // const currentDate = new Date()
    // const day = currentDate.getDate().toString().padStart(2, '0');
    // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    // const year = currentDate.getFullYear().toString().slice(-2);
    // const formattedDate = `${month}/${day}/${year}`;
    // const endnDate = this.range.get('end')?.value;
    // const deviceId = this.data.teachers.deviceId;

    // this.deviceService.getPullRequests(deviceId, formattedDate, endnDate)
    //   .subscribe(
    //     (response) => {
    //       console.log("graph Data:", response);

    //       if (Array.isArray(response)) {
    //         const valuesArray = response.map(obj => obj.plusValue);
    //         console.log("Values Array:", valuesArray);
    //         const dataLength = valuesArray.length;
    //         console.log(dataLength)
    //         for (let i = 0; i < dataLength; i += 3) {
    //           const intervalData =  valuesArray.slice(i, i + 3);
    //           const sum = intervalData.reduce((a, b) => a + b, 0);
    //           console.log('devided value', sum )
    //           const label = `${i}-${i + 3}`;
    //           this.barChartLabels.push(label);
    //           const arr = [{
    //           label: 'Rain Graph',
    //           data: sum
    //         }]
    //         this.barChartData = arr
    //         }
    //       } else {
    //         console.error("Invalid response format. Expected an array.");
    //       }


    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
  }

  // Abdullah Map Work 
  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.zone.run(() => {
       this.lat = e.latLng.lat()
       this.lng = e.latLng.lng() 
      });
    });
  }
  // Abdullah Map Work 
  

  closeDialog(): void {
    this.dialog.closeAll();
  }

  public onDateSelection() {
     
    const startDate = this.range.get('start')?.value;

    console.log(startDate)
    const endDate = this.range.get('end')?.value;
    if (endDate) {
      this.generateDataByDay(startDate, endDate);
    } else {
      this.generateDataByHour(startDate);
    }

  }

  private generateDataByHour(startDate: Date) {
    this.barChartLabels = [];
    this.barChartData = [];

    const startnDate = this.range.get('start')?.value;
    const endnDate = this.range.get('end')?.value;
    const deviceId = this.data.teachers.deviceId;

    this.deviceService.getPullRequests(deviceId, startnDate, endnDate)
      .subscribe(
        (response) => {
          console.log("graph Data:", response);

          if (Array.isArray(response)) {
            const valuesArray = response.map(obj => obj.plusValue);
            console.log("Values Array:", valuesArray);
            const dataLength = valuesArray.length;
            for (let i = 0; i < dataLength; i += 3) {
              const intervalData =  valuesArray.slice(i, i + 3);
              const sum = intervalData.reduce((a, b) => a + b, 0);
              console.log('devided value', sum )
              const label = `${i}-${i + 3}`;
              this.barChartLabels.push(label);
              const arr = [{
              label: 'Rain Graph',
              data: sum
            }]
            this.barChartData = arr
            }
          } else {
            console.error("Invalid response format. Expected an array.");
          }
        },
        (error) => {
          console.error(error);
        }
      );

  }

  private generateDataByDay(startDate: Date, endDate: Date) {
    this.barChartLabels = [];
    this.barChartData = [];
    
    const startnDate = this.range.get('start')?.value;
    const endnDate = this.range.get('end')?.value;
    const deviceId = this.data.teachers.deviceId;
    
     this.deviceService.getPullRequests(deviceId, startnDate, endnDate)
      .subscribe(
        (response) => {

          console.log("graph Data:", response);

          const currentDate = new Date(startDate);
          while (currentDate <= endDate) {
            const label = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
            this.barChartLabels.push(label);
            currentDate.setDate(currentDate.getDate() + 1);
          }


          if (Array.isArray(response)) {
            const valuesArray = response.map(obj => obj.plusValue);
            console.log("Values Array:", valuesArray);
            const nDate = new Date(startDate);
            const oDate = new Date(endDate); 
            const dateRange = this.getDateRange(nDate, oDate);
            const dailySums = this.calculateDailySums(valuesArray, nDate, dateRange);
            this.barChartData = [{ data: dailySums, label: 'Rain Graph' }];
          }
        },
        (error) => {
          console.error(error);
        }
      )
   
  }

  private calculateDailySums(rainData: number[], startDate: Date, dateRange: Date[]): number[] {
    const dailySums: number[] = [];
    
    for (const date of dateRange) {
      const sum = rainData.reduce((acc, value, index) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + index);

        if (currentDate.toDateString() === date.toDateString()) {
          return acc + value;
        }
        return acc;
      }, 0);

      dailySums.push(sum);
    }

    return dailySums;
  }


  private getDateRange(startDate: Date, endDate: Date): Date[] {
    const dateRange: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateRange;
  }


  formatHour(date: Date): string {
    let hour = date.getHours();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour} ${ampm}`;
  }


  // handleButtonClick() {
  //   const deviceId = this.data.teachers.deviceId;
  //   console.log("Device Id Address:", deviceId);
  //   console.log("Device Data:", this.data.teachers);
  //   const startDate = this.range.get('start')?.value;
  //   const endDate = this.range.get('end')?.value;
   
  //   let sdate = new Date(startDate);
  //   let eDate = new Date(endDate);
    
  //   let days = Math.floor((eDate.getTime() - sdate.getTime()) / 1000 / 60 / 60 / 24);
  //   console.log(days)

  //   const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
  //   const formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');

  //   const diffInDays = moment(formattedStartDate).diff(formattedEndDate, 'days');
  //   console.log(diffInDays)
  //   if (days < 7) {
  //     this.generateDataByHour(startDate);
  //   } else {
  //     this.generateDataByDay(startDate, endDate);
  //   }

  
  //   // this.deviceService.getPullRequests(deviceId, startDate, endDate)
  //   //   .subscribe(
  //   //     (response) => {
         
  //   //       console.log("graph Data:", response);

  //   //       if (Array.isArray(response)) {
  //   //         const leabelArray = response.map(obj => obj.created_at);
  //   //         console.log("label Array:", leabelArray);
  //   //         this.barChartLabels = leabelArray
           
  //   //       } else {
  //   //         console.error("Invalid response format. Expected an array.");
  //   //       }

  //   //       if (Array.isArray(response)) {
  //   //         const valuesArray = response.map(obj => obj.plusValue);
  //   //         console.log("Values Array:", valuesArray);
  //   //         let arr = [{
  //   //           label: 'Rain Giraph',
  //   //           data: valuesArray
  //   //         }]
  //   //         this.chart3(valuesArray); 
  //   //         this.barChartData = arr
  //   //       } else {
  //   //         console.error("Invalid response format. Expected an array.");
  //   //       }
  //   //     },
  //   //     (error) => {
  //   //       console.error(error);
  //   //     }
  //   //   );
  // }

  loadData() {
    const deviceId = this.data.teachers.deviceId;
    this.deviceService.getPullsView(deviceId).subscribe(
      (response) => {
        this.pullsAlue = response
        this.finalPullsValue = this.pullsAlue.plusValue;
        this.pullsLastTime = response;
        var currentRainMm;
        this.deviceService.getGraphData(deviceId).subscribe((response:any) => {
          // const timeIntervals = response;
         currentRainMm = response.data.count_value ;
           
          // console.log("graph", currentRainMm);

          //const label = ['0-3', '3-6', '6-9', '9-12', '12-15', '15-18', '18-21', '21-24'];
          const label = [
            '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12',
            '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21',
            '21-22', '22-23', '23-24'
          ];          
          this.barChartLabels = label;
      // console.log("currentRainMm", currentRainMm)
          const totalRainfall = this.finalPullsValue
          // console.log("totalRainfall", Array.from(currentRainMm))
          const splitValues = currentRainMm.map((interval: string) => interval);
          console.log("graph value ",splitValues);
// var splitValues =[  '2.5959',  '5.5959',  '8.5959',  '11.5959',  '14.5959',  '17.5959',  '20.5959',  '23.5959'];
          const arr = [{
          data: Array.from(splitValues),
          // data : currentRainMm,
          label: 'Rain Graph'
        }]
      
       this.barChartData = arr
  
          this.formattedDateTime = this.pullsLastTime.createdAt;
        });
     
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
 
  getCalibration() {
    const deviceId = this.data.teachers.id;
    console.log("Device Mac Address:", deviceId);
    const name = this.data.teachers.name
    console.log("Name :", name);
    this.deviveName = this.data.teachers.name;
    // const deviceId = 25;
    console.log("All Obj ", this.data.teachers);
    this.lat = Number(this.data.teachers.latitude)
    this.lng = Number(this.data.teachers.longitude)
    this.pinpoint = this.data.teachers.pinPoint
  
    this.deviceService.deviceCalibrationView(deviceId).subscribe(
      (response) => {
        console.log('Response Calibration:', response);
        // this.listData = response;
        this.deviceCalibrationData = response;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  display?: google.maps.LatLngLiteral;
  center: google.maps.LatLngLiteral = {
    lat: 24.860966,
    lng: 66.990501,
  };
  zoom = 4;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }

  private chart3() {
    const deviceId = this.data.teachers.deviceId;
     console.log("deviceId ",deviceId);
   var currentRainMm;
   var currentDate;
   this.deviceService.getGraphData(deviceId).subscribe((response:any) => {
     // const timeIntervals = response;
    currentRainMm = response.data.count_value ;
    currentDate = response.data.date;
     console.log("graph value waves ", currentRainMm);
     console.log("graph value date ", currentDate);
     
     this.performanceRateChartOptions = {
      series: [
        {
          name: 'Rain mm',
          data: currentRainMm,
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.9,
        },
        foreColor: '#9aa0ac',
        toolbar: {
          show: false,
        },
      },
      colors: ['#51E298'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 1,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      xaxis: {
        // categories: currentDate,
        title: {
          text: 'Today',
        },
      },
      yaxis: {
        title: {
          text: 'Rain Graph',
        },
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
   });
  }
  isDropdownOpen = false;
  onChangeTimePeriod(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    console.log("Valueeeeee ", value);
  
    this.deviceService.getGraphDataByHour(this.data.teachers.deviceId, parseInt(value, 10)).subscribe(
      (response: any) => {
        const count_value = response.count_value;
        console.log("graph value waves test ", count_value);

        this.performanceRateChartOptions = {
          series: [
            {
              name: 'Rain mm',
              data: count_value,
            },
          ],
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.9,
            },
            foreColor: '#9aa0ac',
            toolbar: {
              show: false,
            },
          },
          colors: ['#51E298'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth',
          },
          markers: {
            size: 1,
          },
          grid: {
            show: true,
            borderColor: '#9aa0ac',
            strokeDashArray: 1,
          },
          xaxis: {
            // categories: currentDate,
            title: {
              text: 'Today',
            },
          },
          yaxis: {
            title: {
              text: 'Rain Graph',
            },
          },
          tooltip: {
            theme: 'dark',
            marker: {
              show: true,
            },
            x: {
              show: true,
            },
          },
        };
      }
    );
  }
  
  
}
