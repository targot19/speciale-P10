const ButtonContainer = ({ children }) => {
    
    return (
        <div className="flex gap-10 w-[20vw] items-center justify-center border-1 border-black-500 rounded-lg">
            {children}
        </div>
    )
}

export default ButtonContainer;