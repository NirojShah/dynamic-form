import React, { useEffect, useState } from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import handleFormChange from "../../../utility/utility";
import userApis from "../../../utility/user.api";
import { useNavigate } from "react-router-dom";
import userStore from "../../../store/user.store";

const Login = ({ setAuthorization }) => {
    const navigate = useNavigate();
    const userName = userStore((store) => store.userName);

    useEffect(() => {
        if(userName == ""){
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
        setFormData((prev) => handleFormChange(e, prev));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await userApis.login(formData);
        if (resp.success) {
            setAuthorization(true)
            navigate("/");
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-indigo-50 via-white to-cyan-50 px-4 font-['Inter',sans-serif]">

            {/* Grid Background */}
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[42px_42px]"></div>

            {/* Blur Glow */}
            <div className="absolute -left-30 -top-30 h-75 w-75 rounded-full bg-indigo-300/30 blur-3xl"></div>

            <div className="absolute -right-30 -bottom-30 h-75 w-75 rounded-full bg-cyan-300/30 blur-3xl"></div>

            {/* Floating Form Card 1 */}
            <div className="absolute left-10 top-20 hidden md:block rotate-[-10deg] rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur-sm opacity-80">
                <div className="mb-3 h-8 w-48 rounded bg-indigo-300"></div>

                <div className="mb-2 h-15 w-85 rounded bg-slate-200"></div>
                <div className="mb-2 h-15 w-100 rounded bg-slate-200"></div>

                <div className="mt-4 h-8 w-24 rounded-lg bg-indigo-100"></div>
            </div>

            {/* Floating Form Card 2 */}
            <div className="absolute right-12 bottom-20 hidden md:block rotate-10 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur-sm opacity-80">
                <div className="mb-3 h-3 w-24 rounded bg-cyan-300"></div>

                <div className="mb-2 h-10 w-60 rounded bg-slate-200"></div>
                <div className="mb-2 h-10 w-75 rounded bg-slate-200"></div>

                <div className="mt-4 h-8 w-20 rounded-lg bg-cyan-100"></div>
            </div>

            {/* Main Login Card */}
            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-107.5 rounded-3xl border border-white/60 bg-white/85 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            >
                <div className="mb-8 text-center">
                    {/* <div className="mb-3 inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
                        Dynamic Forms Platform
                    </div> */}

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Build forms, share links, and collect responses.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={onChange}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={onChange}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;