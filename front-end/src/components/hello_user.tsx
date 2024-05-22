export function HelloUser () {
    return (
        <div className='w-9/12 text-cinza-500 mobile:hidden'>
            <p className='text-sm text-nowrap'>Olá, {localStorage.getItem("user")}</p>
        </div>
    )
}