import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import AuthRouteLayout from "./components/customUi/AuthLayout";
import ProtectedRouteLayout from "./components/customUi/ProtectedRouteLayout";
import RoleGuard from "./components/customUi/RoleGuard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Unauthorized from "./pages/Unauthorized";
import VerificationEmailSent from "./pages/VerificationEmailSent";
import ViewUsers from "./pages/ViewUsers";
// import Signup from "./SignUp";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            throwOnError: (error: any) => error.response?.status >= 500,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Navigate to='home' />} />

                    {/* for authenticated users */}
                    <Route element={<ProtectedRouteLayout />}>
                        <Route path='home' element={<Home />} />
                        <Route path='profile' element={<Profile />} />

                        {/* admin and mod only routes */}
                        <Route
                            element={
                                <RoleGuard
                                    allowedRoles={[
                                        "ADMIN",
                                        "MODERATOR",
                                        "SUPER_ADMIN",
                                    ]}
                                />
                            }>
                            <Route path='users' element={<ViewUsers />} />
                        </Route>

                        <Route
                            element={
                                <RoleGuard
                                    allowedRoles={["ADMIN", "SUPER_ADMIN"]}
                                />
                            }>
                            <Route path='settings' element={<Settings />} />
                        </Route>
                    </Route>

                    {/* for non-authenticated users  */}
                    <Route element={<AuthRouteLayout />}>
                        <Route path='signin' element={<Signin />} />
                        <Route path='signup' element={<Signup />} />
                        <Route
                            path='email-verification-sent'
                            element={<VerificationEmailSent />}
                        />
                    </Route>

                    <Route path='unauthorized' element={<Unauthorized />} />
                </Routes>

                <Toaster
                    position='top-center'
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "#1a1a1a",
                            color: "#fff",
                        },
                    }}
                />
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
