export default (hash: string) => {
  return {
    name: 'combine-css',
    async generateBundle (options, bundle) {
      bundle[`index-${hash}.css`].source += bundle[`vue-styles-${hash}.css`].source
    }
  }
}
