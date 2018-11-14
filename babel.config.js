const presets = [
  [
    '@babel/env',
    {
      targets: {
        browsers: 'last 2 Chrome versions',
        node: 'current'
      }
    }
  ]
];

module.exports = { presets };
