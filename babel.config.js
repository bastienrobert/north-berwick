module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-inline-import',
        {
          extensions: ['.frag', '.vert', '.glsl'],
        },
      ],
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.es', '.es6', '.mjs', '.ts', '.tsx'],
          alias: {
            '@': './src/',
          },
        },
      ],
    ],
  }
}
