import React, { useContext } from 'react';
import { FaGoogle } from "react-icons/fa";
import { setAuthToken } from '../../apis/auth';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);

    const handleGoogle = () =>{

        googleSignIn()
        .then(result => {
            const user = result.user;
            console.log(user);
            setAuthToken(user);
       
        })
        .catch(e => console.error(e));

    }
    return (
        <div>
            <p className='text-center font-semibold mt-5'>OR,Login With</p>
            <p className='text-center'>
                <button onClick={handleGoogle} className='btn btn-ghost'><FaGoogle></FaGoogle></button>
            </p>
        </div>
    );
};

export default SocialLogin;