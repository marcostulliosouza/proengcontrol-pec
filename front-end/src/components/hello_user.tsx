export function HelloUser ({user}) {
    return (
        <div className='w-9/12 text-cinza-500'>
            <p className='text-sm'>Dashboard Chamados</p>
            <p className='text-base'>Olá, {user}</p>
        </div>
    )
}