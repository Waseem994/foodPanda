import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { Devices } from './device.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Time } from '@angular/common';
@Injectable()
export class DevicesService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/Devices.json';
  // private readonly API_URL = 'assets/data/devices.json';
  private apiServerUrl = environment.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<Devices[]> = new BehaviorSubject<Devices[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Devices;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Devices[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDevices(): void {
    this.subs.sink = this.httpClient.get<Devices[]>(`${this.apiServerUrl}/api/device/getAllDevices`).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }

  // getAllDevices(): void {
  //   this.subs.sink = this.httpClient.get<Devices[]>(this.API_URL).subscribe({
  //     next: (data) => {
  //       this.isTblLoading = false;
  //       this.dataChange.next(data);
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.isTblLoading = false;
  //       console.log(error.name + ' ' + error.message);
  //     },
  //   });
  // }

  viewDevices(devices: Devices): void {
    this.dialogData = devices;
    
    // this.httpClient.post(this.API_URL, Devices)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = Devices;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  public addEmployee(employee: Devices): Observable<Devices> {
    return this.httpClient.post<Devices>(`${this.apiServerUrl}/api/device`, employee);
  }
  addDevices(devices: Devices): void {
    this.dialogData = devices;
    // console.log("Data ",Devices);
    console.log("Data ",devices); // Log the devices object before making the request
    // console.log("URL: ", `${this.apiServerUrl}/api/device/${devices.id}`);
    console.log("Data ");
    this.httpClient.post(`${this.apiServerUrl}/api/device/saveRainGuage` ,devices)
      .subscribe({
        next: (data) => {
          this.dialogData = devices;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }
  // updateDevices(devices: Devices): void {
  //   this.dialogData = devices;
  //   console.log("Data ",devices);
  //   this.httpClient.put(`${this.apiServerUrl}/api/device/` + devices.id, devices)
  //       .subscribe({
  //         next: (data) => {
  //           this.dialogData = devices;
  //         },
  //         error: (error: HttpErrorResponse) => {
  //            // error code here
  //         },
  //       });
  // }
  
  updateDevices(devices: Devices): void {
    this.dialogData = devices;
    console.log("Data ",devices.id); // Log the devices object before making the request
    console.log("URL: ", `${this.apiServerUrl}/api/device/editDevices/${devices.id}`);
    console.log("Data ");
    console.log("Object ",devices);
  
    this.httpClient.put(`${this.apiServerUrl}/api/device/editDevices/${devices.id}`, devices)
      .subscribe(
        (data) => {
          this.dialogData = devices;
          console.log("Device updated successfully.", data); // Log the response data
        },
        (error: HttpErrorResponse) => {
          console.error("Error updating device:", error);
          // Handle the error here
        }
      );
  }
  
  deleteDevices(id: number): void {
    console.log(id);
    console.log("Delete Urls ",`${this.apiServerUrl}/api/device/deleteDevice/${id}`);

    this.httpClient.delete(`${this.apiServerUrl}/api/device/deleteDevice/${id}`)
        .subscribe({
          next: (data) => {
            console.log(id);
          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }

  getPulls(deviceMacAddress: string, startDate: string, endDate: string): void {
    console.log("Device Mac Address: ", deviceMacAddress);
    console.log("Start Date: ", startDate);
    console.log("End Date: ", endDate);
    console.log("URL: ", `${this.apiServerUrl}/api/pulls/pullsDateWise/${deviceMacAddress}?startDate=${startDate}&endDate=${endDate}`);
  
    // this.httpClient.get(`${this.apiServerUrl}/api/pulls/pullsDateWise/${deviceMacAddress}?startDate=${startDate}&endDate=${endDate}`)
    //   .subscribe({
    //     next: (data) => {
    //       console.log("Data: ", data);
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       // handle error here
    //     },
    //   });
  }

  getPullRequests(deviceMacAddress: string, startTime: string, endTime: string) {
    console.log("Device Mac Address: ", deviceMacAddress);
    console.log("Start Date Time: ", startTime);
    console.log("End Date Time: ", endTime);
    console.log("URL: ", `${this.apiServerUrl}/api/pulls/pullsDateWise/${deviceMacAddress}?startTime=${startTime}&endTime=${endTime}`);
    const url = `${this.apiServerUrl}/api/pulls/pullsDateWise/${deviceMacAddress}?startTime=${startTime}&endTime=${endTime}`;
    return this.httpClient.get(url);
  }

  public getDashboard(): Observable<Devices[]> {
    return this.httpClient.get<Devices[]>(`${this.apiServerUrl}/api/dev/getdata`);
  }
  // deviceCalibrationView(id: number): void {
  //   console.log(id);
  //   console.log("Delete Urls ",`${this.apiServerUrl}/api/device/deleteDevice/${id}`);
  //   return this.httpClient.get<Devices[]>(`${this.apiServerUrl}/api/device/deleteDevice/${id}`);
    
  // }

  public deviceCalibrationView(id: number): Observable<Devices[]> {
    console.log(id);
    console.log("Get Urls ",`${this.apiServerUrl}/api/device/deviceCalibrationView/${id}`);
    return this.httpClient.get<Devices[]>(`${this.apiServerUrl}/api/device/deviceCalibrationView/${id}`);
  }

  public getPullsView(deviceId: string): Observable<Devices[]> {
    // console.log(deviceId);
    // console.log("URL: ", `${this.apiServerUrl}/api/device/pullsView/${deviceId}`);
    return this.httpClient.get<Devices[]>(`${this.apiServerUrl}/api/device/pullsView/${deviceId}`);
  }


  public getDevices(){
    return this.httpClient.get<Devices[]>(`${this.apiServerUrl}/api/device/getAllDevices`);
  }

  public getGraphData(deviceId: string): Observable<Devices[]> {
    // console.log(deviceId);
    // console.log("URL: ", `${this.apiServerUrl}/api/device/pullsView/${deviceId}`);
    return this.httpClient.get<Devices[]>(`${this.apiServerUrl}/api/graph/graphThreeHours/${deviceId}`);
  }

  public getGraphDataByHour(deviceId: string,selectedHourRange: number): Observable<Devices[]> {
    // console.log(deviceId);
    // console.log("URL: ", `${this.apiServerUrl}/api/device/pullsView/${deviceId}`);
    return this.httpClient.get<Devices[]>(`${this.apiServerUrl}/api/device/graphRangeHours/${deviceId}/${selectedHourRange}`);
  }
 
  public getGraphDataDropDown(selectDropDown: string,deviceId: string): Observable<Devices[]> {
    // console.log(deviceId);
    console.log("API URL: ", `${this.apiServerUrl}/api/device/getGraphDataHandler/${selectDropDown}/${deviceId}`);
    return this.httpClient.get<Devices[]>(`${this.apiServerUrl}/api/device/getGraphDataHandler/${selectDropDown}/${deviceId}`);
  }
}
