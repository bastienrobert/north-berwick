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
    },
    resolver: {
      assetExts: [...assetExts, 'obj', 'mtl', 'gltf', 'glb'],
      sourceExts: [...sourceExts, 'frag', 'vert', 'glsl'],
    },
  }
})()
