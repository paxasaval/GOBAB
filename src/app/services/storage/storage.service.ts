import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { IndicatorID } from 'src/app/models/indicator';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  uploadPercent!: Observable<number|undefined>;
  downloadURL!: Observable<string>;

  constructor(
    private storage:AngularFireStorage
  ) { }

  uploadFile(path:string, file:File){
    const ref = this.storage.ref(path)
    const task = this.storage.upload(path,file)
    this.uploadPercent = task.percentageChanges()
    return task.snapshotChanges().pipe(
      finalize(()=>this.downloadURL = ref.getDownloadURL())
    )
  }

}
