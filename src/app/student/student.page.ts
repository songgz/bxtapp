import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../service/rest/rest.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { from } from 'rxjs';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { DictService } from '../service/dict/dict.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  directionType: any = {};
  colorDirection: any = {};
  genders: Observable<any[]>;
  student: any = { avatar_url: '' };
  headerImage: any;
  baseUrl: any = environment.baseUrl;

  constructor(
    public activatedRoute: ActivatedRoute,
    private camera: Camera,
    private rest: RestService,
    private  dict: DictService
  ) {
    this.dict.getItems('direction_type').subscribe(data => {
      for ( const item of data ) {
        this.directionType[item.mark] = item.title;
        this.colorDirection[item.mark] = item.color;
      }
    });
    this.dict.getItems('gender_type').subscribe( data => {
      this.genders = data;
    });
   }

  ngOnInit() {
    // 接收路由传值
    this.activatedRoute.queryParams.subscribe((result) => {
      // console.log(result);
      this.rest.index( 'students/' + result.key ).subscribe((data: any) => {
        // this.student = data;
        this.student = data;
        this.headerImage = this.baseUrl + this.student.avatar_url;
        // console.log(this.student);
      });
    });
  }
  // openCamera() {
  //   const options: CameraOptions = {
  //     quality: 100,   // 图片质量
  //     destinationType: this.camera.DestinationType.DATA_URL, // 返回类型 .FILE_URI 返回文件地址 .DATA_URL 返回base64编码
  //     encodingType: this.camera.EncodingType.JPEG, // 图片格式 JPEG=0 PNG=1
  //     mediaType: this.camera.MediaType.PICTURE, // 媒体类型
  //     sourceType: this.camera.PictureSourceType.CAMERA, // 图片来源  CAMERA相机 PHOTOLIBRARY 图库
  //     allowEdit: true, // 允许编辑
  //     targetWidth: 300, // 缩放图片的宽度
  //     targetHeight: 300, // 缩放图片的高度
  //     saveToPhotoAlbum: true, // 是否保存到相册
  //     correctOrientation: true, // 设置摄像机拍摄的图像是否为正确的方向
  //   };
  //   this.camera.getPicture(options).then((imageData) => {

  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     this.headerImage = 'data:image/jpeg;base64,' + imageData || '/assets/img/imghead.png';
  //     console.log('got file: ' + imageData);

  //     // If it's base64:
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;

  //   }, (err) => {
  //     // Handle error
  //     console.log(err);
  //   });
  // }

}
