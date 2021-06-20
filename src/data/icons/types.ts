import firebase from 'firebase';

export interface Icon {
  name: string;
  mime: string;
  byteSize: number;
  imageSrc: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
