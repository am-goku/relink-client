import { toast } from "react-toastify"

export const showError = (error, setError) => {
    if(error){
        toast.error(error?.message || "Something went wrong !", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setError(null);
    }
}