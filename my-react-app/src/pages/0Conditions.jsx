import InfoBox from "../components/InfoBox";
import NextButton from "../components/NextBtn"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSession } from "../context/SessionContext";
import DiscreteSliderMarks from "../components/userinput/Slider";

const Conditions = () => {
    const [selectedLatinSquare, setSelectedLatinSquare] = useState("");
    const navigate = useNavigate();
    const { addConditionToHistory, setSessionId } = useSession();

    const handleLatinSquareSelection = (latinSquare) => {
        setSelectedLatinSquare(latinSquare);
    };

    const handleNext = (event) => {
        event.preventDefault();

        if (!selectedLatinSquare) {
            alert("Choose a Latin Square before proceeding.");
            return;
        } else {
            console.log({ selectedLatinSquare });
            addConditionToHistory(selectedLatinSquare);
            setSessionId();
            navigate("/start"); // Navigate to the next page
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="flex-grow flex items-center justify-center gap-3">
                {["A B D C", "B C A D", "C D B A", "D A C B"].map((latinSquare) => (
                    <button
                        key={latinSquare}
                        onClick={() => handleLatinSquareSelection(latinSquare)}
                        className={`cursor-pointer px-8 py-3 p-4 ${
                            selectedLatinSquare === latinSquare ? "bg-[#1e3d46] text-white" : "bg-[#D9D5CA] text-black"
                        } font-semibold shadow-md hover:bg-[#1e3d46] transition`}
                    >
                        {latinSquare}
                    </button>
                ))}
            </div>
            <div className="mb-10">
                <button
                    onClick={handleNext}
                    className="cursor-pointer px-6 py-3 bg-[#264653] text-white font-semibold rounded-lg shadow-md hover:bg-[#1e3d46] transition"
                >
                    Next
                </button>
            </div>
            <DiscreteSliderMarks />
        </div>
    );
};

export default Conditions;