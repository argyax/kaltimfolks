export default {
    name: 'menuadsdown',
    title: 'menuAdsDown',
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