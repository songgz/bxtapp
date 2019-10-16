import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  student : any;
  name: string;
  constructor(public activatedRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    //接收路由传值
    this.activatedRoute.queryParams.subscribe((result) => {
      // console.log(result);
      this.http.get( 'http://127.0.0.1:3000/students/' + result.key + '.json').subscribe( ( data: any) => {
        // this.student = data;
        this.student = data;
        this.name = this.student.name;
        console.log(this.student)
      });
    })
  }

}
