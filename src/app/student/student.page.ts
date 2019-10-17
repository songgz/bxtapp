import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  student = {};
  constructor(
    public activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private camera: Camera
    ) { }

  ngOnInit() {
    // 接收路由传值
    this.activatedRoute.queryParams.subscribe((result) => {
      // console.log(result);
      this.http.get( 'http://127.0.0.1:3000/students/' + result.key + '.json').subscribe( ( data: any) => {
        // this.student = data;
        this.student = data;
        console.log(this.student);
      });
    });
  }
  add() {
    // alert('1');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
      console.log(err);
     });
  }

}
