import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Card,
    Typography,
} from "@material-tailwind/react";

import React from "react";
import { useTable, usePagination } from "react-table";
import { button } from "@material-tailwind/react";

export function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state,
    } =
        useTable({
            columns,
            data,
        },
            usePagination,
        );

        

    return (
        <div>
            <table {...getTableProps()} className="text-left text-xs shadow">
                {/* Cabeçalho da tabela */}
                <thead className="bg-cinza-300">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    scope="col"
                                    className="p-2 border border-cinza-400"
                                    {...column.getHeaderProps()}>{column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {/* Corpo da tabela */}
                <tbody {...getTableBodyProps()} className="bg-white">
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td className="p-2 border border-cinza-400" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                    })}
                                </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* Paginação */}
            <div className="py-2 text-sm flex justify-between">
                <div>
                    <span className="text-gray-700">
                        Página {' '}
                        {state.pageIndex + 1} de {pageOptions.length}{' '}
                    </span>
                </div>
                {/* Botôes de avançar e voltar página */}
                <div className="flex">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <MdOutlineKeyboardDoubleArrowLeft className="h-6 w-6 border border-cinza-400 bg-white rounded-l" />
                    </button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <MdOutlineKeyboardArrowLeft className="h-6 w-6 border border-cinza-400 bg-white" />
                    </button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        <MdOutlineKeyboardArrowRight className="h-6 w-6 border border-cinza-400 bg-white" />
                    </button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <MdOutlineKeyboardDoubleArrowRight className="h-6 w-6 border border-cinza-400 bg-white rounded-r" />
                    </button>
                </div>
            </div>
        </div>

    );
}