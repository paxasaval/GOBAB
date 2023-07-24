import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { IndicatorID } from 'src/app/models/indicator';
import { finalize } from 'rxjs/operators';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  accontName = environment.azureStorage.accountName
  containerName = environment.azureStorage.containerName

  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string>;

  constructor(
    private storage: AngularFireStorage
  ) { }

  private containerClient(sas: string): ContainerClient {
    return new BlobServiceClient(`https://${this.accontName}.blob.core.windows.net?${sas}`)
      .getContainerClient(this.containerName);
  }

  uploadFile(path: string, file: File) {
    const filePath = `${path}/${file.name}`
    const ref = this.storage.ref(filePath)
    const uploadTask = this.storage.upload(filePath, file)
    return new Promise<string>((res, rej) => {
      uploadTask.snapshotChanges()
        .pipe(
          finalize(async () => {
            const dowloadURL = await ref.getDownloadURL().toPromise()
            res(dowloadURL)
          })
        ).subscribe({
          error: rej
        })
    })
  }

  uploadFile2(sas: string, content: Blob, name: string, handler: () => void) {
    return this.uploadBlob(content, name, this.containerClient(sas))
  }

  uploadBlob(content: Blob, name: string, client: ContainerClient) {
    let blockBlobClient = client.getBlockBlobClient(name);
    return blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })

  }



}
