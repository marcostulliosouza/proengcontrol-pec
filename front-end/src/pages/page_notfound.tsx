export function NotFound(){
    return(
        <div className="bg-cinza-300 flex justify-center items-center h-screen">
            <div className="flex">
                <h1 className="text-pec text-6xl content-center gap-[20px]">ERRO</h1>
                <img className="w-[100px] h-[100px] animate-[wiggle_1s_ease-in-out_infinite]" src="./src/img/404-error.png" alt="404 Error" />
            </div>
        </div>
    );
}