import { useNavigate } from "react-router-dom";

function NextButton({ to, children }) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(to)}
            className="cursor-pointer px-6 py-3 bg-[#264653] text-white font-semibold rounded-lg shadow-md hover:bg-[#1e3d46] transition"
        >
            {children}
        </button>
    );
}

export default NextButton;