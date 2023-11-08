const whitespaceRegExp = /^$|\s+/;




export const loginValidate = (credentails, setErr) =>{
    return new Promise((resolve, reject) =>{
        try {
            let flag = false;
            if(!whitespaceRegExp.test(credentails.username)){
                if(!whitespaceRegExp.test(credentails.password)){
                    flag = true;
                } else {
                    setErr("Password can't contain whitespace")
                }
            } else {
                setErr("Username or email can't contain whitespace");
            }


            resolve(flag);
        } catch (error) {
            console.log(error?.message);
            setErr(error?.message);
            resolve(false);
        }
    })
}