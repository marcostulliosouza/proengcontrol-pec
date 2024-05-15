import { useState } from 'react';
import { Link } from 'react-router-dom';
// Componentes
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import logo from "../../assets/icon_pec.svg"

// Icones
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

export function AbrirChamado() {
    const [chamado, setChamado] = useState({
        cha_tipo: 0,
        cha_local: 0,
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

        <>
            <header className="grid grid-rows-1 bg-cinza-200">
                <div className='inline-flex p-5 gap-4'>
                    <button
                        onClick={() => setShowSidebar(true)}
                        className='text-pec text-4xl hover:scale-110 transition duration-200 flex justify-start items-start'>
                        <IoMenu />
                    </button>

                    <div className="grid justify-items-center items-center text-pec font-semibold">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="PEC" />
                            <h1 className='text-xl'>PEC</h1>
                        </div>
                        <p className='text-sm'>ProEngControl</p>
                    </div>
                    <div className='inline-flex content font-bold text-pec ml-8 gap-2 justify-center items-center'>
                        <Link to={"/menu"} className='inline-flex items-center gap-2'>
                            <FaHome className='mobile:w-0'/>
                            <p className='mobile:text-[0px]'>Menu</p>
                        </Link>
                        <IoIosArrowForward className='mobile:w-0'/>
                        <Link to={"/engenharia_testes"}>
                            <p className='mobile:text-[0px]'>Engenharia de Testes</p>
                        </Link>
                        <IoIosArrowForward className='mobile:w-0'/>
                        <p>Abrir chamado</p>
                    </div>
                </div>
            </header>
            <body className='w-screen fixed right-0 p-10 bg-cinza-200'>
                <form onSubmit={abrirChamado} className='grid gap-4'>
                    <div className='grid grid-cols-3 gap-4 place-content-start w-fit'>
                        {/* Tipo de chamado */}
                        <label className='text-lg font-bold text-cinza-500'>Tipo de chamado: </label>
                        <select
                            name="tipo"
                            required
                            autoFocus
                            onChange={event => setChamado({ ...chamado, cha_tipo: parseInt(event.target.value) })}
                            className='border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'
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
                        <label className='text-lg font-bold text-cinza-500'>Local: </label>
                        <select
                            name="local"
                            required
                            onChange={event => setChamado({ ...chamado, cha_local: parseInt(event.target.value) })}
                            className='border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'
                        >
                            <option value=""></option>
                        </select>
                        <p className='text-red-600 text-lg font-bold'>*</p>
                        {/* Cliente */}
                        <label className='text-lg font-bold text-cinza-500'>Cliente: </label>
                        <select
                            name="cliente"
                            required
                            onChange={event => setChamado({ ...chamado, cha_cliente: parseInt(event.target.value) })}
                            className='border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'
                        >
                            <option value=""></option>
                        </select>
                        <p className='text-red-600 text-lg font-bold'>*</p>
                        {/* Produto */}
                        <label className='text-lg font-bold text-cinza-500'>Produto: </label>
                        <select
                            name="produto"
                            required
                            onChange={event => setChamado({ ...chamado, cha_produto: parseInt(event.target.value) })}
                            className='border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'
                        >
                            <option value=""></option>
                        </select>
                        <p className='text-red-600 text-lg font-bold'>*</p>
                        {/* Dispositivo de Teste - DT */}
                        <label className='text-lg font-bold text-cinza-500'>Dispositivo de Teste - DT: </label>
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
                        <label className='text-lg font-bold text-cinza-500'>Breve descrição sobre o Chamado: </label>
                        <p className='text-red-600 text-lg font-bold'>*</p>
                    </div>
                    <textarea
                        name='descricao'
                        value={chamado.cha_descricao}
                        onChange={(event) => setChamado({ ...chamado, cha_descricao: event.target.value })}
                        className="bg-gray-100 shadow appearance-none border border-1 border-cinza-500 rounded w-[600px] h-60 indent-1 text-black resize-none"
                    />
                    <button
                        type='submit'
                        className='w-[600px] h-10 bg-pec text-cinza-200 font-bold rounded'
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
        </>
    )
}