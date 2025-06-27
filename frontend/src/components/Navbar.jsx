import {useAuthStore} from "../store/useAuthStore.js";

const Navbar = () => {
    const { authUser } = useAuthStore();

    return (
        <div>
            navbar
        </div>
    )
}

export default Navbar;