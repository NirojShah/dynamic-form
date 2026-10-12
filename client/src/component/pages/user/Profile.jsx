import React, { useState } from "react";
import userStore from "../../../store/user.store";
import {
  User,
  Mail,
  Building2,
  Lock,
  Eye,
  EyeOff,
  Save,
  IdCardIcon,
} from "lucide-react";
import BackButton from "../../common/BackButton";
import userApis from "../../../utility/user.api";

const Profile = () => {
  const storeName = userStore((state) => state.userName);
  const storeEmail = userStore((state) => state.email);
  const organization = userStore((state) => state.organization);
  const orgId = userStore((state) => state.orgId);

  const [name, setName] = useState(storeName || "");
  const [email, setEmail] = useState(storeEmail || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const handleProfileUpdate = async () => {
    const payload = {};
    if (storeName != name) {
      payload.name = storeName
    }
    if (storeEmail != email) {
      payload.email = email;
    }

    if (!payload.name && !payload.email) {
      return;
    }
    else {
      await userApis.updateProfile(payload);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword && !newPassword) {
      return;
    }
    await userApis.updatePassword({ curPass: currentPassword, newPass: newPassword });
  };

  return (
    <div className="max-h-screen  bg-[#f5f5f3]">
      <div className="mb-5">
        <BackButton
          path={"/home"}
          title={"Home"}
          key={"profile"}
        />
      </div>

      <div className="max-w-5xl  mx-auto flex flex-col gap-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-[#0E0F0C]">
            Profile Settings
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your account and security settings
          </p>
        </div>

        {/* USER + ORG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* USER DETAILS */}
          <div className="bg-white rounded-2xl border border-black/10 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#9FE870]/20 flex items-center justify-center">
                <User
                  size={20}
                  className="text-[#163300]"
                />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  Personal Information
                </h2>

                <p className="text-xs text-gray-500">
                  Update your profile details
                </p>
              </div>
            </div>

            <div className="space-y-4">

              {/* NAME */}
              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className=" w-full pl-10 pr-4 py-3 border border-black/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#9FE870] bg-white
                    "
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className=" w-full pl-10 pr-4 py-3 border border-black/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#9FE870] bg-white
                    "
                  />
                </div>
              </div>

              {/* SAVE PROFILE */}
              <button
                onClick={handleProfileUpdate}
                className=" mt-2 flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9FE870] text-[#163300] font-medium hover:opacity-90 transition
                "
              >
                <Save size={16} />
                Save Profile
              </button>
            </div>
          </div>

          {/* ORGANIZATION */}
          <div className="bg-white rounded-2xl border border-black/10 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-cyan-100 flex items-center justify-center">
                <Building2
                  size={20}
                  className="text-cyan-700"
                />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  Organization
                </h2>

                <p className="text-xs text-gray-500">
                  Your organization details
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-2 block">
                Organization Name
              </label>

              <div className="flex items-center gap-3 border border-black/10 rounded-xl px-4 py-3 bg-[#fafaf9]">
                <Building2
                  size={16}
                  className="text-gray-400"
                />

                <span className="text-sm text-[#0E0F0C]">
                  {organization || "-"}
                </span>
              </div>

              <label className="text-xs text-gray-500 mb-2 block">
                Organization Id
              </label>

              <div className="flex items-center gap-3 border border-black/10 rounded-xl px-4 py-3 bg-[#fafaf9]">
                <IdCardIcon
                  size={16}
                  className="text-gray-400"
                />

                <span className="text-sm text-[#0E0F0C]">
                  {orgId || "-"}
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Organization details are managed by administrators.
              </p>
            </div>
          </div>
        </div>

        {/* PASSWORD SECTION */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
              <Lock
                size={20}
                className="text-orange-600"
              />
            </div>

            <div>
              <h2 className="font-semibold text-lg">
                Security
              </h2>

              <p className="text-xs text-gray-500">
                Update your password securely
              </p>
            </div>
          </div>

          <div className="max-w-md space-y-4">

            {/* CURRENT PASSWORD */}
            <div>
              <label className="text-xs text-gray-500 mb-2 block">
                Current Password
              </label>

              <div className="relative">
                <input
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter current password"
                  className=" w-full border border-black/10 rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#9FE870]
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      !showCurrentPassword
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label className="text-xs text-gray-500 mb-2 block">
                New Password
              </label>

              <div className="relative">
                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter new password"
                  className=" w-full border border-black/10 rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#9FE870]
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }
                  className=" absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                  "
                >
                  {showNewPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* PASSWORD BUTTON */}
            <button
              onClick={handlePasswordUpdate}
              className=" mt-2 px-5 py-3 rounded-xl border border-black/10 bg-white text-[#0E0F0C] font-medium hover:bg-black/3 transition
              "
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;