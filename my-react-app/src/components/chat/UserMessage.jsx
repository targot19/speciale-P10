const UserMessage = ({ children }) => {
    return(
    <div className="p-4 flex flex-row justify-start w-full">
        <p className="bg-[#b08f2b] text-white rounded w-2/5 p-5">{children}</p>
    </div>
    )
}

export default UserMessage