import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal } from "flowbite-react";
import { signupUserApi } from "../../apis/auth.api";
import { closeSignup } from "../../store/slices/modalSlice";
import { openLogin } from "../../store/slices/modalSlice";
import { updateAuth } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = useSelector((state) => state.modal.signupOpen);

    const [credentials, setCredentials] = React.useState({
        email: "",
        fullName: "",
        password: "",
    });

    const handleInputChange = (value, key) => {
        setCredentials((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const [response, error] = await signupUserApi({
            email: credentials.email.trim(), 
                fullName: credentials.fullName.trim(),
                password: credentials.password,
        });

            if (error || !response) {
                toast.error(error || "Signup failed");
                return;
            }

            const token = response.data?.token;

        if (!token) {

            toast.error("Invalid signup response");
            return;
        }
        
        localStorage.setItem("token", token);
            

            dispatch(updateAuth({
                email: credentials.email,
                fullName: credentials.fullName,
                token,
            }));
            
            toast.success("Account created successfully");
            console.log('Signup successful:', response);
            
            setCredentials({
                email: "",
                fullName: "",
                password: "",
            });

            dispatch(closeSignup());
            navigate("/mytodos");

        }catch (err) {
    if (isAxiosError(err)) {
        console.log("Signup API error response:", err.response?.data);
        return [null, err.response?.data?.message || "Signup failed"];
    }
       
    return [null, "An unexpected error occurred"];
}
    };

    return (
        <Modal
            show={open}
            size="lg"
            popup
            onClose={() => dispatch(closeSignup())}
        >
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex min-h-screen flex-col items-center justify-center px-6 py-8 mx-auto">
                    <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-6 sm:p-8">
                            <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            <span> Create your account</span>
                                            <svg
                                              className="w-6 h-6 cursor-pointer text-gray-800 hover:text-gray-600 dark:text-white"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              onClick={() => dispatch(closeSignup())}
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

                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSignup}
                            >
                                
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={credentials.fullName}
                                        onChange={(e) =>
                                            handleInputChange(e.target.value, "fullName")
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>

                                
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="name@gmail.com"
                                        value={credentials.email}
                                        onChange={(e) =>
                                            handleInputChange(e.target.value, "email")
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>

                                
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={credentials.password}
                                        onChange={(e) =>
                                            handleInputChange(e.target.value, "password")
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>

                               
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Create account
                                </button>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <span onClick={() => {
                                        dispatch(closeSignup());
                                        dispatch(openLogin());
                                    }} className="text-primary-600 hover:underline cursor-pointer">
                                        Sign in
                                    </span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Modal>
    );
};

export default SignUpPage;
