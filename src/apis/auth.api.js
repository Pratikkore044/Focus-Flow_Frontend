import apiInstance from "./index.api";
import { isAxiosError } from "axios";

const loginUserApi = async ({email,password}) =>{
    try {
        const response= await apiInstance.post('/auth/login',{
            email,
            password
        });
        return [response.data, null];

    } catch (err) {
        if(isAxiosError(err)){
          console.error('Login API error:', err);
                return [null, err.response?.data?.message];
            }
            return [null, "An unexpected error occurred"];
    }

}

const signupUserApi = async ({ fullName, email, password }) => {
  try {
    const response = await apiInstance.post("/user", {
      fullName,
      email,
      password,
    });

    return [response.data, null];
  } catch (err) {
    if (isAxiosError(err)) {
      console.error('Signup API error:', err);
      // console.error(errors.message)
      return [null, err.response?.data?.message];
    }
    return [null, "An unexpected error occurred"];
  }
};


export { loginUserApi, signupUserApi };
