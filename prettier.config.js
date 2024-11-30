// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef, @typescript-eslint/no-require-imports
const styleguide = require('@vercel/style-guide/prettier');

// eslint-disable-next-line no-undef
module.exports = {
  ...styleguide,
  plugins: [...styleguide.plugins, 'prettier-plugin-tailwindcss'],
};