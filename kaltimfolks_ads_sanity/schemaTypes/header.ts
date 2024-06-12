export default {
    name: 'header',
    title: 'headerAds',
    type: 'document',
    fields: [
      {
        name: 'adsLink',
        title: 'Ads Link',
        type: 'string',
      },
      {
        name: 'imgUrl',
        title: 'ImageUrl',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
    ],
  };