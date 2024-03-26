import logo from './assets/icon_pec.svg'
import user from './assets/user.png'
import key from './assets/key.png'

export function App() {
  return (
    <div className="flex flex-col bg-cinza max-w-[50vh] w-full h-[70vh] fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md ">
      <div className="flex flex-col items-center fixed overflow-hidden left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 text-pec font-semibold">
        <div className="flex items-center ">
          <img src={logo} alt="PEC" />
          <div className="flex flex-col p-2">
            <span className='text-xl'>PEC</span>
          </div>
        </div>
        <span className='text-sm'>ProEngControl</span>
        <span className='text-cinza-medium_dark'>Bem-Vindo!</span>
      </div>
      <div className='grid gap-2 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-left font-normal tracking-tight rounded-md'>
        <form className='flex items-center border-b'>
          <img className='w-5 pr-1 opacity-50' src={user} alt="user" />
          <input className='bg-cinza indent-1'
            type="text"
            placeholder='Login'
          />
        </form>
        <form className='flex items-center border-b'>
          <img className='w-5 pr-1 opacity-50' src={key} alt="key" />
          <input className='bg-cinza indent-1'
            type="text"
            placeholder='Senha'
          />
        </form>
        <div className='flex items-center gap-2 font-normal'>
          <button
            id='rememberUser'
            type='button'
            className='box-border h-5 w-5 bg-cinza-extra_dark focus:bg-pec'
          >
          </button>
          <span>Lembrar usuário</span>
        </div>

        <script>
          const rememberUser =
        </script>
      </div>
      <button
        type="submit"
        className='fixed left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2 font-bold border border-pec rounded-md box-border h-10 w-32 bg-pec text-cinza'
      >
        Entrar
      </button>
    </div>
  )
}
