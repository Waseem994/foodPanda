import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DevicesService } from '../../device.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Devices } from '../../device.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { DeviceCalibration } from '../../deviceCalibration.model';

export interface DialogData  {
  id: number;
  action: string;
  teachers: Devices;
  calibration: DeviceCalibration;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  proForm: FormGroup;
  devices: Devices;
  dateControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public devicesService: DevicesService,
    private formBuilder: FormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.teachers.name;
      this.devices = data.teachers;
      console.log("Hello edit data ",this.devices = data.teachers);
      const teacherId = data.teachers.id;
      console.log("Teacher ID: ", teacherId);
    } else {
      this.dialogTitle = 'New Device';
      this.devices = {} as Devices;
    }
    this.proForm = this.createContactForm();
  }

  openDatePicker(picker: MatDatepicker<any>) {
    picker.open();
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  createContactForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.devices.id],
      locationName: [this.devices.locationName],
      name: [this.devices.name],
      deviceId: [this.devices.deviceId],
      deviceMacAddress: [this.devices.deviceMacAddress],
      city: [this.devices.city],
      pinPoint: [this.devices.pinPoint],
      latitude: [this.devices.latitude],
      longitude: [this.devices.longitude],
      status: [this.devices.status],
      // setMm: [this.devices.setMm],
      // weatherStatus: [this.devices.weatherStatus],
      // recommendation: [this.devices.recommendation],
      // setTime: [this.devices.setTime],
      // date: [this.devices.date ? new Date(this.devices.date) : null], // Uncomment this line if the 'date' property is available in Devices model
      //Divice Calibration 
      rainMm0: [this.devices.rainMm0],
      weatherStatus0: [this.devices.weatherStatus0],
      hourCount0: [this.devices.hourCount0],
      serviceStatus0: [this.devices.serviceStatus0],
      device_id0: [this.devices.device_id0],

      rainMm1: [this.devices.rainMm1],
      weatherStatus1: [this.devices.weatherStatus1],
      hourCount1: [this.devices.hourCount1],
      serviceStatus1: [this.devices.serviceStatus1],
      device_id1: [this.devices.device_id1],

      rainMm2: [this.devices.rainMm2],
      weatherStatus2: [this.devices.weatherStatus2],
      hourCount2: [this.devices.hourCount2],
      serviceStatus2: [this.devices.serviceStatus2],
      device_id2: [this.devices.device_id2],

      rainMm3: [this.devices.rainMm3],
      weatherStatus3: [this.devices.weatherStatus3],
      hourCount3: [this.devices.hourCount3],
      serviceStatus3: [this.devices.serviceStatus3],
      device_id3: [this.devices.device_id3]
    });
  }

  submit() {
    // Empty method
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const deviceData = this.proForm.getRawValue();
    console.log("Data Form ",deviceData);
    if (this.action === 'edit') {
      this.devicesService.updateDevices(deviceData);
    } else {
      this.devicesService.addDevices(deviceData);
    }
  }
}
