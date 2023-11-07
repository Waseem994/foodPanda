import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainModale } from './main.modale';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<MainModale[]> {
    return this.http.get<MainModale[]>(`${this.apiServerUrl}/api/device/getAllDevices`);
  }
 
  public getDashboard(): Observable<MainModale[]> {
    return this.http.get<MainModale[]>(`${this.apiServerUrl}/api/device/dashboard`);
  }

  public getAllCount(): Observable<MainModale[]> {
    return this.http.get<MainModale[]>(`${this.apiServerUrl}/api/device/getTotalCounts`);
  }
// public getAll(): Observable<MainModale[]> {
//     return this.http.get<MainModale[]>(`${this.apiServerUrl}/api/rainguage/devices/getada`);
//   }
}
