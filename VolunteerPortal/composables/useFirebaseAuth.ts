import { createUserWithEmailAndPassword, getAuth,sendPasswordResetEmail,signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAccount } from "./useAccount";
export function useFirebaseAuth(){
    const auth = getAuth();
    const firestore = useFirestore()
    const {createOrganisationAccount} = useAccount();
    const loginWithCustomEmailAndPassword = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            //const idToken = await user.getIdToken();
            const userID = user.uid;
            sessionStorage.setItem('userId',userID );
            alert('Login Successful');
            return true;
        } catch (error) {
            console.error(error);
            alert('Login Failed');
            return false;
        }
    }
    const registerOrganisationAccount = async (email:string) => {
        const randomPassword = '123456'
        try{
            await createUserWithEmailAndPassword(auth, email, randomPassword);
            await createOrganisationAccount(email);
            // Send the email to the applicant
            return true;
        }catch(error){
            console.error(error);
            console.log('Error registering organisation account');
            return false;
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
    return { loginWithCustomEmailAndPassword, registerOrganisationAccount, logout, getUserUID };
}