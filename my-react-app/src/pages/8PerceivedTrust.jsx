import ChatWindow from "../components/chat/ChatWindow";
import PerceivedTrust from "../components/PerceivedTrust";
import musicIcon from "../assets/music.png";
import healthIcon from "../assets/health.png";
import geographyIcon from "../assets/geography.png";
import physicsIcon from "../assets/physics.png";

const PerceivedTrustPage = ({ category, onNext, chatHistory }) => {
    const categoryIcons = {
        health: healthIcon,
        music: musicIcon,
        geography: geographyIcon,
        physics: physicsIcon,
    };

    return (
        <div className="w-screen h-screen flex flex-col px-6 py-4">
            {/* Header Section */}
            <div className="h-1/8 flex justify-between items-center">
                <div className="flex gap-2 items-center justify-center">
                    <img
                        src={categoryIcons[category.toLowerCase()]}
                        alt={`${category} icon`}
                        className="w-[35px] h-[35px]"
                    />
                    <h2 className="text-3xl font-semibold">{category}</h2>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="flex gap-2 h-7/8">
                {/* Left Column: ChatWindow */}
                <div className="w-1/2 h-full">
                    <div style={{ opacity: 0.5 }} className="w-full h-full">
                        <ChatWindow messageHistory={chatHistory} isActive={false} />
                    </div>
                </div>

                {/* Right Column: PerceivedTrust */}
                <div className="w-1/2 h-full flex flex-col gap-8 justify-start overflow-hidden">
                    <PerceivedTrust onNext={onNext} category={category} />
                </div>
            </div>
        </div>
    );
};

export default PerceivedTrustPage;