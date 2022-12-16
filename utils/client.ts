import sanityClient from '@sanity/client';
// import { createClient } from 'next-sanity';

export const client = sanityClient({
  projectId: 'aay73n7d',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
