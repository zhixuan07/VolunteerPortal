
import { doc, updateDoc, where, collection, query, getDocs } from "firebase/firestore";

export function useAttendance() {
    const firestore = useFirestore();
    const markAttendance = async (docId: string, status: string, eventId: string) => {
        try {

            const docRef = doc(firestore, "applications", docId);
            // Only calculate volunteer hours if the volunteer has completed the event
            if (status === "Completed") {
                const volunteerHours = await calculateVolunteerHours(eventId);
                console.log("Volunteer hours: ", volunteerHours);
                await updateDoc(docRef, { attendance: status, volunteer_hours: volunteerHours });
            } else {
                await updateDoc(docRef, { attendance: status });
            }
            return true;
        } catch (error) {
            console.error("Error marking attendance: ", error);
            return false;

        }
    }
    const calculateVolunteerHours = async (eventId: string) => {
        let startTime = null
        let endTime = null
        const q = query(collection(firestore, "events"), where("id", "==", eventId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            startTime = doc.data().startTime;
            endTime = doc.data().endTime;
        });
        const [startHours, startMinutes] = startTime!.split(':').map(Number);
        const [endHours, endMinutes] = endTime!.split(':').map(Number);

        // Create Date objects for today's date with the specified times
        const startDate = new Date();
        startDate.setHours(startHours, startMinutes, 0, 0); // Set hours and minutes

        const endDate = new Date();
        endDate.setHours(endHours, endMinutes, 0, 0); // Set hours and minutes

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

        // Calculate the difference in hours
        const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
        console.log("Difference in hours: ", differenceInHours);
        return differenceInHours.toString();
    }
    return { markAttendance };
}