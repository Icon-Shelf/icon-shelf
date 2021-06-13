// import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
// import { db } from 'configs/firebase';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { Icon } from './types';

// const storage = getStorage();

export const IconsApi = {
  // getAllIcons: async (): Promise<Icon[]> => {
  //   const iconsRef = await getDocs<any>(collection(db, 'icons'));
  //   const icons: Icon[] = iconsRef.docs.map((doc) => doc.data());
  //   return icons;
  // },
  // uploadIcon: async (icon: Icon, image: File): Promise<void> => {
  //   const iconStoragePath = `icons/${icon.name}`;
  //   const storageRef = ref(storage, iconStoragePath);
  //   await uploadBytes(storageRef, image);
  //   const url = await getDownloadURL(storageRef);
  //   // Add a new document in collection "icons"
  //   return setDoc(doc(db, 'icons', icon.name), {
  //     ...icon,
  //     imageSrc: url,
  //   });
  // },
};
