import { useSelector } from "react-redux"

export const userAuthMiddleware =()=>{
    return new Promise((resolve, reject) => {
        try {
            const userStore = useSelector((state) => state?.user);
            let userData, user;
            if (userStore?.userData) {
              userData = userStore.userData;
              user = userStore.validUser;
              resolve({userData, user});
            } else {
                user = false;
                resolve(user)
            }
        } catch (error) {
            console.log(error);
            resolve({user: false})
        }
    })
};



export const adminAuthMiddleware = () => {
    return new Promise((resolve, reject) => {
        try {
            const adminStore = useSelector((state)=> state?.admin);
            let adminData, admin;
            if(adminStore?.adminData){
                adminData = adminStore.adminData;
                admin = adminStore.validAdmin;
                resolve({adminData, admin})
            } else {
                admin = false;
                resolve(admin)
            }
        } catch(error){
            console.log(error);
            resolve({ admin: false });
        }
    })
}