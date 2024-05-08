export function HelloUser ({user}) {
    return (
        <div className='w-9/12 text-cinza-500'>
            <p className='text-sm text-nowrap'>Olá, {user}</p>
        </div>
    )
}