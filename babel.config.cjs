module.exports = function (api) {
  const presets = ['@babel/preset-env', '@babel/preset-react'];

  // Jest uses this to determine which files it can transform.
  api.cache(true);

  return {
    presets,
  };
};
