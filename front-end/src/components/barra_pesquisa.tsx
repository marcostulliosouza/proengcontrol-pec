import { BsSearch } from "react-icons/bs";

export function BarraPesquisa() {
    return (
        <div className="flex items-center flex-1 gap-2 px-4 w-9/12 h-10 absolute top-10 right-14 rounded-md bg-cinza-dark drop-shadow">
            <BsSearch/>
            <input className='bg-cinza-dark indent-1 w-11/12'
                type="text"
                placeholder='Pesquisar'
            />
        </div>
    )
}