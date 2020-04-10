import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  student: any = { avatar_url: '' };
  headerImage: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private camera: Camera
  ) { }

  ngOnInit() {
    
    // 接收路由传值
    this.activatedRoute.queryParams.subscribe((result) => {
      // console.log(result);
      this.http.get('http://127.0.0.1:3000/students/' + result.key + '.json').subscribe((data: any) => {
        // this.student = data;
        this.student = data;
        this.headerImage = 'http://127.0.0.1:3000/' + this.student.avatar_url;
        console.log(this.student);
      });
    });
  }
  openCamera() {
    const options: CameraOptions = {
      quality: 100,   // 图片质量
      destinationType: this.camera.DestinationType.DATA_URL, // 返回类型 .FILE_URI 返回文件地址 .DATA_URL 返回base64编码
      encodingType: this.camera.EncodingType.JPEG, // 图片格式 JPEG=0 PNG=1
      mediaType: this.camera.MediaType.PICTURE, // 媒体类型
      sourceType: this.camera.PictureSourceType.CAMERA, // 图片来源  CAMERA相机 PHOTOLIBRARY 图库
      allowEdit: true, // 允许编辑
      targetWidth: 300, // 缩放图片的宽度
      targetHeight: 300, // 缩放图片的高度
      saveToPhotoAlbum: true, // 是否保存到相册
      correctOrientation: true, // 设置摄像机拍摄的图像是否为正确的方向
    };
    this.camera.getPicture(options).then((imageData) => {

      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.headerImage = 'data:image/jpeg;base64,' + imageData || '/assets/img/imghead.png';
      console.log('got file: ' + imageData);

      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

}
