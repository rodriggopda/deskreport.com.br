import { useEffect } from "react"

export function Message() {
  useEffect(() => {
    if (window !== undefined) {
      const chatMessages: any = document.querySelectorAll('.message')
      chatMessages.forEach((chatMessage, key) => {
        if (key + 1 === chatMessages.length) {
          chatMessage.scrollIntoView({
            behavior: 'smooth'
          })
        }
      })

      // if (chatMessages.) chatWindow.scrollTo(0, chatWindow.scrollHeight)
    }
  }, [])

  return (
    <div className='message flex flex-col justify-center items-end w-full mt-4'>
      <div className={`bg-indigo-600 rounded-b-2xl rounded-tl-2xl bg-neutral-800 rounded-b-2xl rounded-tr-2xl flex flex-col px-6 pt-5 pb-6 w-max max-w-[35rem] border border-neutral-800/50 group`}>
        <p>
          Lorem Ipsum dolor sit amet, jet amet
          Lorem Ipsum dolor sit amet, jet amet
          Lorem Ipsum dolor sit amet, jet amet
          Lorem Ipsum dolor sit amet, jet amet
          Lorem Ipsum dolor sit amet, jet amet
        </p>
      </div>
      <span className="block mx-6 py-2 text-sm opacity-50">01/02/2024 20:00</span>
    </div>
  )
}