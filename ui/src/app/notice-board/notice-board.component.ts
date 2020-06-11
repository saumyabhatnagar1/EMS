import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NoticeBoardService } from './notice-board.service';
import {SelectItem,MessageService} from 'primeng/api';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css'],
  providers:[MessageService],
})
export class NoticeBoardComponent implements OnInit {

  constructor(private noticeService : NoticeBoardService,private messageService: MessageService) { }
  public showCreateNotice:boolean=false

  ngOnInit(): void {
    this.getNotices();
  }

  showDialog(){
    this.showCreateNotice = true;
    }
    closeDialog(){
      this.showCreateNotice=false
    }
  

  public noticeForm=new FormGroup({
    title:new FormControl(''),
    description:new FormControl(''),
    type:new FormControl('')
  })
addNewNotice(){
  let data = {
    'title' : this.noticeForm.get('title').value,
    'description' : this.noticeForm.get('description').value,
    'type' : this.noticeForm.get('type').value,
  }
  this.noticeService.addNotice(data).subscribe(
    res => {
      console.log(res) 
    this.messageService.add({severity:'success', summary:'Created!', detail:'New Notice Added.',life:5000});
       this.getNotices()
    },
    err => {
      console.log(err);
      this.messageService.add({severity:'error',summary:'Failed',detail:'something went wrong in api',life:5000});
    });

}
public notices:any=[];
getNotices(){
  this.noticeService.getAllNotices().subscribe(
    res => {
      console.log(res)
      this.notices=res
      console.log(this.notices)
    },
    err => {
      console.log(err)
    }
  )
}


}






