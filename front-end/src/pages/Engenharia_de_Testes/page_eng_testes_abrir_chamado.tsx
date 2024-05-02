import { useState } from 'react';
// Componentes
import { Sidebar } from '../../components/sidebar';
import { BarraPesquisa } from '../../components/barra_pesquisa';
import { HelloUser } from '../../components/hello_user';

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

    const abrirChamado = (event: any) => {

    }

    return (
        <div className="bg-cinza-200 w-screen h-screen">
            <body>
                <div className="bg-cinza-200 fixed inset-y-0 w-screen" />
                <div className="bg-pec fixed inset-y-0 left-0 w-[200px]">
                    <Sidebar />
                </div>
                <main className='absolute inset-y-0 right-0 w-10/12 grid content-start gap-y-5 p-10'>
                    <BarraPesquisa />
                    <HelloUser pagina={'Abrir chamado para Engenharia de Testes'} user={localStorage.getItem("user")} />
                    <form onSubmit={abrirChamado} className='grid gap-4'>
                        <div className='grid grid-cols-3 gap-4 place-content-start w-fit'>
                            {/* Tipo de chamado */}
                            <label className='text-lg font-bold text-cinza-500'>Tipo de chamado: </label>
                            <select 
                                name="tipo" 
                                required 
                                autoFocus
                                onChange={event => setChamado({ ...chamado, cha_tipo: parseInt(event.target.value) })} 
                                className='border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300 right-0'
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
                </main>
            </body>
        </div>
    )
}