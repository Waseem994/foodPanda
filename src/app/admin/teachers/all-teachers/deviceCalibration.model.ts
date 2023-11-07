import { formatDate } from '@angular/common';

export class DeviceCalibration {
//Divice Calibration
id: number;
rainMm: string;
weatherStatus: string;
hourCount: string;
serviceStatus: string;
device_id: string;

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

rainMm4: string;
weatherStatus4: string;
hourCount4: string;
serviceStatus4: string;
device_id4: string;

constructor(devices: DeviceCalibration) {
    {
      this.id = devices.id || this.getRandomID();

      this.rainMm = devices.rainMm || '';
      this.weatherStatus = devices.weatherStatus || '';
      this.hourCount = devices.hourCount || '';
      this.serviceStatus = devices.serviceStatus || '';
      this.device_id = devices.device_id || '';

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

      this.rainMm4 = devices.rainMm4 || '';
      this.weatherStatus4 = devices.weatherStatus4 || '';
      this.hourCount4 = devices.hourCount4 || '';
      this.serviceStatus4 = devices.serviceStatus4 || '';
      this.device_id4 = devices.device_id4 || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}