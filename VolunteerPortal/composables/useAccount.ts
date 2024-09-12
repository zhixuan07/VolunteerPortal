import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import bcrypt from "bcrypt";
export function useAccount() {
    const db = getFirestore();
    const orgApplicationsCollection = collection(db, "organisationApplications");
    const userCollection = collection(db, "users");
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
    const createOrganisationAccount = async(email:string)=>{
        //const hashedPassword = await bcrypt.hash(password, 10);
        await addDoc(userCollection, {
            email: email,
            role: 'organisation'
        });
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

    return { saveOrganisationAccountApplication,createOrganisationAccount,checkUserAccountExists };
}