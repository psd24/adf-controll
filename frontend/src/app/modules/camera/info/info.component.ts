import { Component, OnInit } from '@angular/core';
import {formatDate, DatePipe} from '@angular/common';
import { CamerasService } from '../../../services/cameras.service';
import { ActivatedRoute } from '@angular/router';
import { CameraModel } from '../../../models/camera.model';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  cameraId: string;
  camera: CameraModel;
  weather;
  lat;
  lon;
  temp_days_max = [];
  temp_days_min = [];
  temp_days_dt = [];
  temp_hourly_dt = [];
  temp_hourly_temp = [];
  temp_hourly_wind_speed = [];
  temp_hourly_humidity = [];
  pipe = new DatePipe('en-US'); // Use your own locale

  public lineChartDataDaily: ChartDataSets[] = [];
  public lineChartDataHourly: ChartDataSets[] = [];
  public lineChartLabelsDaily: Label[] = [];
  public lineChartLabelsHourly: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  public lineChartColorsDaily: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0)',
    },
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(255,0,0,0)',
    },
  ];
  public lineChartColorsHourly: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0)',
    },
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(255,0,0,0)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(255,0,0,0)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(
    private camerasService: CamerasService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.updateWeather();
  }

  updateWeather() {
    this.cameraId = this.route.snapshot.paramMap.get('id');
    this.camerasService.view(this.cameraId).subscribe(
      (camera:CameraModel) => {
        this.camera = camera;
        this.lat = this.camera.lat;
        this.lon = this.camera.lon;
        this.camerasService.weather(this.lat, this.lon).subscribe(
          weather =>{
            this.weather = weather;
            console.log(this.weather)
            // Daily
            this.weather.daily.forEach(element => {
              this.temp_days_max.push(element.temp.max)
              this.temp_days_min.push(element.temp.min)
            });
            this.weather.daily.forEach(element => {
              this.temp_days_dt.push(this.pipe.transform(element.dt * 1000, 'dd-MM-yyyy'))
            });
            this.lineChartLabelsDaily = this.temp_days_dt
            this.lineChartDataDaily = [
              {
                data: this.temp_days_max,
                label: 'Temperatura max'
              },
              {
                data: this.temp_days_min,
                label: 'Temperatura min'
              },
            ]
            // Fin Daily
            //Hourly
            this.weather.hourly.forEach(element => {
              this.temp_hourly_temp.push(element.temp)
              this.temp_hourly_wind_speed.push(element.wind_speed)
              this.temp_hourly_humidity.push(element.humidity)
            });
            this.weather.hourly.forEach(element => {
              this.temp_hourly_dt.push(this.pipe.transform(element.dt * 1000, 'HH:mm'))
            });
            this.lineChartLabelsHourly = this.temp_hourly_dt
            this.lineChartDataHourly = [
              {
                data: this.temp_hourly_temp,
                label: 'Temperatura'
              },
              {
                data: this.temp_hourly_wind_speed,
                label: 'Velocitat vent'
              },
              {
                data: this.temp_hourly_humidity,
                label: 'Humitat'
              },
            ]
            // Fin Hourly
          },
          error => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
