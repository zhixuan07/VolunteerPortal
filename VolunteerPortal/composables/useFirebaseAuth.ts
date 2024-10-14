import { createUserWithEmailAndPassword, getAuth,sendEmailVerification,sendPasswordResetEmail,signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAccount } from "./useAccount";
import { useToast } from "./useToast";
import { addDoc, collection } from "firebase/firestore";
export function useFirebaseAuth(){
    const auth = getAuth();
    const toast = useToast();
    const currentUser = auth.currentUser;
    const firestore = useFirestore()
    const {createOrganisationAccount} = useAccount();
    const orgProfileCollection = collection(firestore, "organiserDetails");
    const loginWithCustomEmailAndPassword = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            //const idToken = await user.getIdToken();
            const userID = user.uid;
            sessionStorage.setItem('userId',userID );
            toast.success('Login Successful');
            return true;
        } catch (error) {
            console.error(error);
            alert('Login Failed');
            return false;
        }
    }
    const registerOrganisationAccount = async (orgEmail:string,orgName:string,phoneNumber:string) => {
        const randomPassword = '123456'
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, orgEmail, randomPassword);
            await createOrganisationAccount(orgEmail,userCredential.user.uid);
            const orgProfileRef = addDoc(orgProfileCollection,{
                email: orgEmail,
                name: orgName,
                phoneNumber: phoneNumber,
            })
            // Send the email to the applicant
            return true;
        }catch(error){
            console.error(error);
            console.log('Error registering organisation account');
            return false;
        }
       
    }
    const sendVerificationEmail = async () => {
        try {
            sendEmailVerification(currentUser!);
        } catch (error) {
            
        }
    }
    const resetAccountPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    const getUserUID = () => {
        return auth.currentUser?.uid
    }
    const logout = () => {
        auth.signOut();
        sessionStorage.removeItem('userId');
        
    }
    return { loginWithCustomEmailAndPassword, registerOrganisationAccount, logout, getUserUID,resetAccountPassword, sendVerificationEmail };
}