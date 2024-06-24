export function onRequest(context, next) {

  const sessionToken = context.cookies.get('authjs.session-token');
  const protectedPaths = ['/add-review', '/add-series']

  if (!sessionToken && protectedPaths.includes(context.url.pathname)) {
    return context.redirect('/');
  }
  
  return next();
}