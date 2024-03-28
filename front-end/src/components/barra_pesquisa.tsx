import { BsSearch } from "react-icons/bs";

export const BarraPesquisa = (props) => {
    return (
        <div className="flex items-center h-10 rounded-md bg-cinza-300 drop-shadow">
            <BsSearch className="mx-4 opacity-70"/>
            <input className='bg-cinza-300 indent-1 w-11/12 outline-none align-middle'
                type="text"
                placeholder='Pesquisar'
            />
            {props.children}
        </div>
    )
}