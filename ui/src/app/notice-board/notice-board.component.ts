import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NoticeBoardService } from './notice-board.service';
import { SelectItem, MessageService } from 'primeng/api';
import {PaginatorModule} from 'primeng/paginator';
@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css'],
  providers: [MessageService],
})
export class NoticeBoardComponent implements OnInit {

  constructor(private noticeService: NoticeBoardService, private messageService: MessageService) {
    this.typesArray = [
      { label: 'Select Type', value: null },
      { label: 'Broadcast', value: "broadcast" },
      { label: 'Event', value: "event" },
    ];
  }
  public showCreateNotice: boolean = false

  ngOnInit(): void {
    this.getNotices();
    this.getNoticesByType('broadcast')
    this.getNoticesByType('event')

  }

  showDialog() {
    this.showCreateNotice = true;
  }
  closeDialog() {
    this.showCreateNotice = false
  }

public page=1;
  public noticeForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl('')
  })
  addNewNotice() {
    let data = {
      'title': this.noticeForm.get('title').value,
      'description': this.noticeForm.get('description').value,
      'type': this.noticeForm.get('type').value,
    }
    this.noticeService.addNotice(data).subscribe(
      res => {
        console.log(res)
        this.messageService.add({ severity: 'success', summary: 'Created!', detail: 'New Notice Added.', life: 5000 });
        this.getNotices()
        this.getNoticesByType('broadcast')
        this.getNoticesByType('event')
      },
      err => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'something went wrong in api', life: 5000 });
      });

  }
  public notices: any = [];
  getNotices() {
    this.noticeService.getAllNotices().subscribe(
      res => {
        console.log(res)
        this.notices = res
        console.log(this.notices)

      },
      err => {
        console.log(err)
      }
    )
  }
  public noticesByType: any = [];
  broadcastNotices: any[];
  eventNotices: any[];
  public types: any = []

  getNoticesByType(type) {
    let data = {
      type: type
    }

    this.noticeService.getNoticesByType(data).subscribe(
      res => {
        console.log(res)
        this.noticesByType = res;
        type == 'broadcast' ? this.broadcastNotices = this.noticesByType : this.eventNotices = this.noticesByType;
      },
      err => {
        console.log(err)
      }
    )

  }

  public typesArray: SelectItem[];




}






