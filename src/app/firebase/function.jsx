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