import React, { useState } from 'react'
import { Messages } from '../[projectId]/page'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

type Props = {
  messages: Messages[],
  onSend: any,
  loading: boolean,
}

const ChatSection = ({messages, onSend, loading}: Props) => {
  const [input, setInput] = useState<string>();
  const handleSend = () => {
    if(!input?.trim()) return;
    onSend(input);
    setInput('');
  }
  return (
    <div className='w-96 shadow h-[84vh] p-4'>
      <div className='flex-1 overflow-y-auto p-4 space-y-3 flex flex-col'>
        {messages?.length == 0 ? 
        (
          <p className='text-gray-400 text-center'>No Messages Yet</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role==="user" ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-2 rounded-lg max-w-[80%] wrap-break-word ${msg.role==="user" ? 'bg-white text-black' : 'bg-gray-300 text-black'}  `}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        {loading && <div className='flex justify-center items-center p-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-800'></div>
          <span className='ml-2 text-zinc-800'>Generating code...</span>
        </div> }
      </div>

      <div className='p-4 border-t flex items-center gap-2'>
        <textarea placeholder='Type your message...' className='flex-1 resize-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-2' value={input} onChange={(event)=>setInput(event.target.value)}></textarea>
        <Button onClick={handleSend}><ArrowUp /></Button>
      </div>

    </div>
  )
}

export default ChatSection