import { useNavigate } from 'react-router-dom'
export function Login() {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-screen flex items-center justify-center p-10'>
      <div className='flex flex-col items-center'>
        <div className='font-thin text-2xl'>Desk<span className="font-black">Report</span></div>
        <div className='mt-5 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl bg-white dark:bg-transparent shadow-sm dark:shadow-none'>
          <div className="xl:min-w-[320px] flex flex-col space-y-4">
            <p className="text-xl">Acesse sua conta</p>
            <label htmlFor="">
              <span className="block mb-2 text-neutral-600 dark:text-neutral-400">Email</span>
              <input className="px-4 bg-neutral-100 dark:bg-neutral-800 w-full pt-1 pb-1.5 rounded-lg outline-none ring-1 ring-transparent focus:ring-neutral-400 dark:ring-neutral-500 border border-neutral-200 dark:border-transparent transition-all" type="text" placeholder="Seu email" />
            </label>
            <label htmlFor="">
              <span className="block mb-2 text-neutral-600 dark:text-neutral-400">Senha</span>
              <input className="px-4 bg-neutral-100 dark:bg-neutral-800 w-full pt-1 pb-1.5 rounded-lg outline-none ring-1 ring-transparent focus:ring-neutral-400 dark:ring-neutral-500 border border-neutral-200 dark:border-transparent transition-all" type="password" placeholder="Sua senha" />
            </label>
            <a href="#" className="text-neutral-900 dark:text-neutral-100 transition-colors">Esqueci minha senha</a>
            <button onClick={() => navigate('/')} className="bg-sky-600 hover:bg-sky-700 text-white font-medium active:bg-sky-800 pt-1.5 pb-2 rounded-lg transition-colors">Entrar</button>
          </div>
        </div>
        <span className="my-3 text-neutral-500">ou</span>
        <a href='#' className="border-b border-transparent w-max text-center hover:border-neutral-300 dark:hover:border-neutral-700 py-1.5 transition-colors text-neutral-600 dark:text-neutral-400">Crie uma nova conta</a>
      </div>
    </div>
  )
}