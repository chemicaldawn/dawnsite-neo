import { glob } from "astro/loaders";
import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
    loader: glob({ pattern: "*.mdx", base: "./content/pages/" })
})

const albums = defineCollection({
    loader: glob({ pattern: "*.md", base: "./content/albums/" }),
    schema: z.object({
        name: z.string(),
        artist: z.string(),
        year: z.number(),

        quotes: z.string().array(),

        genres: z.string().array(),
        vibes: z.string().array()
    })
})


export const collections = { pages, albums }