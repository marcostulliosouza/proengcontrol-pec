import { Link } from 'react-router-dom';

interface ButtonProps {
    name: string;
    link: string;
    icon: React.ComponentType;
  }

export function SidebarButton({ name, link, icon: Icon }: ButtonProps) {
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