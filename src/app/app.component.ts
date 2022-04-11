import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  stream:any = null;
  status:any = null;
  trigger: Subject<void> = new Subject ();
  previewImage : string = '';
  btnLabel : string = 'Capture Image';


  
  get $trigger(): Observable<void>{
    return this.trigger.asObservable();
  }
  snapshot(event:WebcamImage){
    console.log (event);
    this.previewImage = event.imageAsDataUrl;
    this.btnLabel = 'Re Capture Image';
  }
  
  checkPermissions(){
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 800,
        height:500
      }
    }).then((res) => {
      console.log("response", res);
      this.stream = res;
      this.status = 'My Camera is Accessing';
      this.btnLabel = 'Capture Image';

    }).catch(err => {
      console.log(err);
      if(err?. message === 'Permission denied') {
        this.status = 'Permission Denied Due to not Approving the Access';
        
      } else {
        this.status = 'You may Having Camera Issues, pls try agian with appropriate way';
      }
    })

  
  }
  captureImage(){
    this.trigger.next();
  }

  Proceed(){
    console.log(this.previewImage);
  }
}