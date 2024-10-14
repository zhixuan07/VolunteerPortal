import { getFirestore, collection, query, where, getDocs, addDoc, documentId, setDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import bcrypt from "bcrypt";
import { useToast } from './useToast';
import { update } from 'firebase/database';
export function useAccount() {
    const db = getFirestore();
    const firestore = useFirestore()
    const orgApplicationsCollection = collection(db, "organisationApplications");
    const userCollection = collection(db, "users");
    const orgProfileCollection = collection(db, "organiserDetails");
    const userID = sessionStorage.getItem('userId');
    const toast = useToast();
    const saveOrganisationAccountApplication = async (email: string, orgName: string, phoneNumber: string, ssmNumber: string, ssmCertificate: File) => {
        const emailExists = await checkFieldExists('email', email);
        const phoneNumberExists = await checkFieldExists('phoneNumber', phoneNumber);
        const ssmNumberExists = await checkFieldExists('ssmNumber', ssmNumber);

        if (emailExists) {
            alert('Email already exists');
        } else if (phoneNumberExists) {
            alert('Phone number already exists');
        } else if (ssmNumberExists) {
            alert('SSM number already exists');
        } else {
            const ssmCertificateURL = await uploadSSMCertificate(ssmCertificate);
            
            await addDoc(orgApplicationsCollection, {
                orgName: orgName,
                email: email,
                phoneNumber: phoneNumber,
                ssmNumber: ssmNumber,
                ssmCertificateUrl: ssmCertificateURL,
                status: "pending", // Mark the application as pending approval
            });
            alert("Registration successful");
        }
    }
    const createOrganisationAccount = async(email:string,userId:string)=>{
        //const hashedPassword = await bcrypt.hash(password, 10);
       const docRef=  await addDoc(userCollection, {
            email: email,
            role: 'organisation',
        });
        await setDoc(docRef, { id: userId }, { merge: true });
        return true;
    }
    const checkFieldExists = async (field: string, value: string) => {
        try {
            const q = query(orgApplicationsCollection, where(field, '==', value));
            const querySnapshot = await getDocs(q);
            return !querySnapshot.empty;
        } catch (error) {
            console.error(`Error checking ${field} existence:`, error);
            return false;
        }
    }
    const checkUserAccountExists = async (email: string) => {
        try {
            const q = query(userCollection, where('email', '==', email));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                return false;
            }else{
                return true;
            }
        } catch (error) {
            console.error("Error checking user account existence:", error);
            return false;
            
        }
    };

    const uploadSSMCertificate = async (ssmCertificate: File) => {
        if (ssmCertificate) {
            const storage = getStorage();
            const fileRef = storageRef(storage, `ssm-certificates/${ssmCertificate.name}`);
            await uploadBytes(fileRef, ssmCertificate);
            const downloadURL = await getDownloadURL(fileRef);
            return downloadURL;
        }
    };
    const getProfile = async ()=>{
        
        const q = query(orgProfileCollection, where('user_id', '==', userID));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty){
            console.log('No such document');
            return null;
        }else{
          return { doc_id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() as OrganiserDetails };
        }
    }
    const updateProfile = async (profile:any) => {
        try {
            await updateDoc(doc(firestore,"organiserDetails",profile.doc_id),profile);
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Error updating profile");
        }
    };

    return { saveOrganisationAccountApplication,createOrganisationAccount,checkUserAccountExists,getProfile,updateProfile };
}