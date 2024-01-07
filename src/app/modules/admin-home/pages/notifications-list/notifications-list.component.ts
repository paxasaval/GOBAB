import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { NotificationsID } from 'src/app/models/notifications';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {

  user?:User
  initLoading:boolean=true
  list?:NotificationsID[]
  loading=true
  constructor(
    private userService:UserService,
    private notificationService:NotificationService
  ) { }

  openElement(item:NotificationsID){

  }

  changeState(item:NotificationsID){

  }

  fetchData(){
    combineLatest([
      this.userService.getUserSesion()
    ]).pipe(
      concatMap(([user])=>{
        return this.notificationService.getAllNoticationByUser(user.id)
      })
    ).subscribe((notifications)=>{
      this.list=notifications
      this.loading=false
      this.initLoading=false
      })
  }

  ngOnInit(): void {
    this.fetchData()
  }

}
