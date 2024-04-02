import logo from "../assets/icon_pec_cinza.svg"

export const Sidebar = (props) => {
    return (
        <div>
            <header className="grid justify-items-center items-center fixed top-10 left-14 text-cinza-200 font-semibold">
                <div className="flex items-center gap-2 top-10">
                  <img src={logo} alt="PEC" />
                  <h1 className='text-xl'>PEC</h1>
                </div>
                  <p className='flex flex-col items-center gap-2 text-sm'>ProEngControl</p>
              </header>
              <main>
                <footer>
                    <p className="fixed bottom-2 left-2 text-cinza-200 font-semibold text-[10px]">
                        Desenvolvido por <br></br> Marcos Souza & Samuel Grontoski
                    </p>
                </footer>
              </main>
              {props.children}
        </div>
    )
}