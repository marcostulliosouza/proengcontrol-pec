export function HelloUser ({pagina, user}) {
    return (
        <div className='w-9/12 text-cinza-500'>
            <p className='text-sm'>{pagina}</p>
            <p className='text-base'>Olá, {user}</p>
        </div>
    )
}