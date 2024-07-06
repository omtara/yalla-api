module.exports = {
    routes: [
      { // Path defined with an URL parameter
        method: 'GET',
        path: '/ms/hello', 
        handler: 'ms-user-site.hello',
        config: {
          auth: false,
          "description": "Send an email",
          "tag": {
            "name": "Ms-user-site"
          }
        },
      }
    ]
  }