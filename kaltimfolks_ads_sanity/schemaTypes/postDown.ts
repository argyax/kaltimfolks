export default {
    name: 'postdown',
    title: 'postDown',
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