'use client'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([{role: 'assistant', content: 'Hola! Soy tu IA. ¿En qué te ayudo?'}])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if(!input) return
    const newMessages = [...messages, {role: 'user', content: input}]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({messages: newMessages})
    })
    const data = await res.json()
    setMessages([...newMessages, {role: 'assistant', content: data.message}])
    setLoading(false)
  }

  return (
    <div style={{maxWidth: 600, margin: '40px auto', padding: 20}}>
      <h1>💬 Only Chat</h1>
      <div style={{border: '1px solid #ccc', height: 400, overflow: 'auto', padding: 10, borderRadius: 8}}>
        {messages.map((m,i) => <p key={i}><b>{m.role}:</b> {m.content}</p>)}
        {loading && <p>Escribiendo...</p>}
      </div>
      <div style={{display: 'flex', marginTop: 10}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} style={{flex:1, padding: 10}} placeholder="Escribe aquí..."/>
        <button onClick={sendMessage} style={{padding: '10px 20px'}}>Enviar</button>
      </div>
    </div>
  )
}