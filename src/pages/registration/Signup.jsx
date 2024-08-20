import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const[name, setName]= useState('');
    const[email, setEmail]= useState('');
    const[password, setPassword]= useState('');

    const context= useContext(myContext);
    const {loading, setLoading}= context;

    const signup =async()=>{
       
        if (name ==="" || email ==="" || password ==="") {
            return toast.error("All fields are required")
        }
        try {
          setLoading(true);
          const users = await createUserWithEmailAndPassword(auth, email, password)
          console.log(users) 


          const user ={
            name: name,
            uid: users.user.uid,
            email:users.user.email,
            time:Timestamp.now()
          }

          const userRef = collection(fireDB,"users")// creating users in firebase
          await addDoc(userRef, user)// storing user in firebase
          toast.success("Signup Succesfully")
          setName('');
          setEmail('');
          setPassword('');
          setLoading(false);
        } catch (error) {
            console.log(error)
            toast.error("Signup Failed")
            setLoading(false);
        }
    } 
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            {loading && <Loader/>}
            <div className='bg-gray-800 p-10 rounded-xl shadow-lg'>
                <h1 className='text-center text-white text-2xl mb-6 font-extrabold'>Signup</h1>
                <div className='mb-6'>
                <input
                        type='text'
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        name='name'
                        className='bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 outline-none'
                        placeholder='Name'
                    />
                    <input
                        type='email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        name='email'
                        className='bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 outline-none'
                        placeholder='Email'
                    />
                    <input
                        type='password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        name='password'
                        className='bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className='flex justify-center mb-6'>
                    <button
                    onClick={signup}
                        className='bg-red-500 w-full py-3 rounded-lg text-white font-bold hover:bg-red-600 transition-colors'>
                        Signup
                    </button>
                </div>
                <div className='text-center'>
                    <p className='text-gray-400'>
                        Have an account? <Link className='text-red-500 font-bold hover:underline' to='/login'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
