import React, { useState } from "react";

import {
    Building2,
    Mail,
    Lock,
    User,
    ShieldCheck,
} from "lucide-react";
import userOrgApis from "../../../utility/user-org.api";
import Nav from "../../navigation/Nav";

const UserCreation = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        organizationName: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await userOrgApis.createUserOrg(formData);
        if (resp.success) {
            return;
        }
        return;
    };

    return (
        <div className="flex flex-col h-full overflow-hidden scroll-m-0">
            <Nav />
            <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-6">
                <div className=" max-w-2xl bg-white border border-black/10 rounded-3xl shadow-sm overflow-hidden">

                    {/* TOP */}
                    <div className="px-8 py-7 border-b border-black/10 bg-[#163300]">

                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-11 h-11 rounded-2xl bg-[#9FE870] flex items-center justify-center">
                                <ShieldCheck size={22} className="text-[#163300]" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold text-white">
                                    Create Organization
                                </h1>

                                <p className="text-sm text-white/70">
                                    Create organization and admin access
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-8 space-y-6"
                    >

                        {/* NAME */}
                        <div>
                            <label className="text-sm font-medium text-[#0E0F0C] mb-2 block">
                                Admin Name
                            </label>

                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter admin name"
                                    className="
                                w-full
                                pl-11 pr-4 py-3
                                rounded-xl
                                border border-black/10
                                bg-white
                                outline-none
                                focus:ring-2
                                focus:ring-[#9FE870]
                                text-sm
                                "
                                />
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-medium text-[#0E0F0C] mb-2 block">
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="
                                w-full
                                pl-11 pr-4 py-3
                  rounded-xl
                  border border-black/10
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-[#9FE870]
                  text-sm
                  "
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm font-medium text-[#0E0F0C] mb-2 block">
                                Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className="
                                w-full
                                pl-11 pr-4 py-3
                                rounded-xl
                                border border-black/10
                                bg-white
                                outline-none
                                focus:ring-2
                                focus:ring-[#9FE870]
                                text-sm
                "
                                />
                            </div>
                        </div>

                        {/* ORGANIZATION */}
                        <div>
                            <label className="text-sm font-medium text-[#0E0F0C] mb-2 block">
                                Organization Name
                            </label>

                            <div className="relative">
                                <Building2
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="organizationName"
                                    value={formData.organizationName}
                                    onChange={handleChange}
                                    placeholder="Enter organization name"
                                    className="
                                w-full
                                pl-11 pr-4 py-3
                                rounded-xl
                                border border-black/10
                                bg-white
                                outline-none
                  focus:ring-2
                  focus:ring-[#9FE870]
                  text-sm
                  "
                                />
                            </div>
                        </div>

                        {/* INFO */}
                        <div className="rounded-2xl bg-[#163300]/5 border border-[#163300]/10 p-4">
                            <p className="text-sm text-gray-600 leading-6">
                                The created user will become the organization admin
                                and will have permission to manage users, forms,
                                analytics, and organization settings.
                            </p>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="
                        w-full
                        py-3
                        rounded-xl
                        bg-[#9FE870]
                        hover:bg-[#8ed85f]
                        transition
                        text-[#163300]
                        font-semibold
                        text-sm
                        "
                        >
                            Create Organization
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserCreation;