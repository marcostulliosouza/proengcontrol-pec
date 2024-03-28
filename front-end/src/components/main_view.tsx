export const MainView = (props) => {
    return (
        <div className="bg-cinza-light w-9/12 h-[70vh] absolute bottom-14 right-14 rounded-md drop-shadow">
            {props.children}
        </div>
    )
}