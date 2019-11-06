import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenReference } from '@angular/compiler';

@Component({
  selector: 'app-homing',
  templateUrl: './homing.page.html',
  styleUrls: ['./homing.page.scss'],
})
export class HomingPage implements OnInit {

  searchQuery: any = '';
  private cItem: any;
  houses: any;
  query: any = {};
  floors: any;
  rooms: any;
  houseId: any;
  floorId: any;
  roomId: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getItems(key: any) {
    const val = key.target.value;
    if (val) {
      this.http.get('http://127.0.0.1:3000/homings.json?key=' + val + '&facility_id=' + this.query.id).subscribe((data: any) => {
        this.cItem = data.result;
        // console.log(this.cItem);
      });
    } else {
      this.cItem = [];
    }
  }
  itemSelected(item: any) {
    // console.log(item);
    this.router.navigate(['/student'], { queryParams: { key: item.id } });
  }
  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(currentUser.access);
    this.http.get('http://127.0.0.1:3000/houses.json?pre=999',
      { headers: { Authorization: currentUser.access } }).subscribe((houses: any) => {
        // console.log(houses.result);
        this.houses = houses.result;
        this.houseId = this.houses[0].id;
        this.http.get('http://127.0.0.1:3000/floors.json?pre=999&parent_id=' + this.houseId,
          { headers: { Authorization: currentUser.access } }).subscribe((floors: any) => {
            // console.log(floors.result);
            this.floors = floors.result;
          });
      });

    // this.http.get( 'http://127.0.0.1:3000/homings.json?facility_id=5cc6c62488dba063c4048a25').subscribe( ( data: any) => {
    //   this.cItem = data.result;
    // });
  }
  changeHouse() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.searchQuery = null;
    this.query.id = this.houseId;
    this.http.get('http://127.0.0.1:3000/homings.json?facility_id=' + this.query.id).subscribe((dataItem: any) => {
      this.cItem = dataItem.result;
    });
    this.http.get('http://127.0.0.1:3000/floors.json?pre=999&parent_id=' + this.query.id,
      { headers: { Authorization: currentUser.access } }).subscribe((floors: any) => {
        this.floors = floors.result;
      });
    this.floorId = null;
    this.roomId = null;
    this.rooms = null;
  }
  changeFloor() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.searchQuery = null;
    this.query.id = this.floorId;
    this.http.get('http://127.0.0.1:3000/homings.json?facility_id=' + this.query.id).subscribe((dataItem: any) => {
      this.cItem = dataItem.result;
    });
    this.http.get('http://127.0.0.1:3000/rooms.json?pre=999&parent_id=' + this.query.id,
      { headers: { Authorization: currentUser.access } }).subscribe((rooms: any) => {
        this.rooms = rooms.result;
      });
    this.roomId = null;
  }
  changeRoom() {
    this.searchQuery = null;
    this.query.id = this.roomId;
    this.http.get('http://127.0.0.1:3000/homings.json?facility_id=' + this.query.id).subscribe((dataItem: any) => {
      this.cItem = dataItem.result;
    });
  }
  doRefresh( event: any ) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
