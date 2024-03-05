import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

const Home = lazy(() => import('./pages/home/Home'));
const Login = lazy(() => import('./pages/login/Login'));
const SignUp = lazy(() => import('./pages/signup/SignUp'));

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
            <Suspense fallback={<div>Loading...</div>}>
            <Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			</Suspense>
			<Toaster />
		</div>
	);
}

export default App;
