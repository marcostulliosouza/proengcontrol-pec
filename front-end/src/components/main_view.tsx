export const MainView = (props) => {
    return (
        <div className="bg-cinza-light h-[70vh] rounded-md drop-shadow">
            {props.children}
        </div>
    )
}