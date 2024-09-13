import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Tooltip, XAxis, YAxis,
    CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import Layout from '../components/Layout';
import {
    AiOutlineWarning,
    AiOutlineClockCircle,
    AiOutlineFileText,
    AiOutlineBarChart,
    AiOutlineTeam,
    AiOutlineStock
} from 'react-icons/ai';
import LoadingSpinner from '../components/LoadingSpinner';

const mockData = {
    detractors: 15, // % de detratores
    topProductsDay: ['Produto A', 'Produto B', 'Produto C'],
    topProductsWeek: ['Produto X', 'Produto Y', 'Produto Z'],
    downtime: {
        today: '2h 30min',
        week: '12h 15min',
    },
    efficiency: {
        avgEfficiency: 85, // %
        topEmployee: 'Marcos Tullio',
    },
    dailyPerformance: [
        { day: '2024-09-01', atendidos: 20, pendentes: 5 },
        { day: '2024-09-02', atendidos: 25, pendentes: 10 },
        { day: '2024-09-03', atendidos: 15, pendentes: 8 },
        // Mais dados aqui
    ],
    resolutionRate: {
        resolved: 150,
        notResolved: 50,
    },
    avgResponseTime: [
        { type: 'Tipo 1', time: 30 },
        { type: 'Tipo 2', time: 45 },
        { type: 'Tipo 3', time: 25 },
    ],
    pendingCallsByPriority: [
        { priority: 'Alta', count: 10 },
        { priority: 'Média', count: 20 },
        { priority: 'Baixa', count: 30 },
    ],
    callCategories: [
        { category: 'Categoria 1', count: 40 },
        { category: 'Categoria 2', count: 35 },
        { category: 'Categoria 3', count: 25 },
    ],
    recentCalls: [
        { id: '1', status: 'Aberto', priority: 'Alta', timeOpen: '1h 30min' },
        { id: '2', status: 'Fechado', priority: 'Média', timeOpen: '2h 00min' },
        // Mais dados aqui
    ],
    teamPerformance: [
        { member: 'João', callsHandled: 50 },
        { member: 'Maria', callsHandled: 70 },
        { member: 'Pedro', callsHandled: 60 },
    ],
    monthlyComparison: [
        { month: 'Jan', callsResolved: 120 },
        { month: 'Fev', callsResolved: 150 },
        { month: 'Mar', callsResolved: 180 },
    ],
    userFeedback: [
        { feedback: 'Muito Satisfeito', count: 60 },
        { feedback: 'Satisfeito', count: 25 },
        { feedback: 'Neutro', count: 10 },
        { feedback: 'Insatisfeito', count: 5 },
    ],
};

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Gráfico de Desempenho Diário */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center">
                        <AiOutlineBarChart className="mr-2 text-purple-500" /> Desempenho Diário
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockData.dailyPerformance}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="atendidos" stroke="#8884d8" />
                            <Line type="monotone" dataKey="pendentes" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Taxa de Resolução de Camados */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-1">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center">
                        <AiOutlineStock className="mr-2 text-blue-500" /> Taxa de Resolução de Chamados
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Resolvidos', value: mockData.resolutionRate.resolved },
                                    { name: 'Não Resolvidos', value: mockData.resolutionRate.notResolved },
                                ]}
                                dataKey="value"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                <Cell fill="#4BC0C0" />
                                <Cell fill="#FF6384" />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Chamados Pendentes por Prioridade */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-1">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center">
                        <AiOutlineWarning className="mr-2 text-red-500" /> Chamados Pendentes por Prioridade
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={mockData.pendingCallsByPriority}
                                dataKey="count"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {mockData.pendingCallsByPriority.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#FF6384', '#36A2EB', '#FFCE56'][index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Resumo dos Chamados por Categoria */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-1">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center">
                        <AiOutlineStock className="mr-2 text-blue-500" /> Resumo dos Chamados por Categoria
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={mockData.callCategories}
                                dataKey="count"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {mockData.callCategories.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#FF6384', '#36A2EB', '#FFCE56'][index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {/* Feedback dos Usuários */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-1">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center">
                        <AiOutlineTeam className="mr-2 text-teal-500" /> Feedback dos Usuários
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={mockData.userFeedback}
                                dataKey="count"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {mockData.userFeedback.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'][index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Tabela de Chamados Recentes */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center">
                        <AiOutlineFileText className="mr-2 text-orange-500" /> Chamados Recentes
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Prioridade</th>
                                    <th className="px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Tempo Aberto</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {mockData.recentCalls.map((call) => (
                                    <tr key={call.id}>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">{call.id}</td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">{call.status}</td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">{call.priority}</td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">{call.timeOpen}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Desempenho da Equipe */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md col-span-2 sm:col-span-2 lg:col-span-2">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center">
                        <AiOutlineTeam className="mr-2 text-teal-500" /> Desempenho da Equipe
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockData.teamPerformance}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="member" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="callsHandled" fill="#4BC0C0" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Comparação Mensal */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center">
                        <AiOutlineStock className="mr-2 text-blue-500" /> Comparação Mensal
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockData.monthlyComparison}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="callsResolved" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Tempo Médio de Atendimento */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2">
                    <h2 className="text-lg sm:text-xl font-bold flex items-center">
                        <AiOutlineClockCircle className="mr-2 text-yellow-500" /> Tempo Médio de Atendimento
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockData.avgResponseTime}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="time" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </Layout>
    );
};

export default Dashboard;
