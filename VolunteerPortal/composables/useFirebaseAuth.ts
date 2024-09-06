import { createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, push } from 'firebase/database';
export function useFirebaseAuth(){
    const auth = getAuth();
    const firestore = useFirestore()
    const loginWithCustomEmailAndPassword = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            sessionStorage.setItem('idToken', idToken);

          
            alert('Login Successful');
        } catch (error) {
            console.error(error);
            alert('Login Failed');
            return;
        }
    }
    const registerOrganisationAccount = async (email:string) => {
        const randomPassword = '123456'
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, randomPassword);
            // Send the email to the applicant
            return true;
        }catch(error){
            console.error(error);
            console.log('Error registering organisation account');
            return false;
        }
       
    }
    const logout = () => {
        sessionStorage.removeItem('idToken');
        
    }
    return { loginWithCustomEmailAndPassword, registerOrganisationAccount, logout};
}