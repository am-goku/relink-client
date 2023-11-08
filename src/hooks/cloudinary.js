import axios from "axios";


const uploadCloudinary = async (imgData, setErr) => {
    try {
        return new Promise(async(resolve, reject) => {
            const image = await fetch(imgData);
            const blob = await image.blob();
            const file = new File([blob], "filename.png", {type: blob.type})

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "relinkPosts" );
            formData.append("cloud_name", "di9yf5j0d" );
            axios
              .post(
                "https://api.cloudinary.com/v1_1/di9yf5j0d/image/upload",
                formData
              )
              .then(async(response) => {
                console.log("Upload successful: ", response.data);
                setErr("upload_success");
                const data = response.data;
                resolve(data)
              })
              .catch((error) => {
                console.log("Error uploading: ", error);
                setErr(error?.message);
              });
        })
    } catch (error) {
        console.log(error);
    }
};


export default uploadCloudinary;