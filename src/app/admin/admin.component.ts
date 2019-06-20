import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  heroes = [{
    id : 1,
    firstName: 'George',
    lastName: 'Okello',
    email: 'okellogeorge40@yahoo.com'
  },
  {
    id : 2,
    firstName: 'Arthur',
    lastName: 'Okello',
    email: 'aokello12@gmail.com'
  },
  {
    id : 3,
    firstName: 'Nigel',
    lastName: 'Okello',
    email: 'okellogeorge40@yahoo.com'
  }]

  constructor() { }

  ngOnInit() {
    console.log(this.heroes);
  }

}
