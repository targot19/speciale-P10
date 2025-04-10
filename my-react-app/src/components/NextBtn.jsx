import { useNavigate } from "react-router-dom";

function NextButton({ to, children, onClick }) {
    const navigate = useNavigate();
    const handleClick = () => {
        if (to) navigate(to); // Navigate to the specified route if 'to' is provided
        if (onClick) onClick(); // Call the onClick function if provided
    };

    return (
        <button
            onClick={handleClick}
            className="cursor-pointer px-6 py-3 bg-[#264653] text-white font-semibold rounded-lg shadow-md hover:bg-[#1e3d46] transition"
        >
            {children}
        </button>
    );
}

export default NextButton;