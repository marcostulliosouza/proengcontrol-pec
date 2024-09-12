// ./pages/Home.tsx
import React from 'react';
import { AiOutlineDashboard, AiOutlineEye, AiOutlinePlusCircle, AiOutlineUserAdd, AiOutlineTags, AiOutlineLink, AiOutlineAppstoreAdd, AiOutlineLaptop, AiOutlineFileText, AiOutlineSetting, AiOutlineUser, AiOutlineHistory } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Bem-vindo ao PEC</h1>
                <p className="text-gray-600 mb-6">
                    Utilize as opções abaixo para navegar pelo sistema de gestão de chamados de Engenharia de Testes da Hi-mix.
                </p>

                <div className="grid grid-cols-3 mobile:grid-cols-2 2xl:grid-cols-4 gap-4">
                    {/* Dashboard */}
                    <div
                        className="bg-pec text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/dashboard')}
                    >
                        <AiOutlineDashboard className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Dashboard</h2>
                        <p className="text-sm text-center">Veja os principais indicadores e acompanhe os chamados em tempo real.</p>
                    </div>

                    {/* Visualizar Chamados */}
                    <div
                        className="bg-blue-500 text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/visualizar-chamados')}
                    >
                        <AiOutlineEye className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Visualizar Chamados</h2>
                        <p className="text-sm text-center">Acesse todos os chamados registrados e acompanhe seus status.</p>
                    </div>

                    {/* Abrir Chamado */}
                    <div
                        className="bg-green-500 text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/abrir-chamado')}
                    >
                        <AiOutlinePlusCircle className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Abrir Chamado</h2>
                        <p className="text-sm text-center">Registre um novo chamado para a engenharia de testes.</p>
                    </div>

                    {/* Cadastrar Produto */}
                    <div
                        className="bg-yellow-500 text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/cadastrar-produto')}
                    >
                        <AiOutlineTags className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Cadastrar Produto</h2>
                        <p className="text-sm text-center">Adicione novos produtos ao sistema.</p>
                    </div>

                    {/* Cadastrar Colaborador */}
                    <div
                        className="bg-red-500 text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/cadastrar-colaborador')}
                    >
                        <AiOutlineUserAdd className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Cadastrar Colaborador</h2>
                        <p className="text-sm text-center">Inclua novos colaboradores no sistema.</p>
                    </div>

                    {/* Cadastrar Cliente */}
                    <div
                        className="bg-teal-500 text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/cadastrar-cliente')}
                    >
                        <AiOutlineUserAdd className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Cadastrar Cliente</h2>
                        <p className="text-sm text-center">Adicione novos clientes ao sistema.</p>
                    </div>

                    {/* Gerenciamento de Dispositivos */}
                    <div
                        className="bg-indigo-500 text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/gerenciamento-dispositivo')}
                    >
                        <AiOutlineLaptop className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Gerenciamento de Dispositivo</h2>
                        <p className="text-sm text-center">Gerencie os dispositivos no sistema.</p>
                    </div>

                    {/* Vincular Cliente ao Produto */}
                    <div
                        className="bg-orange-500 text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/vincular-cliente-produto')}
                    >
                        <AiOutlineLink className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Vincular Cliente ao Produto</h2>
                        <p className="text-sm text-center">Associe clientes aos produtos específicos.</p>
                    </div>

                    {/* Relatórios */}
                    <div
                        className="bg-purple-500 text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/relatorios')}
                    >
                        <AiOutlineFileText className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Relatórios</h2>
                        <p className="text-sm text-center">Gere e visualize relatórios detalhados.</p>
                    </div>

                    {/* Configurações */}
                    <div
                        className="bg-gray-500 text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/configuracoes')}
                    >
                        <AiOutlineSetting className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Configurações</h2>
                        <p className="text-sm text-center">Ajuste as configurações do sistema.</p>
                    </div>

                    {/* Perfil */}
                    <div
                        className="bg-blue-700 text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/perfil')}
                    >
                        <AiOutlineUser className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Perfil</h2>
                        <p className="text-sm text-center">Visualize e edite seu perfil.</p>
                    </div>

                    {/* Histórico de Atividades */}
                    <div
                        className="bg-pink-500 text-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between"
                        onClick={() => navigate('/historico-atividades')}
                    >
                        <AiOutlineHistory className="text-3xl mb-2" />
                        <h2 className="text-lg font-semibold text-center">Histórico de Atividades</h2>
                        <p className="text-sm text-center">Veja o histórico de atividades do sistema.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;