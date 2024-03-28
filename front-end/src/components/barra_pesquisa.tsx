import { BsSearch } from "react-icons/bs";

export const BarraPesquisa = (props) => {
    return (
        <div className="flex items-center h-10 rounded-md bg-cinza-dark drop-shadow">
            <BsSearch className="mx-4"/>
            <input className='bg-cinza-dark indent-1 w-11/12 outline-none align-middle'
                type="text"
                placeholder='Pesquisar'
            />
            {props.children}
        </div>
    )
}