// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('metro-config')

module.exports = (async () => {
  const {
    resolver: { assetExts, sourceExts },
  } = await getDefaultConfig()

  return {
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: [
        ...assetExts.filter((ext) => ext !== 'svg'),
        'obj',
        'mtl',
        'gltf',
        'glb',
      ],
      sourceExts: [...sourceExts, 'svg', 'frag', 'vert', 'glsl'],
    },
  }
})()
