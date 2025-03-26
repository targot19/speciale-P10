const UserMessage = ({ children }) => {
    return(
    <div className="p-2 flex flex-row justify-end w-full">
        <p className="bg-[#b08f2b] text-white rounded max-w-2/5 p-5">{children}</p>
    </div>
    )
}

export default UserMessage