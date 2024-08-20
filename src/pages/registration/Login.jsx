import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase/FirebaseConfig'
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Login() {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const context = useContext(myContext)
    const {loading, setLoading} = context;

    const navigate = useNavigate();
 
    const login =async () =>{
        setLoading(true)
     try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
     })
        localStorage.setItem('user', JSON.stringify(result))
        navigate('/')
        setLoading(false)


     } catch (error) {
        console.log(error)
        toast.error('Sigin Failed', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        setLoading(false)
     }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-r from-gray-800 to-gray-900'>
            {loading && <Loader/>}
            <div className='bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-sm w-full'>
                <div className='mb-8'>
                    <h1 className='text-center text-white text-3xl mb-6 font-bold'>Login</h1>
                </div>
                <div className='mb-6'>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        name='email'
                        className='bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300'
                        placeholder='Email'
                    />
                </div>
                <div className='mb-8'>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className='bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300'
                        placeholder='Password'
                    />
                </div>
                <div className='flex justify-center mb-6'>
                    <button
                    onClick={login}
                        className='bg-yellow-500 w-full text-black font-bold px-4 py-3 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md'>
                        Login
                    </button>
                </div>
                <div className='text-center'>
                    <h2 className='text-white'>Don't have an account? 
                        <Link className='text-yellow-500 font-bold hover:text-yellow-600 transition duration-300' to={'/signup'}> Signup</Link>
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Login;
