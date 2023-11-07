import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Devices } from '../../device.model';
import { DevicesService } from '../../device.service';
import{DeviceHistoryService} from './device-history.serivce';
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
  selector: 'app-device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.scss']
})
export class DeviceHistoryComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public areaChartOptions!: Partial<chartOptions>;
  public barChartOptions!: Partial<chartOptions>;
  public performanceRateChartOptions!: Partial<chartOptions>;
  public polarChartOptions!: Partial<chartOptions>;
  constructor(
    public dialogRef: MatDialogRef<DeviceHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public deviceService: DevicesService,
    public deviceHistoryService: DeviceHistoryService
  ) {}
  deviceName: any;
  pinPoint: any;
  city:any;
  currentRainMm: any;
  ngOnInit() {
    // this.chart2();
    this.loadData();
    this.preLoadDataGraph();
    this.chart3();
  }
  preLoadDataGraph() {
    const deviceId = this.data.teachers.deviceId;
    this.deviceService.getGraphData(deviceId).subscribe((response:any) => {
      console.log("Default Graph Response ",this.currentRainMm = response.data.count_value);
      // console.log("MyGraph Value ",myGraph);
      this.barChartOptions = {
        series: [
          {
            name: 'mm',
            data: this.currentRainMm = response.data.count_value,
          },
        ],
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false,
          },
          foreColor: '#9aa0ac',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#9aa0ac'],
          },
        },
        grid: {
          show: true,
          borderColor: '#9aa0ac',
          strokeDashArray: 1,
        },
        xaxis: {
          categories: this.currentRainMm = response.data.date,
          position: 'bottom',
          labels: {
            offsetY: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
            offsetY: -35,
          },
        },
        fill: {
          type: 'gradient',
          colors: ['#4F86F8', '#4F86F8'],
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
           
          },
        },
      };
    });
  }

  onChangeTimePeriod(value:any){
    console.log("Valueeeeee ",value);
    if(value == 'one_week'){
      // this.OneWeekDate()
     const deviceId = this.data.teachers.deviceId;
     console.log("deviceId ",deviceId);
    //  var currentRainMm;
     this.deviceService.getGraphDataDropDown(value,deviceId).subscribe((response:any) => {
      console.log("Graph Response ",this.currentRainMm = response.data.count_value);
      // console.log("MyGraph Value ",myGraph);
      this.barChartOptions = {
        series: [
          {
            name: 'mm',
            data: this.currentRainMm = response.data.count_value,
          },
        ],
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false,
          },
          foreColor: '#9aa0ac',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#9aa0ac'],
          },
        },
        grid: {
          show: true,
          borderColor: '#9aa0ac',
          strokeDashArray: 1,
        },
        xaxis: {
          categories: this.currentRainMm = response.data.date,
          position: 'bottom',
          labels: {
            offsetY: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
            offsetY: -35,
          },
        },
        fill: {
          type: 'gradient',
          colors: ['#4F86F8', '#4F86F8'],
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
           
          },
        },
      };
    });

    }else if(value == 'six_month'){
      // this.TwoWeekDate()
      const deviceId = this.data.teachers.deviceId;
      console.log("deviceId ",deviceId);
      const myGraph = this.deviceService.getGraphDataDropDown(value,deviceId).subscribe((response:any) => {
       console.log("Graph Response ",response);
       this.barChartOptions = {
        series: [
          {
            name: 'mm',
            data: this.currentRainMm = response.data.count_value,
          },
        ],
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false,
          },
          foreColor: '#9aa0ac',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#9aa0ac'],
          },
        },
        grid: {
          show: true,
          borderColor: '#9aa0ac',
          strokeDashArray: 1,
        },
        xaxis: {
          categories: this.currentRainMm = response.data.date,
          position: 'bottom',
          labels: {
            offsetY: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
            offsetY: -35,
          },
        },
        fill: {
          type: 'gradient',
          colors: ['#4F86F8', '#4F86F8'],
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
           
          },
        },
      };
      });
      
    }else if(value == 'one_month'){
      // this.OneMonthDate()
      const deviceId = this.data.teachers.deviceId;
      console.log("deviceId ",deviceId);
      const myGraph = this.deviceService.getGraphDataDropDown(value,deviceId).subscribe((response:any) => {
       console.log("Graph Response ",response);
       this.barChartOptions = {
        series: [
          {
            name: 'mm',
            data: this.currentRainMm = response.data.count_value,
          },
        ],
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false,
          },
          foreColor: '#9aa0ac',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#9aa0ac'],
          },
        },
        grid: {
          show: true,
          borderColor: '#9aa0ac',
          strokeDashArray: 1,
        },
        xaxis: {
          categories: this.currentRainMm = response.data.date,
          position: 'bottom',
          labels: {
            offsetY: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
            offsetY: -35,
          },
        },
        fill: {
          type: 'gradient',
          colors: ['#4F86F8', '#4F86F8'],
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
           
          },
        },
      };
      });
    }
    
    else if(value == 'one_year'){
      // this.OneYearDate()
      const deviceId = this.data.teachers.deviceId;
      console.log("deviceId ",deviceId);
      const myGraph = this.deviceService.getGraphDataDropDown(value,deviceId).subscribe((response:any) => {
       console.log("Graph Response ",response);
       this.barChartOptions = {
        series: [
          {
            name: 'mm',
            data: this.currentRainMm = response.data.count_value,
          },
        ],
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false,
          },
          foreColor: '#9aa0ac',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#9aa0ac'],
          },
        },
        grid: {
          show: true,
          borderColor: '#9aa0ac',
          strokeDashArray: 1,
        },
        xaxis: {
          categories: this.currentRainMm = response.data.date,
          position: 'bottom',
          labels: {
            offsetY: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
            offsetY: -35,
          },
        },
        fill: {
          type: 'gradient',
          colors: ['#4F86F8', '#4F86F8'],
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
           
          },
        },
      };
      });
    }
  }

  private loadData() {
     this.deviceName = this.data.teachers.name;
     this.pinPoint = this.data.teachers.pinPoint;
     this.city = this.data.teachers.city;
    //  console.log("deviceId ",deviceName)
  }

 // Graph
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

onChangeTimePeriodLine(event: Event) {
  const selectedHourRange = (event.target as HTMLSelectElement).value;
  console.log("Valueeeeee ", selectedHourRange);

  this.deviceService.getGraphDataByHour(this.data.teachers.deviceId, parseInt(selectedHourRange, 10)).subscribe(
    (response: any) => {
      const count_value: number[] = response.count_value;
      const time_interval: string[] = response.time_interval;

      // Create an array of labels with "0.5" for each data point in count_value array
      const dataLabels: string[] = count_value.map(value => value === 0 ? '0' : '0.5');

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
            opacity: 0.2,
          },
          foreColor: '#9aa0ac',
          toolbar: {
            show: false,
          },
        },
        colors: ['#51E298'],
        dataLabels: {
          enabled: true,
          offsetY: -10,
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#03abff'],
          },
          background: {
            enabled: true,
            borderRadius: 4,
            padding: 4,
            opacity: 0.8,
            borderWidth: 1,
            borderColor: '#fff',
            dropShadow: {
              enabled: true,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.6,
            },
          },
          textAnchor: 'middle',
          formatter: (value: any, { dataPointIndex, w }: { dataPointIndex: number, w: any }) => {
            return dataLabels[dataPointIndex]; // Use the pre-defined dataLabels for each data point
          },
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
          categories: time_interval,
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

search(fromTime: string, toTime: string) {
  const deviceId = this.data.teachers.deviceId;
  
  const startDate = new Date(fromTime);
  const endDate = new Date(toTime);
  
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];
  
  this.deviceHistoryService.getPullRequests(deviceId, formattedStartDate, formattedEndDate).subscribe((response:any) => {
        // Handle the response from the API
        console.log("Response total_plusValue:", response.data.total_plusValue);
        console.log("Response date:", response.data.date);

        this.barChartOptions = {
          series: [
            {
              name: 'mm',
              data: this.currentRainMm = response.data.total_plusValue,
            },
          ],
          chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false,
            },
            foreColor: '#9aa0ac',
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            },
          },
          dataLabels: {
            enabled: true,
            
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ['#9aa0ac'],
            },
          },
          grid: {
            show: true,
            borderColor: '#9aa0ac',
            strokeDashArray: 1,
          },
          xaxis: {
            categories: this.currentRainMm = response.data.date,
            position: 'bottom',
            labels: {
              offsetY: 0,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: true,
              offsetY: -35,
            },
          },
          fill: {
            type: 'gradient',
            colors: ['#4F86F8', '#4F86F8'],
            gradient: {
              shade: 'light',
              type: 'horizontal',
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100],
            },
          },
          yaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
             
            },
          },
        };

  
      },
      (error) => {
        // Handle errors
        console.error(error);
      }
    );
}

closeDialog(): void {
  this.dialogRef.close();
}


}
