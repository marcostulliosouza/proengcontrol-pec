import { useState } from 'react';
import { Link } from 'react-router-dom';
// Componentes
import { Sidebar } from '../../components/sidebar';
import { BarraPesquisa } from '../../components/barra_pesquisa';
import { HelloUser } from '../../components/hello_user';
import { MenuButton } from '../../components/button_menu';
import logo from "../../assets/icon_pec.svg"

// Icones
import { IoMenu } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { CiViewBoard } from "react-icons/ci";
import { LuUsers2 } from "react-icons/lu";
import { BsListColumnsReverse } from "react-icons/bs";
import { PiCircuitry } from "react-icons/pi";
import { BsGraphUpArrow } from "react-icons/bs";
import { TbTableImport } from "react-icons/tb";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { AiOutlineUnorderedList, AiOutlineFileAdd } from "react-icons/ai";
import { BsBoxArrowInRight, BsBoxArrowRight } from "react-icons/bs";
import { GrHostMaintenance } from "react-icons/gr";
import { FaWpforms } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";

export function MenuEngTestes() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div className="bg-cinza-200 fixed inset-y-0 w-screen" />
            <header className='absolute top-0 left-0 p-10 flex justify-between gap-4 items-start w-screen'>
                <div className='inline-flex items-start gap-4'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                    <div className="grid justify-items-center items-center text-pec font-semibold">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="PEC" />
                            <h1 className='text-xl'>PEC</h1>
                        </div>
                        <p className='text-sm'>ProEngControl</p>
                    </div>
                    <div className='flex flex-col ml-8 mt-3 gap-3'>
                    <div className='inline-flex items-center gap-2 content font-bold text-pec'>
                            <Link to={"/menu"} className='inline-flex items-center gap-2'>
                                <FaHome />
                                <p>Menu</p>
                            </Link>
                            <IoIosArrowForward />
                            <p>Engenharia de Testes</p>
                        </div>
                        <HelloUser user={localStorage.getItem("user")} />
                    </div>
                </div>
                <BarraPesquisa />
            </header>
            <body className='w-screen grid content-start gap-y-5 p-10 mt-24'>
                <div className="bg-cinza-100 rounded-md drop-shadow grid grid-cols-6 justify-items-center items-start p-10 gap-10">
                    <MenuButton name={"Visualizar chamados"} link={"/engenharia_testes/visualizar_chamados"} icon={CiViewBoard} />
                    <MenuButton name={"Abrir chamado"} link={"/engenharia_testes/abrir_chamado"} icon={LuUsers2} />
                    <MenuButton name={"Atendimento de chamado"} link={"/engenharia_testes/chamados"} icon={BsListColumnsReverse} />
                        {/*                     
                        <MenuButton name={"Chamado de Engenharia"} link={"/engenharia_testes/chamados_engenharia"} icon={PiCircuitry} />
                        <MenuButton name={"Relatório de chamados"} link={"/engenharia_testes/relatorio_chamados"} icon={BsGraphUpArrow} />
                        <MenuButton name={"Enviar Plano de Produção"} link={"/engenharia_testes/enviar_plano_de_producao"} icon={TbTableImport} />
                        <MenuButton name={"Pesquisa de Indicadores"} link={"/engenharia_testes/pesquisa_de_indicadores"} icon={MdOutlineContentPasteSearch} />
                        <MenuButton name={"Vincular Equipamentos e Produtos"} link={"/engenharia_testes/vincular_equipamento_produto"} icon={BiLink} />
                        <MenuButton name={"Listar Produtos"} link={"/engenharia_testes/listar_produtos"} icon={AiOutlineUnorderedList} />
                        <MenuButton name={"Receber Equipamento"} link={"/engenharia_testes/receber_equipamento"} icon={BsBoxArrowInRight} />
                        <MenuButton name={"Devolver Equipamento"} link={"/engenharia_testes/devolver_equipamento"} icon={BsBoxArrowRight} />
                        <MenuButton name={"Manutenção Preventiva"} link={"/engenharia_testes/manutencao_preventiva"} icon={GrHostMaintenance} />
                        <MenuButton name={"Formulários de Manutenção"} link={"/engenharia_testes/formularios_de_manutencao"} icon={FaWpforms} />
                        <MenuButton name={"Listar Notas Fiscais"} link={"/engenharia_testes/listar_notas_fiscais"} icon={CgNotes} />
                        <MenuButton name={"Adicionar Nota"} link={"/engenharia_testes/adicionar_nota"} icon={AiOutlineFileAdd} /> */}
                </div>
            </body>

            {showSidebar && (
                <div className='backdrop-blur-xs fixed inset-y-0 w-screen z-50'>
                    <Sidebar />
                    <button
                        onClick={() => setShowSidebar(false)}
                        className='absolute top-10 left-10 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )}
        </>
    )
}