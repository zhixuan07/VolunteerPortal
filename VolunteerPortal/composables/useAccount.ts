import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, push, get, update} from 'firebase/database';
export function useAccount(){
    // Save the registration data to get approval from the admin
    const saveOrganisationAccountApplication = async (email:string,orgName:string,phoneNumber:string,ssmNumber:string,ssmCertificate:any) => {
        const emailExists = await checkEmailExist(email);
        const phoneNumberExists = await checkPhoneNumberExist(phoneNumber);
        const ssmNumberExists = await checkSSMNumberExist(ssmNumber);

        if(emailExists){
            alert('Email already exists');
        }else if(phoneNumberExists){
            alert('Phone number already exists');

        }else if(ssmNumberExists){
            alert('SSM number already exists');
        }
        else{
            const ssmCertificateURL = await uploadSSMCertificate(ssmCertificate);
            // Save the registration data to Firebase Realtime Database
            const db = getDatabase();
            const orgRef = dbRef(db, "organisationApplications");
            await push(orgRef, {
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
   
    const checkEmailExist = async (email:string) => {
        try {
          const db = getDatabase();
          const orgRef = dbRef(db, "organisationApplications");
          const snapshot = await get(orgRef);
      
          let emailExists = false;
      
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (childData.email === email) {
              emailExists = true;
              // Return early once the email is found
              return true;
            }
          });
      
          return emailExists; // Return the boolean value
        } catch (error) {
          console.error("Error checking email existence:", error);
          
          return false;
        }
    };
    // Check existing phone number
    const checkPhoneNumberExist = async (phoneNumber:string) => {
        try {
          const db = getDatabase();
          const orgRef = dbRef(db, "organisationApplications");
          const snapshot = await get(orgRef);
      
          let phoneNumberExists = false;
      
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (childData.phoneNumber === phoneNumber) {
              phoneNumberExists = true;
              // Return early once the phone number is found
              return true;
            }
          });
      
          return phoneNumberExists; // Return the boolean value
        } catch (error) {
          console.error("Error checking phone number existence:", error);
          
          return false;
        }
    }
    // Check exsiting SSM number
    const checkSSMNumberExist = async (ssmNumber:string) => {
        try{
            const db = getDatabase();
            const orgRef = dbRef(db, "organisationApplications");
            const snapshot = await get(orgRef);
            let ssmNumberExists = false;
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                if (childData.ssmNumber === ssmNumber) {
                    ssmNumberExists = true;
                    return true;
                }
            });
            return ssmNumberExists;
        }catch(error){
            console.error("Error checking SSM number existence:", error);
            return false;
        }
    }

    const uploadSSMCertificate = async (ssmCertificate:File) => {
        if (ssmCertificate) {
          const storage = getStorage();
          const fileRef = storageRef(
            storage,
            `ssm-certificates/${ssmCertificate.name}`
          );
          await uploadBytes(fileRef, ssmCertificate);
          const downloadURL = await getDownloadURL(fileRef);
          return downloadURL;
        }
      };
      
      return { saveOrganisationAccountApplication };
}