import PageOuterContainer from "../components/PageOuterContainer";

const Landing = () => {
    return (
        <PageOuterContainer>
            <h1>Landing page</h1>
            <div className="button-container">
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">Start</button>
                <button className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition">Start</button>
            </div>
        </PageOuterContainer>
    )
}

export default Landing;