import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'xsu4kw8l',
  dataset: 'production',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: string) => builder.image(source);
export default client;
