import { create } from "zustand";

const userStore = create((set) => ({
  userName: "",
  email: "",
  organization: "",
  orgId: null,

  setUser: (user) =>
    set(() => ({
      userName: user.userName,
      email: user.email,
      organization: user.organization,
      orgId: user.orgId,
    })),
}));

export default userStore;
