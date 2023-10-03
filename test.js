const a = [1,2,3];


const add =(num)=>{
    return new Promise((resolve,reject)=>{
        resolve(num[1]+num[2]);
    })
}



const xyz = async () => {
    add(a).then((c)=>{
        console.log(c);
    })

    
}


xyz();