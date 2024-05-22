import { useState } from 'react';
import { Link } from 'react-router-dom';
// Componentes
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { MenuButton } from '../../components/button_menu';
import { Logo } from '../../components/logo';

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
            <header className="grid grid-rows-1 bg-cinza-200">
                <div className='inline-flex p-5 gap-4'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200 flex justify-start items-start'>
                        <IoMenu />
                    </button>
                    <Logo />
                    <div className='flex-col-1 ml-8 mt-4'>
                        <div className='inline-flex content font-bold text-pec gap-2 justify-center items-center'>
                            <Link to={"/menu"} className='inline-flex items-center gap-2'>
                                <FaHome className='mobile:w-0' />
                                <p className='mobile:text-[0px]'>Menu</p>
                            </Link>
                            <IoIosArrowForward className='mobile:w-0' />
                            <p>Engenharia de Testes</p>
                        </div>
                        <HelloUser />
                    </div>
                </div>
            </header>
            <body className='bg-cinza-200 w-screen h-screen px-5'>
                <div className="bg-cinza-100 rounded-md drop-shadow grid mobile:grid-cols-2 sm:grid-cols-5 grid-cols-6 justify-items-center p-10 gap-10">
                    <MenuButton name={"Visualizar chamados"} link={"/engenharia_testes/visualizar_chamados"} icon={CiViewBoard} />
                    <MenuButton name={"Abrir chamado"} link={"/engenharia_testes/abrir_chamado"} icon={LuUsers2} />
                    <MenuButton name={"Atendimento de chamado"} link={"/engenharia_testes/chamados"} icon={BsListColumnsReverse} />
                    {/* <MenuButton name={"Chamado de Engenharia"} link={"/engenharia_testes/chamados_engenharia"} icon={PiCircuitry} />
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
                        className='absolute top-5 left-5 text-cinza-200 text-4xl hover:scale-110 transition duration-200'
                    >
                        <IoMenu />
                    </button>
                </div>
            )}
        </>
    )
}