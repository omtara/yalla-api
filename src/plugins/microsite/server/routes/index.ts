export default [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
      auth: false,
      description: "Get welcome message",
      tag: {
        plugin: "microsite",
        name: "my-controller"
      }
    },
  },
];
