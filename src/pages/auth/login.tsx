export function Login() {
  return (
    <div className='h-screen w-screen flex items-center justify-center p-10'>
      <div className='flex flex-col items-center'>        
        <div className='font-thin text-2xl'>Desk<span className="font-black">Report</span></div>
        <div className='mt-4 border border-neutral-800 p-6 rounded-xl'>
          <div className="xl:min-w-[320px] flex flex-col space-y-4">
            <p className="text-xl">Acesse sua conta</p>
            <label htmlFor="">
              <span className="block mb-2">Email</span>
              <input className="bg-neutral-800 w-full py-1 rounded-lg" type="text" />
            </label>
            <label htmlFor="">
              <span className="block mb-2">Senha</span>
              <input className="bg-neutral-800 w-full py-1 rounded-lg" type="text" />
            </label>
            <a href="#">Esqueci minha senha</a>
            <button className="bg-indigo-600 active:bg-indigo-500 py-1 rounded-lg">Entrar</button>
          </div>
        </div>
        <span className="my-3">ou</span>
        <a href='#' className="border border-neutral-800 w-full text-center hover:bg-neutral-900 active:bg-neutral-800 py-2 rounded-lg">Crie uma nova conta</a>
      </div>
    </div>
  )
}