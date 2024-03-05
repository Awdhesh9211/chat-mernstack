import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState(null);


	const { loading, signup } = useSignup();

	const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
		const reader = new FileReader();
        reader.onloadend = () => {
			if (reader.readyState === 2) {
            setImage(reader.result)
			}
        };
        reader.readAsDataURL(imageFile);
    };

	const handleCheckboxChange = (gender) => {
		setGender(gender);
	};



	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(
			fullName,
			username,
			password,
			confirmPassword,
			gender,
			image
		);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>

				<div>
                        {/* Display a preview of the selected image or a placeholder */}
                        {image ? (
                            <img
                                src={image}
                                alt='Profile Preview'
                                className='mt-2 w-20 h-20 rounded-full'
                            />
                        ) : (
                            <div className='mt-2 w-20 h-20 rounded-full bg-gray-300'></div>
                        )}
                        <label className='label'>
                            <span className='text-white  label-text'>Profile Picture</span>
                        </label>
                        <input
                            type='file'
                            accept='image/*'
                            className='w-full h-10'
                            onChange={handleImageChange}
                        />
                    </div>
					<div>
                        <label className='label p-2'>
                            <span className='text-white label-text'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Your Full Name'
                            className='w-full input input-bordered  h-10'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='label p-2 '>
                            <span className='text-white  label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Username'
                            className='w-full input input-bordered h-10'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

					<div>
                        <label className='label'>
                            <span className='text-white  label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-white  label-text'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full input input-bordered h-10'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={gender} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 text-white  mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
