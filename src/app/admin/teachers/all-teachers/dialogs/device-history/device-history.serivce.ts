import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceHistoryService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getPullRequests(deviceId: string, fromDate: string, toDate: string) {
    console.log("deviceId: ", deviceId);
    console.log("fromDate: ", fromDate);
    console.log("toDate: ", toDate);
    console.log("URL: ", `${this.apiServerUrl}/api/graph/dateselection/${deviceId}?startTime=${fromDate}&endTime=${toDate}`);
    const url = `${this.apiServerUrl}/api/graph/dateselection?deviceId=${deviceId}&fromDate=${fromDate}&toDate=${toDate}`;
    return this.http.get(url);
  }
 
}
