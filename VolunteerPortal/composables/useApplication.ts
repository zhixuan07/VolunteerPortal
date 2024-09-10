import { getDatabase,ref as dbRef,update,get } from "firebase/database";
import { useFirebaseAuth } from "./useFirebaseAuth";
export function useApplication(){
    
    const retreiveOrganisationApplications = async () => {
        const db = getDatabase();
        const orgRef = dbRef(db, "organisationApplications");
        const snapshot = await get(orgRef);
        const orgApplications: any[] = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          orgApplications.push({
            id: childSnapshot.key,
            orgName: childData.orgName,
            email: childData.email,
            phoneNumber: childData.phoneNumber,
            ssmNumber: childData.ssmNumber,
            ssmCertificateUrl: childData.ssmCertificateUrl,
            status: childData.status,
          });
        });
        return orgApplications;
    };
    const approveOrganisationApplication= async (orgId:string) => {
        try{
            const db = getDatabase();
            const orgRef = dbRef(db, `organisationApplications/${orgId}`);
            const orgEmail = (await get(orgRef)).val().email;
         
            const accountRegistered = await useFirebaseAuth().registerOrganisationAccount(orgEmail);
            if(accountRegistered){
                await update(orgRef, { status: "approved" });
                return true;
            }
            
        }catch(error){
            console.error("Error approving organisation account:", error);
            return false;
        }
       
    };
    const rejectOrganisationApplication = async (orgId:string) => {
        try{
            const db = getDatabase();
            const orgRef = dbRef(db, `organisationApplications/${orgId}`);
            await update(orgRef, { status: "rejected" });
            return true;
        }catch(error){
            console.error("Error rejecting organisation account:", error);
            return false;
        }
    };

    return {retreiveOrganisationApplications,approveOrganisationApplication,rejectOrganisationApplication};
}