type ContactProps = {
  data: any 
}

export function Contact({ data }: ContactProps) {
  return (
    <div>
      <span>{data.first_name + ' ' + data.last_name}</span>
    </div>
  )
}