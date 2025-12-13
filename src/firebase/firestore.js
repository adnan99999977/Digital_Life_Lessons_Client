import { db } from "./firebase.config"
import { doc, setDoc, addDoc, collection } from "firebase/firestore"

// new user create using setDoc custom ID
export const createUserProfile = async (uid, data) => {
  return await setDoc(doc(db, "users", uid), {
    uid,
    ...data,
    createdAt: new Date()
  })
}

// add normal document with auto ID
export const createPost = async (data) => {
  return await addDoc(collection(db, "posts"), {
    ...data,
    createdAt: new Date()
  })
}
