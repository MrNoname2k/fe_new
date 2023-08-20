import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public constructor(private storage: AngularFireStorage) {

  }

  public getImageUrl(imagePath: string) {
    const ref = this.storage.refFromURL(imagePath);
    return ref.getDownloadURL();
  }
}
