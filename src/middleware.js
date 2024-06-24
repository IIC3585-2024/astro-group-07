export function onRequest(context, next) {

  const sessionToken = context.cookies.get('authjs.session-token');
  const publicPaths = ['/', '/api/auth/csrf', '/api/auth/signin/github', '/api/auth/callback/github']

  if (!sessionToken && !publicPaths.includes(context.url.pathname)) {
    return context.redirect('/');
  }
  
  return next();
}