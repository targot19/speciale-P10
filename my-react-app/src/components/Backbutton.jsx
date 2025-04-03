import { useNavigate } from "react-router-dom";

function BackButton({ to }) {
    const navigate = useNavigate();

    return (
        <button 
            className="cursor-pointer px-6 py-3 bg-[#264653] text-white font-semibold rounded-lg shadow-md hover:bg-[#1e3d46] transition"
            onClick={() => navigate(to)}
        >
            Back
        </button>
    );
}

export default BackButton;