export function middleware(request) {
  request.cookies.get('authorization')
}
