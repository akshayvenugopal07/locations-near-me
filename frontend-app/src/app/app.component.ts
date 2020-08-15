import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  lat = '';
  lng = '';
  range = '';
  path = './assets/green.png';
  allLocations = [];
  nearMe = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllLocations();
  }

  getAllLocations() {
    this.dataService.getAllLocations().subscribe(
      res => {
        this.allLocations = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getDataNearby() {
    const path = '?lat=' + this.lat + '&lng=' + this.lng + '&range=' + this.range;
    this.dataService.findNearbyLocations(path).subscribe(
      res => {
        this.nearMe = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
