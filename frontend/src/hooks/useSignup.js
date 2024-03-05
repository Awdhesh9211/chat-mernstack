import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ( fullName, username, password, confirmPassword, gender,image ) => {
	    console.log( { fullName, username, password, confirmPassword, gender,image });
		const success = handleInputErrors(fullName, username, password, confirmPassword, gender,image );
		if (!success) return;

		setLoading(true);
		try {
			const response = await axios.post("api/auth/signup",{
				fullName, 
				username, 
				password, 
				confirmPassword, 
				gender,
				image
			});
			const data = response.data;
			if (data.error) {
				throw new Error(data.error);
			}
			console.log(data);
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

export default useSignup;

function handleInputErrors( fullName, username, password, confirmPassword, gender ,image) {
	if (!fullName || !username || !password || !confirmPassword || !gender || !image) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}
