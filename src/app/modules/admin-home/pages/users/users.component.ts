import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserID, UserIDwithRolID } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { DialogNewUserComponent } from '../../component/dialog-new-user/dialog-new-user.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUsers:UserID[]=[]
  allUsersAux:UserIDwithRolID[]=[]
  subscription!:Subscription

  constructor(
    private userService:UserService,
    private modalService: NzModalService,

  ) { }

  openDialog(){
    const modal = this.modalService.create({
      nzTitle:'Agregar Usuario',
      nzContent:DialogNewUserComponent,
      nzComponentParams:{
      },
    })
    modal.afterClose.subscribe(
      result=>{
        this.afterClosed()
      }
    )
  }
  afterClosed(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
    this.allUsersAux=[]
    this.subscription=this.userService.getAllUsers().subscribe(
      users=>{
        this.allUsers=users
        this.allUsersAux=users as UserIDwithRolID[]
      }
    )
  }
  deleteUser(user:UserIDwithRolID){
    this.userService.deleteUser(user.id)
    this.afterClosed()
  }
  editUser(user:UserIDwithRolID){
    const modal = this.modalService.create({
      nzTitle:'Editar Usuario',
      nzContent:DialogNewUserComponent,
      nzComponentParams:{
        user:user
      },
    })
    modal.afterClose.subscribe(
      result=>{
        this.afterClosed()
      }
    )
  }
  ngOnInit(): void {
    this.subscription= this.userService.getAllUsers().subscribe(
      users=>{
        this.allUsers=users
        this.allUsersAux = users as UserIDwithRolID[]
      }
    )
  }

}
