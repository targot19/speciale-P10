import InfoBox from "../components/InfoBox";
import ButtonContainer from "../components/ButtonContainer";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";

const CategoryPage = () => {
    return (
        <div className="bg-[#F4F4F4] min-h-screen flex flex-col items-center justify-center">
              <div className="flex-col flex p-4 items-center justify-center">
                <InfoBox>
                    <h1 className="text-2xl font-bold">Category Name</h1>
                    <p className="mt-4">
                        Here is the category.
                    </p>
                </InfoBox>
            </div>
            <ButtonContainer>
                <BackButton to="/briefing2" />
                <NextButton to="/experimentsection">Next</NextButton>
            </ButtonContainer>
            
        </div>
    )
}

export default CategoryPage;