import { firebase } from "../utils/firebase.config.js";

export const getDocs = async (collectionName) => {
    const dataArr = [];
    const response = firebase.firestore().collection(collectionName)
    const snapshot = await response.get();

    snapshot.forEach(doc => {
        dataArr.push(doc.data())
    });

    return dataArr
}
