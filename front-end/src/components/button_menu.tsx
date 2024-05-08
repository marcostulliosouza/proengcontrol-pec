import { Link } from 'react-router-dom';

export function MenuButton({ name, link, icon: Icon }) {
    return (
        <Link to={link}>
            <button 
                type="submit" 
                className="grid justify-items-center items-center w-[100px] h-[100px] bg-cinza-300 rounded text-sm text-pec font-bold shadow-md hover:shadow-lg hover:scale-110 transition duration-200">
                    <Icon className="w-7 h-7 mt-2" />
                    <p>{name}</p>
            </button>
        </Link>

    )
}