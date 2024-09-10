import { ref as storageRef,getStorage, uploadBytes, getDownloadURL } from "firebase/storage";

export function useUploadFile(){
    const uploadFile = async(storageLocation:string,file:File)=>{
        if (file) {
            const storage = getStorage();
            const fileRef = storageRef(
              storage,
              `${storageLocation}/${file.name}`
            );
            await uploadBytes(fileRef,file);
            const downloadURL = await getDownloadURL(fileRef);
            return downloadURL;
          }
    }
    const updateFile = async()=>{
      
    }
    return {uploadFile}
}