import { Link } from 'react-router-dom';
import { Background } from '../components/background';
import { Sidebar } from '../components/sidebar';
import { BarraPesquisa } from '../components/barra_pesquisa';

export function Chamados() {
    return (
        <div>
            <header>
                <Background />
                <Sidebar />
                <BarraPesquisa />
                <div className='w-9/12 absolute top-24 right-14 text-cinza-medium_dark'>
                    <p className='text-sm'>Dashboard Chamados</p>
                    <p className='text-base'>Olá, @usuário</p>
                </div>
            </header>
            <main>
                <div className="overflow-x-auto">
                    <table className="table-fixed table-xs max-w-[150vh] absolute top-40 right-20 border-collapse text-xs text-center">
                        <thead>
                            <tr className='bg-table_header'>
                                <th className='p-2 border border-slate-600'>Tipo</th>
                                <th className='p-2 border border-slate-600'>Status</th>
                                <th className='p-2 border border-slate-600'>Duração Total</th>
                                <th className='p-2 border border-slate-600'>Tempo de Atendimento</th>
                                <th className='p-2 border border-slate-600'>Tipo de Chamado</th>
                                <th className='p-2 border border-slate-600'>Local</th>
                                <th className='p-2 border border-slate-600'>Produto</th>
                                <th className='p-2 border border-slate-600'>Cliente</th>
                                <th className='p-2 border border-slate-600'>Responsável</th>
                                <th className='p-2 border border-slate-600'>Descrição do chamado</th>
                                <th className='p-2 border border-slate-600'>Operador</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='bg-white'>
                                <td className='border border-slate-600'>Jiga</td>
                                <td className='border border-slate-600'>Aberto</td>
                                <td className='border border-slate-600'>20:00</td>
                                <td className='border border-slate-600'>10:00</td>
                                <td className='border border-slate-600'>Problema na jiga</td>
                                <td className='border border-slate-600'>PÓS-COMPOSIÇÃO-011</td>
                                <td className='border border-slate-600'>007</td>
                                <td className='border border-slate-600'>001</td>
                                <td className='border border-slate-600'>Samuel</td>
                                <td className='border border-slate-600'>Alguma coisa deu errado</td>
                                <td className='border border-slate-600'>Fulaninho</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}