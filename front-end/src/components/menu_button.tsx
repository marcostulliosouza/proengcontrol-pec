import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export function MenuButton({ name, link, icon: Icon }) {
    return (
        <Link to={link}>
            <button 
                type="submit" 
                className="grid justify-items-center items-center w-[100px] h-[100px] bg-cinza-300 rounded">
                    <Icon className="w-7 h-7 text-cinza-500 mt-2" />
                    <p className='text-sm font-semibold'>{name}</p>
            </button>
        </Link>

    )
}