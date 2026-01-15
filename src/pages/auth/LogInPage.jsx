import React from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUserApi } from '../../apis/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuth } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';
import { Modal } from "flowbite-react";
import { closeLogin, openSignup } from '../../store/slices/modalSlice';

const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.loginOpen);
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: ''
  });

  const handleInputChange = (value, key) => {
    setCredentials((prev) => ({
      ...prev,
      [key]: value
    })
    )
  }

  console.log(credentials);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const [data, error] = await loginUserApi({
        email: credentials.email,
        password: credentials.password,
      });

      console.log(credentials.email, credentials.password);

      if (error || !data) {
        toast.error(error || "Login failed");
        setCredentials({
          email: '',
          password: ''
        })
        return;
      }

      toast.success("Login successful");
      console.log('Login successful:', data);
      const token = data.data.token;
      
      localStorage.setItem("token", token);
      setCredentials({
          email: '',
          password: ''
        })
      dispatch(closeLogin());
      navigate("/mytodos");

      dispatch(updateAuth({
        token: token,
        email: credentials.email,
        
      }));

      
    } catch (error) {
      alert("Invalid1 credentials");
    }
  };


  return (
    <Modal
      show={open}
      size="lg"
      popup
      onClose={() => dispatch(closeLogin())}
    >

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-6 sm:p-8">
              <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                <span>Sign in to your account</span>

                <svg
                  className="w-6 h-6 cursor-pointer text-gray-800 hover:text-gray-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={() => dispatch(closeLogin())}
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 18 6M18 18 6 6"
                  />
                </svg>
              </h1>



              
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
               
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@gmail.com"
                    value={credentials.email}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "email")
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

               
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "password")
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>

                
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <span onClick={() => {
                    dispatch(closeLogin());
                    dispatch(openSignup());
                  }} className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                    Sign up
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  )
}

export default LoginPage