import { getFirestore, collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { useFirebaseAuth } from "./useFirebaseAuth";

export function useApplication() {
    const db = getFirestore();

    const retrieveOrganisationApplications = async () => {
        const orgApplications: any[] = [];
        const querySnapshot = await getDocs(collection(db, "organisationApplications"));
        querySnapshot.forEach((doc) => {
            orgApplications.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return orgApplications;
    };

    const approveOrganisationApplication = async (orgId: string) => {
        try {
            const orgRef = doc(db, "organisationApplications", orgId);
            const orgSnap = await getDoc(orgRef);
            
            if (orgSnap.exists()) {
                const orgData = orgSnap.data();
                const orgEmail = orgData.email;

                const accountRegistered = await useFirebaseAuth().registerOrganisationAccount(orgEmail);
                if (accountRegistered) {
                    await updateDoc(orgRef, { status: "approved" });
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Error approving organisation account:", error);
            return false;
        }
    };

    const rejectOrganisationApplication = async (orgId: string) => {
        try {
            const orgRef = doc(db, "organisationApplications", orgId);
            await updateDoc(orgRef, { status: "rejected" });
            return true;
        } catch (error) {
            console.error("Error rejecting organisation account:", error);
            return false;
        }
    };

    return { retrieveOrganisationApplications, approveOrganisationApplication, rejectOrganisationApplication };
}