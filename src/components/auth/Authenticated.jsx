import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ErrorMessage from '../common/ErrorMessage';


const Authenticated = ({ children }) => {

    const authData = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!authData?.authToken) {
            navigate('/login');
        }
    }, [authData?.authToken, navigate]);

    if (authData?.authToken) {
        return <>{children}</>;
    }

    return 
    (

        <ErrorMessage/>
    // <div className='flex w-screen h-screen flex-col justify-center items-center'>
    //     <h3>
    //         You're not Authenticated.
    //         Please login to access this page.
    //     </h3>
    //     <button className='border bg-blue-600 px-4 py-1 text-white rounded-md' onClick={() => navigate('/login')}>Login</button>
    // </div>
)}

export default Authenticated

