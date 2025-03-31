const InfoBox = ({ children }) => {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-[70%] p-6 bg-[#D9D5CA] rounded-lg shadow-lg text-center">
                {children}
            </div>
        </div>
    );
};

export default InfoBox;