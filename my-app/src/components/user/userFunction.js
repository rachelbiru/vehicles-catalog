import axios from 'axios';

export const registered = newUser => {
    return axios
        .post('users/register', {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        })
        .then(res => {
            console.log(newUser, 'Registerd!!!');
            console.log(res)
            
        }).catch(()=>{
            console.log('some erorr')
        })
}


export const login = (User) => {
    
    return axios
        .post('users/login', {
            email: User.email,
            password: User.password,
        })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        })
}