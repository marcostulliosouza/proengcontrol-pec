export function HelloUser ({pagina, user}) {
    return (
        <div className='w-9/12 text-cinza-500'>
            <p className='text-sm'>Olá, {user}</p>
            <p className='text-base font-bold'>{pagina}</p>
        </div>
    )
}