import { getFirestore, collection, query, where, getDocs, addDoc, documentId, setDoc, updateDoc, doc } from 'firebase/firestore';
import { useEvent } from './useEvent';
export function useReport() {
    const db = getFirestore();
    
    const reportCollection = collection(db, "reports");
    const fetchReports = async () => {
        const reports = [] as any[];
        const querySnapshot = await getDocs(reportCollection);
        
        const fetchPromises = querySnapshot.docs.map(async (doc) => {
            const eventData = await useEvent().getEvent(doc.data().event_id);
            return {
                id: doc.id,
                ...doc.data(),
                event: eventData as EventData
            };
        });

        reports.push(...await Promise.all(fetchPromises));
        return reports;
    };
    return { fetchReports };
}
