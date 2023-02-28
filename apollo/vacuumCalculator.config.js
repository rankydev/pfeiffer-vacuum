export default (context) => {
  return {
    httpEndpoint: () => {
      const { req } = context;
      if (req) {
        // server side
        return req.protocol + '://' + req.get('host');
      }
      if (window) {
        // client side
        return window.location.protocol + '//' + window.location.host;
      }
    },
    browserHttpEndpoint: '/api/vacuumCalc/graphql',
    httpLinkOptions: {
      headers: {
        'Accept-Language': context?.store?.state?.language === 'de' ? 'de' : 'en'
      }
    },
    getAuth: () => {
      const { store } = context;
      const authObject = store.state.auth;
      // eslint-disable-next-line camelcase
      return authObject ? `${authObject?.token_type} ${authObject?.access_token}` : null;
    }
  };
};
