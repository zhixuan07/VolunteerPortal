import { ref as storageRef,getStorage, uploadBytes, getDownloadURL } from "firebase/storage";

export function useUploadFile(){
  const uploadFile = async (storageLocation: string, file: File) => {
    try {
      if (!file) {
        throw new Error("No file provided");
      }
  
      const storage = getStorage();
      const fileRef = storageRef(storage, `${storageLocation}/${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
  
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };
  
    return {uploadFile}
}