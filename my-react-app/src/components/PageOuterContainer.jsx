const PageOuterContainer = ({ children }) => {

    return (
        <section className="flex flex-col w-[85vw] max-w-[1200px] items-center justify-center border-2 border-purple-500 gap-5">
            {children}
        </section>
    )
}

export default PageOuterContainer;