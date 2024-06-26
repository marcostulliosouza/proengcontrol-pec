import { Link } from 'react-router-dom';

interface ButtonProps {
    name: string;
    link: string;
    icon: React.ComponentType<any>;
  }

export function MenuButton({ name, link, icon: Icon }: ButtonProps) {
    return (
        <Link to={link}>
            <button 
                type="submit" 
                className="grid justify-items-center items-center w-[120px] h-[120px] mobile:w-[100px] mobile:h-[100px] bg-cinza-300 rounded text-sm mobile:text-xs text-pec font-bold shadow-md hover:shadow-lg hover:scale-110 transition duration-200">
                    <Icon className="w-7 h-7 mt-2" />
                    <p>{name}</p>
            </button>
        </Link>

    )
}