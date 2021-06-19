import firebase from 'firebase';

export interface Icon {
  name: string;
  format: string;
  imageSrc: string;
  dimensions?: string;
  biteSize?: number;
  createdAt: firebase.firestore.FieldValue;
  updatedAt: firebase.firestore.FieldValue;
}
