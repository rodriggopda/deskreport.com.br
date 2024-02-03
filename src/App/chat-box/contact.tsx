type ContactProps = {
  data: any 
}

export function Contact({ data }: ContactProps) {
  return (
    <div className="flex items-center">
      <img className="rounded-full mr-3 bg-indigo-500" width={32} height={32} src={data.avatar} />
      <span>{data.first_name + ' ' + data.last_name}</span>
    </div>
  )
}