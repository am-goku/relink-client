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
                reject(user)
            }
        } catch (error) {
            reject({user: false})
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
                reject(admin)
            }
        } catch(error){
            reject({ admin: false });
        }
    })
}