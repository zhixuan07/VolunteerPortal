import { getAuth,signInWithEmailAndPassword } from "firebase/auth";

export function useFirebaseAuth(){
    const auth = getAuth();
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
    const logout = () => {
        sessionStorage.removeItem('idToken');
    }
    return { loginWithCustomEmailAndPassword };
}