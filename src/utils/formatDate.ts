import firebase from 'firebase';

export function formatDate(date?: firebase.firestore.Timestamp) {
  if (!date) {
    return '';
  }

  const jsDate = new Date(date.toDate());

  return jsDate.toLocaleDateString('en-IN');
}
