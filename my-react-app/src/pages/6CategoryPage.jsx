import InfoBox from "../components/InfoBox";
import ButtonContainer from "../components/ButtonContainer";
import BackButton from "../components/BackBtn";
import NextButton from "../components/NextBtn";
import musicIcon from "../assets/music.png";
import healthIcon from "../assets/health.png";
import geographyIcon from "../assets/geography.png";
import physicsIcon from "../assets/physics.png"


const CategoryPage = ({ category, onNext }) => {

    const categoryIcons = {
        health: healthIcon,
        music: musicIcon,
        geography: geographyIcon,
        physics: physicsIcon,
      };

    return (
        <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center justify-center">
                <InfoBox>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <img
                            src={categoryIcons[category.toLowerCase()]}
                            alt={`${category} icon`}
                            className="w-[120px] h-[120px]"
                        />
                        <h1 className="text-2xl font-bold">{category}</h1>
                    </div>
                </InfoBox>
            <ButtonContainer>
                {/*<BackButton to="/briefing2" />*/}
                <NextButton onClick={onNext}>Continue</NextButton>
            </ButtonContainer>
            
        </div>
    )
}

export default CategoryPage;