import InfoBox from "../components/InfoBox";
import ButtonContainer from "../components/ButtonContainer";
import NextButton from "../components/NextButton";

const CategoryPage = ({ category, onNext }) => {
    return (
        <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center justify-center">
              <div className="flex-col flex p-4 items-center justify-center">
                <InfoBox>
                    <h1 className="text-2xl font-bold">{category}</h1>
                    <p className="mt-4">
                        Here is the category.
                    </p>
                </InfoBox>
            </div>
            <ButtonContainer>
                {/*<BackButton to="/briefing2" />*/}
                <NextButton onClick={onNext}>Continue</NextButton>
            </ButtonContainer>
            
        </div>
    )
}

export default CategoryPage;