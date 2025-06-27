import {useAuthStore} from "../store/useAuthStore.js";

const HomePage = () => {
    const { authUser } = useAuthStore();
    return (
        <div>
            home
        </div>
    )
}

export default HomePage;