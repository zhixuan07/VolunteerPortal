import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export function useToast (){
    const success = (message: string) => {
        toast.success(message);
    }
    const error = (message: string) => { 
        toast.error(message);
    }   
    const warning = (message: string) => {
        toast.warning(message);
    }
    return {success, error, warning};
}