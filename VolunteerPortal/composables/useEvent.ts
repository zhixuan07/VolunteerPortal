import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, query, documentId, where, setDoc } from "firebase/firestore";
import { useUploadFile } from "./useUpload";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useToast } from "./useToast";
import APPURL from "~/types/AppURL";
export function useEvent() {
    const firestore = useFirestore()
    const { uploadFile } = useUploadFile();
    const userID = sessionStorage.getItem('userId');
    const storageLocation = 'events';
    const toast = useToast();
    const createEvent = async (event: EventData) => {

        try {

            event.orgId = userID!;
            event.status = "ongoing";
            const docRef = await addDoc(collection(firestore, "events"), event);
            await setDoc(docRef, { id: docRef.id }, { merge: true });
            toast.success("Event created successfully");
            navigateTo(APPURL.ORG_EVENTS);
            return true;


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
            toast.error("No such document!");
        return null;
    }

    const getEvents = async () => {
        checkEventExpried();
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
        return events;
    }
    const updateEvent = async (eventId: string, event: any) => {
        try {
            await updateDoc(doc(firestore, "events", eventId), event);
            toast.success("Event updated successfully");
            navigateTo(APPURL.ORG_EVENTS);
            return true;
        } catch (e) {
            console.error("Error updating document: ", e);
            throw e
        }
    }
    const cancelEvent = async (eventId: string) => {

        try {
            if(eventId === null || eventId === undefined){
            toast.error("Event ID is null or undefined");
            return;
        }
            await deleteDoc(doc(firestore, "events", eventId));
            toast.success("Event cancelled successfully");
            reloadNuxtApp();
            return true;
        } catch (e) {
            console.error("Error removing document: ", e);
            return false;
        }
    }
    const getEventParticipants = async (eventId: string) => {
        const participants = [] as any[];
        const q = query(collection(firestore, "applications"), where("event_id", "==", eventId));
        const applicationSnapshots = await getDocs(q);
        //const participants = applicationSnapshots.docs.map(doc => doc.data());
        applicationSnapshots.forEach((doc) => {
            participants.push({
                id: doc.id,
                ...doc.data()
            })
        });
        console.log("Participants:", participants);
        return participants;

    }
    async function getUsers(userIds: string[]) {
        const userInfo = [] as any[];
        const userPromises = userIds.map(userId => {
            const userDocRef = doc(firestore, "users", userId);
            return getDoc(userDocRef);
        });

        const userSnapshots = await Promise.all(userPromises);
        userSnapshots.forEach(doc => {
            userInfo.push({
                id: doc.id,
                ...doc.data()
            })
        })
        return userInfo
    }
    async function getEventParticipantsWithUserInfo(eventId: string) {
        const participants = await getEventParticipants(eventId);
        const userInfo = await getUsers(participants.map((user: any) => user.user_id));
        console.log(userInfo);
        return participants.map(participant => ({
            ...participant,
            userInfo: userInfo.find((info: any) => info.id === participant.user_id)
        }))
    }
    async function checkEventExpried() {
        const events = [] as EventData[];
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
        const currentDate = new Date();
        events.forEach(async (event) => {
            const eventDate = new Date(event.date); // Convert event.date to a Date object
            if (eventDate < currentDate) {
                await updateDoc(doc(collection(firestore, "events"), event.id), { status: "expired" });
            }
        })
    }

    return { createEvent, getEvent, getEvents, updateEvent, cancelEvent, getEventParticipantsWithUserInfo };
}