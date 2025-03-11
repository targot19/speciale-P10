const TaskContainer = ({ children }) => {

    return (
        <section className="flex flex-col w-[60vw] items-center justify-center border-0.5 border-black-500 gap-5 p-6 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-80">
            {children}
        </section>
    )
}

export default TaskContainer;