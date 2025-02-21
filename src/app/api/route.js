import { cookies,headers  } from 'next/headers'

export async function GET(request) {
    const cookieStore = cookies()
    const headersList = headers()
    console.log('cookie',cookieStore,headersList)
    return new Response('Hello, Next.js!', {
        status: 200,
        headers: headersList,
      })
}