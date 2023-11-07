import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../../dashboard/main/main.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit{

  marker: marker[] = []
  map:any
  mapClickListener:any
  latitude: number = 31.5204
  longitude: number =  74.3587

  heatmapData = [
    { lat: 37.775, lng: -122.434, weight: 1 },
    { lat: 37.775, lng: -122.435, weight: 2 },
    { lat: 37.776, lng: -122.436, weight: 3 },
  ];
  constructor(private zone: NgZone, private myService: MainService){}
 
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.myService.getDashboard().subscribe(
      (response) => {
        console.log('Response Data:', response);
        this.marker = []
        response.forEach((element : any)=>{
          this.marker.push({latitude: Number(element.latitude), longitude:Number(element.longitude), pinPoint: element.pinPoint})
        })
        console.log('marker Data',this.marker)
      }
    );
  }

  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.zone.run(() => {
        this.marker.push({
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng() 
      });
      });
    });
  }

}

interface marker {
	latitude: any;
	longitude: any;
	pinPoint?: any;
}