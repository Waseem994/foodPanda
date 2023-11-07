import { formatDate } from '@angular/common';
export class Devices {
  id: number;
  locationName: string;
  name: string;
  deviceId: string;
  gpsLocation: string;
  city: string;
  deviceMacAddress: string;
  pinPoint: string;
  // weatherStatus: string;
  recommendation: string;
  district: string;
  status: string;
  latitude: string;
  longitude: string;
  setMm: string;
  setTime: string;
//Divice Calibration
  rainMm0: string;
  weatherStatus0: string;
  hourCount0: string;
  serviceStatus0: string;
  device_id0: string;

  rainMm1: string;
  weatherStatus1: string;
  hourCount1: string;
  serviceStatus1: string;
  device_id1: string;

  rainMm2: string;
  weatherStatus2: string;
  hourCount2: string;
  serviceStatus2: string;
  device_id2: string;

  rainMm3: string;
  weatherStatus3: string;
  hourCount3: string;
  serviceStatus3: string;
  device_id3: string;
  time_interval: string[];

  constructor(devices: Devices) {
    {
      this.id = devices.id || this.getRandomID();
      this.name = devices.name || '';
      this.deviceId = devices.deviceId || '';
      this.locationName = devices.locationName || '';
      this.gpsLocation = devices.gpsLocation || '';
      this.setMm = devices.setMm || '';
      this.city = devices.city || '';
      this.district = devices.district || '';
      this.deviceMacAddress = devices.deviceMacAddress || '';
      this.pinPoint = devices.pinPoint || '';
      this.recommendation = devices.recommendation || '';
      // this.weatherStatus = devices.weatherStatus || '';
      this.status = devices.status || '';
      this.latitude = devices.latitude || '';
      this.longitude = devices.longitude || '';
      this.setTime = devices.setTime || '';
      this.rainMm0 = devices.rainMm0 || '';
      this.weatherStatus0 = devices.weatherStatus0 || '';
      this.hourCount0 = devices.hourCount0 || '';
      this.serviceStatus0 = devices.serviceStatus0 || '';
      this.device_id0 = devices.device_id0 || '';

      this.rainMm1 = devices.rainMm1 || '';
      this.weatherStatus1 = devices.weatherStatus1 || '';
      this.hourCount1 = devices.hourCount1 || '';
      this.serviceStatus1 = devices.serviceStatus1 || '';
      this.device_id1 = devices.device_id1 || '';

      this.rainMm2 = devices.rainMm2 || '';
      this.weatherStatus2 = devices.weatherStatus2 || '';
      this.hourCount2 = devices.hourCount2 || '';
      this.serviceStatus2 = devices.serviceStatus2 || '';
      this.device_id2 = devices.device_id2 || '';

      this.rainMm3 = devices.rainMm3 || '';
      this.weatherStatus3 = devices.weatherStatus3 || '';
      this.hourCount3 = devices.hourCount3 || '';
      this.serviceStatus3 = devices.serviceStatus3 || '';
      this.device_id3 = devices.device_id3 || '';

      this.time_interval = devices.time_interval || [];
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}

