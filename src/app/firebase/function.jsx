import { app } from "./firebase";
import { getFirestore, collection, addDoc, getDocs, setDoc,doc, updateDoc, getDoc} from "firebase/firestore";


const db = getFirestore(app);


export async function SendToFirebase(gameType, body,id) {
  try {
      const response =  await setDoc(doc(db, `${gameType}-collection`, `${id}`), body);

      return response;
  } catch (error) {
    console.error("Error sending data to Firebase:", error);
    throw error;
  }
}

export const GetAllGames = async () => {
  const collectionNames = ["Best-App-collection", "New-App-collection", "Fraud-App-collection", "advertisements", "Best-For-All-collection"];

  const dataArrays = await Promise.all(collectionNames.map(async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => doc.data());
  }));

  const dataArray = dataArrays.flat();

  return dataArray;
};
