import { useToast } from "./useToast";
export function useReminder(){
    const toast = useToast();
    const sendReminder = async (emailInfo:Object) =>{
        try {
            const response = await fetch("/api/send_email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emailInfo),
            });
            const data = await response.json();
            toast.success( "Reminder sent successfully" );
            return data.success;
        } catch (error) {
            toast.error(`${error}`);
            return false;
        }
    }
    return {sendReminder};
}