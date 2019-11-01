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

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getItems(ev: any) {
    const val = ev.target.value;
    if (val) {
      this.http.get('http://127.0.0.1:3000/homings.json?key=' + val).subscribe((data: any) => {
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
    console.log(currentUser.access);
    this.http.get('http://127.0.0.1:3000/houses.json?pre=999',
    { headers: { Authorization : 'Bearer ' + currentUser.access }}).subscribe( (data: any) => {
      console.log(data);
    });
    // this.http.get( 'http://127.0.0.1:3000/homings.json?facility_id=5cc6c62488dba063c4048a25').subscribe( ( data: any) => {
    //   this.cItem = data.result;
    // });
  }

}
