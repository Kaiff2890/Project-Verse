/** @format */

import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Login, Profile, Register, ResetPassword, EntryPage, Business } from "./pages";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Premium from "./pages/Premium";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import ChatBot from "./pages/ChatBot";
import ProjectUpload from "./pages/ProjectUpload";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function Layout() {
	// const { user } = useSelector((state) => state.user);
	const user = localStorage.getItem("user");
	const location = useLocation();
	const userData = JSON.parse(user);

	return userData?.token ?
			<Outlet />
		:	<Navigate
				to="/projectverse"
				state={{ from: location }}
				replace
			/>;
}

function App() {
	const { theme } = useSelector((state) => state.theme);

	return (
		<div
			data-theme={theme}
			className="w-full min-h-[100vh]">
			<Routes>
				<Route element={<Layout />}>
					<Route
						path="/"
						element={<Home />}
					/>

					<Route
						path="/profile/:id?"
						element={<Profile />}
					/>
					<Route
						path="/chat/:id?"
						element={<Chat />}
					/>
					<Route
						path="/premium"
						element={<Premium />}
					/>
					<Route
						path="/projects"
						element={<Projects />}
					/>
					<Route
						path="/helpdesk"
						element={<ChatBot />}
					/>
					<Route
						path="/projects/:id"
						element={<ProjectDetails />}
					/>
					<Route
						path="/project-upload"
						element={<ProjectUpload />}
					/>
					<Route
						path="/business"
						element={<Business />}
					/>
				</Route>

				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/reset-password"
					element={<ResetPassword />}
				/>
				<Route
					path="/projectverse"
					element={<EntryPage />}
				/>
				<Route
					path="/dashboard"
					element={<Dashboard />}
				/>
				<Route
					path="/admin"
					element={<AdminDashboard />}
				/>
				<Route
					path="/admin-login"
					element={<AdminLogin />}
				/>
			</Routes>
		</div>
	);
}

export default App;

