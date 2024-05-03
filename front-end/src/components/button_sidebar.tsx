import { Link } from 'react-router-dom';

export function SidebarButton({ name, link, icon: Icon }) {
    return (
        <Link to={link}>
            <button
                type="submit"
                className="text-sm text-cinza-200 font-bold shadow-md hover:scale-110 transition duration-200 flex items-center gap-2">
                <Icon />{name}
            </button>
        </Link>
    )
}