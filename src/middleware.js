
export function onRequest(context, next) {

  const sessionToken = context.cookies.get('authjs.session-token');
  const privatePaths = ['/add-review', '/add-series']

  if (!sessionToken && privatePaths.includes(context.url.pathname)) {
    return context.redirect('/');
  }
  
  return next();
}