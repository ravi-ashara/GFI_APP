import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseDBService {

  constructor(private firestore: AngularFirestore) { }

  sendMessage(val_userID: any, val: any, record: any) {
    return this.firestore.collection('Chats').doc(val_userID).collection(val).add(record);
  }

  receivedUserList(val_userID: any) {
    return this.firestore.collection('Chats').doc(val_userID).snapshotChanges();
  }

  setOneToOneChat(uid1: any, uid2: any) {
    return uid1 + uid2;
  }

  registerUser() { }
}
