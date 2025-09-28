import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import AuthRouteLayout from "./components/customUi/AuthLayout";
import ProtectedRouteLayout from "./components/customUi/ProtectedRouteLayout";
import EmailSent from "./pages/EmailSent";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ViewUsers from "./pages/ViewUsers";
import Signin from "./SignIn";
import Signup from "./SignUp";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Navigate to='home' />} />

                    <Route element={<ProtectedRouteLayout />}>
                        <Route path='home' element={<Home />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='users' element={<ViewUsers />} />
                    </Route>

                    <Route element={<AuthRouteLayout />}>
                        <Route path='signin' element={<Signin />} />
                        <Route path='signup' element={<Signup />} />
                        <Route path='email-sent' element={<EmailSent />} />
                    </Route>
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
