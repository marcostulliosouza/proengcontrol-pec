import { useState } from 'react';
import { Link } from 'react-router-dom';
// Componentes
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';

// Icones
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

export function AbrirChamado() {
    const [chamado, setChamado] = useState({
        cha_tipo: 0,
        cha_local: '',
        cha_cliente: 0,
        cha_produto: 0,
        cha_DT: '',
        cha_descricao: '',
        cha_status: '',
        cha_data_hora_abertura: '',
        cha_operador: '',
        cha_plano: 0,
    });
    const [showSidebar, setShowSidebar] = useState(false);

    const abrirChamado = (event: any) => {

    }

    return (
        <div className='bg-cinza-200 min-h-screen flex-col-1 w-screen'>
            <header className="grid grid-rows-1">
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
                            <Link to={"/engenharia_testes"}>
                                <p className='mobile:text-[0px]'>Engenharia de Testes</p>
                            </Link>
                            <IoIosArrowForward className='mobile:w-0' />
                            <p>Abrir chamado</p>
                        </div>
                        <HelloUser />
                    </div>
                </div>
            </header>
            <body>
                <form onSubmit={abrirChamado} className='grid gap-4 p-10 absolute overflow-hidden left-1/2 -translate-x-1/2 mobile:w-screen mobile:p-5'>
                    <div className='grid grid-cols-3 gap-4 place-content-startsmobile:text-sm mobile:gap-2 mobile:flex-col-3 mobile:justify-between mobile:w-screen'>
                        {/* Tipo de chamado */}
                        <label className='mobile:text-sm text-lg font-bold text-pec'>Tipo de chamado: </label>
                        <select
                            name="tipo"
                            required
                            autoFocus
                            onChange={event => setChamado({ ...chamado, cha_tipo: parseInt(event.target.value) })}
                            className='mobile:text-sm border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'
                        >
                            <option value=""></option>
                            <option value="1">INSTALAÇÃO DE JIGA</option>
                            <option value="2">TREINAMENTO DE OPERADOR</option>
                            <option value="3">JIGA COM DEFEITO</option>
                            <option value="4">REMOÇÃO DE JIGA</option>
                            <option value="5">MUDANÇA DE POSIÇÃO</option>
                        </select>
                        <p className='text-red-600 text-lg font-bold'>*</p>
                        {/* Local */}
                        <label className='mobile:text-sm text-lg font-bold text-pec'>Local: </label>
                        <select
                            name="local"
                            required
                            onChange={event => setChamado({ ...chamado, cha_local: event.target.value })}
                            className='mobile:text-sm border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'
                        >
                            <option value=""></option>
                        </select>
                        <p className='text-red-600 text-lg font-bold'>*</p>
                        {/* Cliente */}
                        <label className='mobile:text-sm text-lg font-bold text-pec'>Cliente: </label>
                        <select
                            name="cliente"
                            required
                            onChange={event => setChamado({ ...chamado, cha_cliente: parseInt(event.target.value) })}
                            className='mobile:text-sm border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'
                        >
                            <option value=""></option>
                        </select>
                        <p className='text-red-600 text-lg font-bold'>*</p>
                        {/* Produto */}
                        <label className='mobile:text-sm text-lg font-bold text-pec'>Produto: </label>
                        <select
                            name="produto"
                            required
                            onChange={event => setChamado({ ...chamado, cha_produto: parseInt(event.target.value) })}
                            className='mobile:text-sm border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'
                        >
                            <option value=""></option>
                        </select>
                        <p className='text-red-600 text-lg font-bold'>*</p>
                        {/* Dispositivo de Teste - DT */}
                        <label className='mobile:text-sm text-lg font-bold text-pec'>Dispositivo de Teste - DT: </label>
                        <input
                            name='dt'
                            type="text"
                            value={chamado.cha_DT}
                            onChange={(event) => setChamado({ ...chamado, cha_DT: event.target.value })}
                            placeholder='XXXXXX'
                            className='indent-1 border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'
                        />
                        <p className='text-red-600 text-lg font-bold'>*</p>
                        {/* Descrição do chamado */}
                        <label className='mobile:text-sm text-lg font-bold text-pec'>Breve descrição sobre o Chamado: </label>
                        <p className='text-red-600 text-lg font-bold'>*</p>
                    </div>
                    <textarea
                        name='descricao'
                        value={chamado.cha_descricao}
                        onChange={(event) => setChamado({ ...chamado, cha_descricao: event.target.value })}
                        className="mobile:w-11/12 bg-gray-100 shadow appearance-none border border-1 border-cinza-500 rounded w-[600px] h-60 indent-1 text-black resize-none"
                    />
                    <button
                        type='submit'
                        className='mobile:w-11/12 w-[600px] h-10 bg-pec text-cinza-200 font-bold rounded'
                    >
                        ABRIR CHAMADO
                    </button>
                    <p className='text-red-600 text-lg font-bold'>* Campo obrigatório</p>
                </form>
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
        </div>
    )
}