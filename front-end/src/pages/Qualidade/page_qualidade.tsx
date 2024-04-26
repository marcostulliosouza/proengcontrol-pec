// Componentes
import { Sidebar } from '../../components/sidebar';
import { BarraPesquisa } from '../../components/barra_pesquisa';
import { HelloUser } from '../../components/hello_user';
import { MenuButton } from '../../components/button_menu';

export function Qualidade() {
    return (
        <>
            <body>
                <div className="bg-cinza-200 fixed inset-y-0 w-screen" />
                <div className="bg-pec fixed inset-y-0 left-0 w-[200px]">
                    <Sidebar />
                </div>
                <main className='absolute inset-y-0 right-0 w-10/12 grid content-start gap-y-5 p-10'>
                    <BarraPesquisa />
                    <HelloUser pagina={'Qualidade'} user={localStorage.getItem("user")} />
                    <div className="bg-cinza-100 rounded-md drop-shadow grid grid-cols-6 justify-items-center items-start p-10 gap-10">

                    </div>
                </main>
            </body>
        </>
    )
}