import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser:null,
    usSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("/check");
            set({authUser:res.data});
        } catch(error) {
            set({authUser:null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            return true;
        } catch(error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }

    }
}));