import React, { useEffect, useState } from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import handleFormChange from "../../../utility/utility";
import userApis from "../../../utility/user.api";
import orgApis from "../../../utility/organization.api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organizationId: "",
  });

  // const [organizations, setOrganizations] = useState([]);
  const handleFetchOrganizations = async () => {
    const resp = await orgApis.getAllOrganizations();
    return resp;
  };

  useEffect(() => {
    handleFetchOrganizations();
  }, []);

  const onChange = (e) => {
    setFormData((prev) => handleFormChange(e, prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userApis.signup(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 font-['Inter',sans-serif]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-105 rounded-2xl border border-black/10 bg-white p-8 shadow-sm"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-[-0.03em] text-[#0E0F0C]">
            Sign Up
          </h1>
          <p className="mt-2 text-sm text-[#454745]">
            Enter your details to create your account.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Input
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            className="w-full"
            value={formData.name}
            onChange={onChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full"
            value={formData.email}
            onChange={onChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full"
            value={formData.password}
            onChange={onChange}
          />

          <Input
            label="Organization ID"
            name="organizationId"
            type="text"
            placeholder="Enter organization ID"
            className="w-full"
            value={formData.organizationId}
            onChange={onChange}
          />

          <Button type="submit" variant="primary" className="w-full">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
