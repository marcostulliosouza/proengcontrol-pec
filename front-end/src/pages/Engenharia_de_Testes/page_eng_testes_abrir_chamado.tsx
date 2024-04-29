import { useState } from 'react';
// Componentes
import { Sidebar } from '../../components/sidebar';
import { BarraPesquisa } from '../../components/barra_pesquisa';
import { HelloUser } from '../../components/hello_user';

export function AbrirChamado() {
    const [tipo, setTipo] = useState('');

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
                    <form className='grid gap-4'>
                        <div className='grid grid-cols-3 gap-4 place-content-start w-fit'>
                            {/* Tipo de chamado */}
                            <label className='text-lg font-bold text-cinza-500'>Tipo de chamado: </label>
                            <select name="tipo" required className='border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300 right-0'>
                                <option value=""></option>
                                <option value="instalacaoJiga">INSTALAÇÃO DE JIGA</option>
                                <option value="treinamentoOperador">TREINAMENTO DE OPERADOR</option>
                                <option value="jigaComDefeito">JIGA COM DEFEITO</option>
                                <option value="remocaoJiga">REMOÇÃO DE JIGA</option>
                                <option value="mudancaPosicao">MUDANÇA DE POSIÇÃO</option>
                            </select>
                            <p className='text-red-600 text-lg font-bold'>*</p>
                            {/* Local */}
                            <label className='text-lg font-bold text-cinza-500'>Local: </label>
                            <select name="tipo" required className='border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'>
                                <option value=""></option>
                            </select>
                            <p className='text-red-600 text-lg font-bold'>*</p>
                            {/* Cliente */}
                            <label className='text-lg font-bold text-cinza-500'>Cliente: </label>
                            <select name="tipo" required className='border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'>
                                <option value=""></option>
                            </select>
                            <p className='text-red-600 text-lg font-bold'>*</p>
                            {/* Produto */}
                            <label className='text-lg font-bold text-cinza-500'>Produto: </label>
                            <select name="tipo" required className='border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'>
                                <option value=""></option>
                            </select>
                            <p className='text-red-600 text-lg font-bold'>*</p>
                            {/* Dispositivo de Teste - DT */}
                            <label className='text-lg font-bold text-cinza-500'>Dispositivo de Teste - DT: </label>
                            <input
                                className='indent-1 border border-1 border-cinza-500 rounded p-2 shadow-sm bg-cinza-300'
                                type="text"
                                placeholder='XXXXXX'
                            />
                            <p className='text-red-600 text-lg font-bold'>*</p>
                            {/* Descrição do chamado */}
                            <label className='text-lg font-bold text-cinza-500'>Breve descrição sobre o Chamado: </label>
                            <p className='text-red-600 text-lg font-bold'>*</p>
                        </div>
                        <textarea className="bg-gray-100 shadow appearance-none border border-1 border-cinza-500 rounded w-[600px] h-60 indent-1 text-black resize-none"></textarea>
                        <button
                            className='w-[600px] h-10 bg-pec text-cinza-200 font-bold rounded'
                            type='submit'
                        >
                            ABRIR CHAMADO
                        </button>
                    </form>
                </main>
            </body>
        </div>
    )
}