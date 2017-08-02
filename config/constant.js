const constant = {
    APP_NAME: process.env.APP_NAME,

    // available env: 'development', 'production', 'test'
    ENV: process.env.NODE_ENV,

    AUTH0: {
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_CLIENT_DOMAIN: process.env.AUTH0_CLIENT_DOMAIN,
    },

};

export default constant;
