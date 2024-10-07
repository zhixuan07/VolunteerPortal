import { doc, updateDoc } from "firebase/firestore";

export function useAttendance(){
    const firestore = useFirestore();
    const markAttendance = async (docId:string, status:string) =>{
        try {
            const docRef =doc(firestore, "applications", docId);
            await updateDoc(docRef,{attendance:status});
            return true;
        } catch (error) {
            console.error("Error marking attendance: ", error);
            return false;
            
        }
    }
    return {markAttendance};
}