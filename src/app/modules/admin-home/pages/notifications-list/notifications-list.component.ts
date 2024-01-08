import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { NotificationsID } from 'src/app/models/notifications';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { IndicatorInstance, IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { IndicatorID } from 'src/app/models/indicator';
import { TypeID } from 'src/app/models/type';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';
import { SubindicatorID } from 'src/app/models/subindicators';
@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {

  user?: User
  initLoading: boolean = true
  list?: NotificationsID[]
  loading = true
  isLoading = false

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private location: Location,
    private indicatorInstanceService: IndicatorInstanceService,
    private subindicatorService: SubindicatorService,
    private evidenceService: EvidenceService
  ) {

  }

  openElement(item: NotificationsID) {
    if(item.state===1){
      this.checkNotify(item)
    }
    const appDomain = this.location.prepareExternalUrl('');
    var finalURL = `${appDomain}admin`
    const itemID = item.itemID as string
    if (item.itemType > 0) {
      finalURL += '/quadrant'
    }
    if (item.itemType === 2) {
      this.subindicatorService.getSubindicatorByID(itemID).subscribe(res => {
        const indicatorInstance = res.indicadorID as IndicatorInstanceID
        const indicatorCatalog = indicatorInstance.indicatorID as IndicatorID
        const type = res.typeID as TypeID
        finalURL += `/${indicatorCatalog.quadrant}/indicator/${indicatorCatalog.number}/${indicatorInstance.id}`
        if (type.mandatory) {
          finalURL += `/${type.name.replace('', '-')}`
        }
        else {
          //http://localhost:4200/admin/quadrant/<numberQuadrant>/indicator/<numberIndicator>/<indicatorInstanceID>/Subindicadores-Especificos/64bfeca98e71fd14f59d54b2
          finalURL += `/Subindicadores-Especificos/${res.id}`
        }
        console.log(finalURL)
        this.router.navigateByUrl(finalURL)
      })
    }
    if (item.itemType === 3) {
      this.evidenceService.getEvidenceByID(itemID).pipe(
        switchMap((res) => {
          const sub = res.subIndicatorID as SubindicatorID
          const id = sub.id as string
          return this.subindicatorService.getSubindicatorByID(id)
        })).subscribe(res=>{
          const indicatorInstance = res.indicadorID as IndicatorInstanceID
          const indicatorCatalog = indicatorInstance.indicatorID as IndicatorID
          const type = res.typeID as TypeID
          finalURL+=`/${indicatorCatalog.quadrant}/indicator/${indicatorCatalog.number}/${indicatorInstance.id}`
          if(type.mandatory){
            console.log(finalURL)
            const typeName =type.name.trim().replace(' ','-')
            console.log(typeName)
            finalURL+=`/${typeName}`
            console.log(finalURL)
          }
          else{
            //http://localhost:4200/admin/quadrant/<numberQuadrant>/indicator/<numberIndicator>/<indicatorInstanceID>/Subindicadores-Especificos/64bfeca98e71fd14f59d54b2
            finalURL+=`/Subindicadores-Especificos/${res.id}`
          }
          console.log(finalURL)
          this.router.navigateByUrl(finalURL)
      })
    }
  }

  checkNotify(item: NotificationsID) {
    this.notificationService.readNotify(item.id).subscribe(res => {
      console.log('check', res)
      this.fetchData()
    })
  }
  uncheckNotify(item: NotificationsID) {
    this.notificationService.unreadNotify(item.id).subscribe(res => {
      console.log('uncheck', res)
      this.fetchData()
    })
  }



  fetchData() {
    this.loading = true
    this.list = []
    combineLatest([
      this.userService.getUserSesion()
    ]).pipe(
      concatMap(([user]) => {
        return this.notificationService.getAllNoticationByUser(user.id)
      })
    ).subscribe((notifications) => {
      console.log(notifications)
      const numbereUnread = notifications.filter(n => n.state == 1).length
      console.log('no leidos:', numbereUnread)
      this.notificationService.setUnread(numbereUnread)
      this.list = notifications
      this.loading = false
      this.initLoading = false
    })
  }

  ngOnInit(): void {
    this.fetchData()
  }

}
