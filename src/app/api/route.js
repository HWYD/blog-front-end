import { headers } from 'next/headers'

export async function GET() {
  const headersList = headers()
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: headersList
  })
}
