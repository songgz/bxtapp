import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenReference } from '@angular/compiler';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-homing',
  templateUrl: './homing.page.html',
  styleUrls: ['./homing.page.scss'],
})
export class HomingPage implements OnInit {
  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;

  searchQuery: any = '';
  private cItem: any;
  houses: any;
  query: any = {};
  floors: any;
  rooms: any;
  houseId: any;
  floorId: any;
  roomId: any;
  dataItem: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getItems(key: any) {
    const val = key.target.value;
    if (val) {
      this.http.get('http://127.0.0.1:3000/homings.json?key=' + val + '&facility_id=' + this.query.id)
      .subscribe((dataItem: any) => {
        this.cItem = dataItem.result;
        this.dataItem = dataItem;
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
    this.http.get('http://127.0.0.1:3000/houses.json?pre=999', { headers: { Authorization: currentUser.access } })
      .subscribe((houses: any) => {
        // console.log(houses.result);
        this.houses = houses.result;
        this.houseId = this.houses[0].id;
        this.http.get('http://127.0.0.1:3000/floors.json?pre=999&parent_id=' + this.houseId,
          { headers: { Authorization: currentUser.access } }).subscribe((floors: any) => {
            // console.log(floors.result);
            this.floors = floors.result;
          });
      });
  }
  changeHouse() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.searchQuery = null;
    this.query.id = this.houseId;
    this.http.get('http://127.0.0.1:3000/homings.json?facility_id=' + this.query.id)
      .subscribe((dataItem: any) => {
        this.dataItem = dataItem;
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
      this.dataItem = dataItem;
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
      this.dataItem = dataItem;
    });
  }
  doRefresh(event: any) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    console.log(this.dataItem.paginate_meta);
    this.http.get('http://127.0.0.1:3000/homings.json?facility_id=' + this.query.id + '&page=' + this.dataItem.paginate_meta.next_page)
    .subscribe((dataItem: any) => {
      // this.cItem = dataItem.result;
      // console.log(dataItem);
      this.dataItem = dataItem;
      event.target.complete();
      if (this.dataItem.paginate_meta.current_page === this.dataItem.paginate_meta.total_pages) {
        event.target.disabled = true;
      }
      // console.log(this.cItem);
      this.cItem = this.cItem.concat(this.dataItem.result);
      // console.log(this.cItem);
    });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
