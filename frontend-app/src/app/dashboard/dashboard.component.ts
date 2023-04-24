import { PlatformModule } from '@angular/cdk/platform';
import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../services/dashboard-service/dashboard-service.service';
import { browserList, countryList } from './dashboard.utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  username: String = '';

  logins: any[] = [
    {date: this.getFormattedDate(new Date()), time: this.getFormattedTime(new Date())},
  ];


  constructor(private router: Router, private route: ActivatedRoute, private dashboardService: DashboardService) {
    this.route.queryParams.subscribe(params => this.username = params['username']);
    console.log("paramsData username ==> ", this.username);
  }

  ngOnInit(): void {
  }

  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getRandomDate() {
    const minDate = new Date(2020, 1, 1).getTime();
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * (maxDate - minDate + 1) + minDate);
    return new Date(timestamp);
  }

  getFormattedDate(date: Date) {
    return date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
  }

  getFormattedTime(date: Date) {
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  onLogout() {
    let payload = {
      username: this.username,
      loginDate: this.getRandomDate(),
      sessionTimeInSec: this.randomIntFromInterval(0, 18000),
      loginCountry: countryList[this.randomIntFromInterval(0, countryList.length - 1)],
      loginBrowser: browserList[this.randomIntFromInterval(0, browserList.length - 1)]
    };
    this.dashboardService.logout(payload).subscribe((response: any) => {
      console.log(response);
      if(response.status === 200) {
        console.log("Logout successful");
        this.router.navigate(['/login']);
      }
      else {
        console.log("Logout failed");
      }
    }, (error) => {
      console.log(error);
      console.log("Logout failed");
    });

  }

}
