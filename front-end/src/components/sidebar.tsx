import logo from "../assets/icon_pec_cinza.svg"

export const Sidebar = (props) => {
    return (
        <div className="bg-pec w-2/12 h-[100vh] absolute inset-y-0 left-0 py-10">
            <header className="flex flex-col items-center text-cinza font-semibold">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="PEC" />
                  <h1 className='text-xl'>PEC</h1>
                </div>
                  <p className='flex flex-col items-center gap-2 text-sm'>ProEngControl</p>
              </header>
              <main>
                <footer>
                    <p className="absolute bottom-2 left-2 text-cinza font-semibold text-[10px]">
                        Desenvolvido por <br></br> Marcos Souza & Samuel Grontoski
                    </p>
                </footer>
              </main>
              {props.children}
        </div>
    )
}