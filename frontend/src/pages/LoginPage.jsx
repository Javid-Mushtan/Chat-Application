import {useAuthStore} from "../store/useAuthStore.js";

const LoginPage = () => {
    const { authUser } = useAuthStore();
    return (
        <div>
            login
        </div>
    )
}

export default LoginPage;