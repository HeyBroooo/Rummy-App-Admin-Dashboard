import { app } from "./firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const db = getFirestore(app);

interface Body {
  // Define the structure of your body object
  // Add necessary properties based on your requirements
  [key: string]: any;
}

/**
 *
 * @param {String} productType
 * @param {Object} body
 * @returns
 */
export async function SendToFirebase(
  productType: string,
  body: Body,
  id: string
) {
  try {
    const response = await setDoc(
      doc(db, `${productType}-collection`, `${id}`),
      body
    );

    return response;
  } catch (error) {
    console.error("Error sending data to Firebase:", error);
    throw error;
  }
}

export async function updateToFirebase(body: Body, id: string) {
  try {
    const response = await updateDoc(doc(db, "users", `${id}`), body);

    return response;
  } catch (error) {
    console.error("Error sending data to Firebase:", error);
    throw error;
  }
}

export async function updateToSubmission(body: Body, id: string) {
  try {
    const docRef = doc(db, "submissions", id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const response = await updateDoc(docRef, body);
      console.log("Document updated successfully:", response);
      return response;
    } else {
      console.warn(`Document with ID ${id} does not exist.`);
    }
  } catch (error) {
    console.error("Error updating data to Firebase:", error);
    throw error;
  }
}

export async function updateToReedem(body: Body, id: string) {
  try {
    const response = await updateDoc(doc(db, "withdrawals", `${id}`), body);

    return response;
  } catch (error) {
    console.error("Error sending data to Firebase:", error);
    throw error;
  }
}

export const GetAllusers = async () => {
  const querySnapshot = await getDocs(collection(db, `users`));

  const dataArray = querySnapshot.docs.map((doc) => {
    return doc.data();
  });

  return dataArray;
};

export const GetAllSubmissions = async () => {
  const querySnapshot = await getDocs(collection(db, "submissions"));

  const dataArray = querySnapshot.docs.map((doc) => {
    const { gameId, ...dataWithoutGameId } = doc.data();

    console.log("gameId:", gameId);

    return { gameId, ...dataWithoutGameId };
  });

  return dataArray;
};

export const GetAllRedeems = async () => {
  const querySnapshot = await getDocs(collection(db, `withdrawals`));

  const dataArray = querySnapshot.docs.map((doc) => {
    console.log("data..................................0");
    console.log(doc.data());
    return doc.data();
  });

  return dataArray;
};

export const GetAllData = async (productType: string) => {
  if (!productType) return [];

  const querySnapshot = await getDocs(collection(db, `${productType}-collection`));

  const dataArray = querySnapshot.docs.map((doc) => doc.data());

  return dataArray;
};
