export const MainView = (props) => {
    return (
        <div className="bg-cinza-100 h-[70vh] rounded-md drop-shadow">
            {props.children}
        </div>
    )
}