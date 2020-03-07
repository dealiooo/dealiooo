// use em based media queries
// https://zellwk.com/blog/media-query-units

const createMediaQuery = (minWidth: number) => `@media (min-width: ${minWidth / 16}em)`;

const media = {
  custom: createMediaQuery,
  giant: createMediaQuery(1170),
  desktop: createMediaQuery(992),
  tablet: createMediaQuery(768),
  phablet: createMediaQuery(572),
  phone: createMediaQuery(376),
};

export default media;
