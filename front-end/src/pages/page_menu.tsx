// Componentes
import { Sidebar } from '../components/sidebar';
import { BarraPesquisa } from '../components/barra_pesquisa';
import { HelloUser } from '../components/hello_user';
import { MenuButton } from '../components/menu_button';

// Icones
import { BsListColumnsReverse } from "react-icons/bs";
import { PiCircuitry } from "react-icons/pi";
import { BsGraphUpArrow } from "react-icons/bs";
import { SiFlat } from "react-icons/si";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { AiOutlineUnorderedList, AiOutlineFileAdd } from "react-icons/ai";
import { BsBoxArrowInRight, BsBoxArrowRight } from "react-icons/bs";
import { GrHostMaintenance } from "react-icons/gr";
import { FaWpforms } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";

export function Menu() {
    return (
        <div>
            <body>
                <div className="bg-cinza-200 fixed inset-y-0 w-screen" />
                <div className="bg-pec fixed inset-y-0 left-0 w-[200px]">
                    <Sidebar />
                </div>
                <main className='absolute inset-y-0 right-0 w-10/12 grid content-start gap-y-5 p-10'>
                    <BarraPesquisa />
                    <HelloUser user={"usuário"} />
                    <div className="bg-cinza-100 rounded-md drop-shadow grid grid-cols-6 justify-items-center items-start p-10 gap-10">
                        <MenuButton name={"Listar chamados"} link={"/chamados"} icon={BsListColumnsReverse} />
                        <MenuButton name={"Chamado de Engenharia"} link={"/chamados_engenharia"} icon={PiCircuitry} />
                        <MenuButton name={"Relatório de chamados"} link={"/relatorio_chamados"} icon={BsGraphUpArrow} />
                        <MenuButton name={"Enviar Plano de Produção"} link={"/enviar_plano_de_producao"} icon={SiFlat} />
                        <MenuButton name={"Pesquisa de Indicadores"} link={"/pesquisa_de_indicadores"} icon={MdOutlineContentPasteSearch} />
                        <MenuButton name={"Vincular Equipamentos e Produtos"} link={"/vincular_equipamento_produto"} icon={BiLink} />
                        <MenuButton name={"Listar Produtos"} link={"/listar_produtos"} icon={AiOutlineUnorderedList} />
                        <MenuButton name={"Receber Equipamento"} link={"/receber_equipamento"} icon={BsBoxArrowInRight} />
                        <MenuButton name={"Devolver Equipamento"} link={"/devolver_equipamento"} icon={BsBoxArrowRight} />
                        <MenuButton name={"Manutenção Preventiva"} link={"/manutencao_preventiva"} icon={GrHostMaintenance} />
                        <MenuButton name={"Formulários de Manutenção"} link={"/formularios_de_manutencao"} icon={FaWpforms} />
                        <MenuButton name={"Listar Notas Fiscais"} link={"/listar_notas_fiscais"} icon={CgNotes} />
                        <MenuButton name={"Adicionar Nota"} link={"/adicionar_nota"} icon={AiOutlineFileAdd} />
                    </div>
                </main>
            </body>
        </div>
    )
}