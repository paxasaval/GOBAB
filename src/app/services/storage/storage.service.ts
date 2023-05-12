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
    const filePath = `${path}/${file.name}`
    const ref = this.storage.ref(filePath)
    const uploadTask = this.storage.upload(filePath,file)
    return new Promise<string>((res,rej)=>{
      uploadTask.snapshotChanges()
       .pipe(
        finalize(async ()=>{
          const dowloadURL = await ref.getDownloadURL().toPromise()
          res(dowloadURL)
        })
       ).subscribe({
        error:rej
       })
    })
  }

}
