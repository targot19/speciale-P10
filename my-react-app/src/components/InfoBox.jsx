const InfoBox = ({ children }) => {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-[40%] min-w-[800px] p-6 bg-[#D9D5CA] rounded-lg shadow-lg text-center">
                {children}
            </div>
        </div>
    );
};

export default InfoBox;