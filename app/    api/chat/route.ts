import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  const { messages } = await req.json()
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const chat = model.startChat({ history: messages.slice(0,-1).map((m:any)=>({role: m.role==='user'?'user':'model', parts: [{text: m.content}]})) })
  const result = await chat.sendMessage(messages[messages.length-1].content)
  return Response.json({ message: result.response.text() })
}