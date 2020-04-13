import { Injectable  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public message:string;
  public className:string = "bg-info text-light";

  show(message) {
    this.message = message;

  }
  
  remove() {
    this.message = undefined;
  }

  getMessage(){
    return this.message;
  }

  showSuccess(message){
    this.message = message;
    this.className = "bg-success text-light";
  }

  showWarning(message){
    this.message = message;
    this.className = "bg-warning text-light";
  }
  
  showFailed(message){
    this.message = message;
    this.className = "bg-danger text-light";
  }
}
