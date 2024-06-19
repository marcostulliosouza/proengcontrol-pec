import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Componentes
import { Sidebar } from '../../components/sidebar';
import { HelloUser } from '../../components/hello_user';
import { Logo } from '../../components/logo';
import { Checkbox } from '@mui/material';
import Select from 'react-select';

// Icones
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";

export function AdicionarNota() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [ableDate, setAbleDate] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [notaFiscal, setNotaFiscal] = useState({
        numero: '',
        numeroDocSAP: '',
        comRetorno: '',
        dataRetorno: new Date(),
        cliente: '',
        nota: new File([], ''),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Clientes
                const responseClientes = await fetch('http://172.17.4.23:5000/api/clientes');
                if (responseClientes.ok) {
                    const data = await responseClientes.json();
                    setClientes(data);
                } else {
                    console.error('Erro ao buscar clientes: ', responseClientes.statusText);
                }
            } catch (error) {
                console.error("Erro fetching dados: ", error)
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNotaFiscal({
            ...notaFiscal,
            [name]: name === 'dataRetorno' ? new Date(value) : value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type === 'application/pdf') {
                setNotaFiscal({
                    ...notaFiscal,
                    nota: file
                });
            } else {
                console.error('O arquivo deve ser um PDF');
            }
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotaFiscal({
            ...notaFiscal,
            comRetorno: event.target.checked ? 'true' : 'false'

        })
        setAbleDate(event.target.checked);
    }

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            border: '1px solid black',
            width: '300px',
            height: '40px',
        })
    };

    return (
        <div className='w-screen h-screen'>
            <div className="grid grid-rows-1 h-1/6 bg-cinza-200">
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
                            <Link to={"/engenharia_testes/listar_notas_fiscais"}>
                                <p className='mobile:text-[0px]'>Listar Notas Fiscais</p>
                            </Link>
                            <IoIosArrowForward className='mobile:w-0' />
                            <p>Adicionar Nota Fiscal</p>
                        </div>
                        <HelloUser />
                    </div>
                </div>
            </div>
            <div className='bg-cinza-200 w-screen h-5/6 p-5'>
                <main className='flex justify-center'>
                    <form className='grid grid-cols-2 content-center gap-4 w-4/12 text-lg mobile:text-sm mobile:w-screen'>
                        <label className='text-pec font-bold'>Número da Nota Fiscal:</label>
                        <input
                            name='numero'
                            type="text"
                            placeholder='Ex: 123456'
                            value={notaFiscal.numero}
                            onChange={handleChange}
                            className='indent-1 border border-1 border-black rounded p-2 shadow-sm h-10 w-[300px] mobile:w-full'
                        />
                        <label className='text-pec font-bold'>Número Doc. SAP:</label>
                        <input
                            name='numeroDocSAP'
                            type="text"
                            placeholder='Ex: 123456'
                            value={notaFiscal.numeroDocSAP}
                            onChange={handleChange}
                            className='indent-1 border border-1 border-black rounded p-2 shadow-sm h-10 w-[300px] mobile:w-full'
                        />
                        <label className='text-pec font-bold'>Cliente:</label>
                        <Select
                            options={clientes.map((cliente: any) => ({ value: cliente.cli_id, label: cliente.cli_nome }))}
                            onChange={(selectedOption) => setNotaFiscal({ ...notaFiscal, cliente: selectedOption?.value || 0 })}
                            className='mobile:text-sm'
                            placeholder='Selecione o cliente'
                            styles={customStyles}
                        />
                        <div className='flex justify-between items-center'>
                            <label className='text-pec font-bold'>Com retorno?</label>
                            <div className='flex justify-between items-center'>
                                <label className='text-pec font-bold'>Sim</label>
                                <Checkbox
                                    name='comRetorno'
                                    checked={notaFiscal.comRetorno === 'true'}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <label className={`font-bold ${!ableDate ? 'text-cinza-400' : 'text-pec'}`}>Em:</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    name='dataRetorno'
                                    type="date"
                                    value={notaFiscal.dataRetorno.toISOString().split('T')[0]}
                                    onChange={handleChange}
                                    className={`${!ableDate ? 'text-cinza-400' : ''}`}
                                />
                                {!ableDate && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                    }} />
                                )}
                            </div>
                        </div>
                        <div className='col-span-2 flex justify-between items-center'>
                            <label className='text-pec font-bold'>Nota Fiscal:</label>
                            <input
                                type="file"
                                accept='application/pdf'
                                onChange={handleFileChange}
                            />
                        </div>
                        <button
                            type='submit'
                            className='col-span-2 h-10 bg-pec text-cinza-200 font-bold rounded'
                        >
                            Adicionar Nota Fiscal
                        </button>
                    </form>
                </main>
            </div>

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