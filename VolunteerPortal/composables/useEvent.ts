import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc,query, documentId, where, setDoc } from "firebase/firestore";
import { useUploadFile } from "./useUpload";
import { useFirebaseAuth } from "./useFirebaseAuth";
export function useEvent(){
    const firestore = useFirestore()
    const { uploadFile } = useUploadFile();
    const userID = useFirebaseAuth().getUserUID();
    const storageLocation = 'events';
    const createEvent = async (event: any, eventImage:any) => {
        
        try {
            // Upload the event image to Firebase
            const imageURL = await uploadFile(storageLocation, eventImage);
            if(!imageURL){
                console.error("Error uploading image");
                return false;
            }else{

                event.image = imageURL;
                event.orgId = userID;
                event.status = "ongoing";
                const docRef = await addDoc(collection(firestore, "events"), event);
                await setDoc(docRef, { id: docRef.id }, { merge: true });
                return true;
            }
           
        } catch (e) {
            console.error("Error adding document: ", e);
            return false;
        }
    }
    const getEvent = async (docId: any) => {
        const event = {} as EventData;
        const docRef = doc(firestore, "events", docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() as EventData };
        } else 
            console.log("No such document!");
            return null;
        }
    
    const getEvents = async () => {
        const events = [] as EventData[];
        console.log("User ID:", userID);
        const q = query(collection(firestore, "events"), where("orgId", "==", userID));
        const querySnapshot = await getDocs(q);
        // query the events collection that belongs to the current user id 
        
        querySnapshot.forEach((doc) => {
            events.push({
              id: doc.id,  // Get the document ID
              ...doc.data() as EventData,  // Spread the document data
            });
          });
        console.log("Events data:", events);
        return events;
    }
    const updateEvent = async (eventId: string, event:any) => {
        try {
            console.log("Updated Event",event)
            await updateDoc(doc(firestore, "events", eventId), event);
            console.log("Event successfully updated!");
            return true;
        } catch (e) {
            console.error("Error updating document: ", e);
            return false;
        }
    }
    const deleteEvent = async (eventId: string) => {
        try {
            await deleteDoc(doc(firestore, "events", eventId));
            console.log("Document successfully deleted!");
            return true;
        } catch (e) {
            console.error("Error removing document: ", e);
            return false;
        }
    }
    return { createEvent, getEvent, getEvents, updateEvent, deleteEvent };
}