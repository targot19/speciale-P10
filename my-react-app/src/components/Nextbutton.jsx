function NextButton({ onClick }) {
    return (
        <button onClick={onClick} className="cursor-pointer px-6 py-3 bg-[#264653] text-white font-semibold rounded-lg shadow-md hover:bg-[#1e3d46] transition">
            Next
        </button>
    );
}

export default NextButton;