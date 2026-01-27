import { glob } from "astro/loaders";
import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
    loader: glob({ pattern: "*.mdx", base: "./content/pages/" })
})

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./content/blog/" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        thumbnail : z.string().default("/images/thumbnail.png")
    })
})

const albums = defineCollection({
    loader: glob({ pattern: "*.md", base: "./content/albums/" }),
    schema: z.object({
        name: z.string(),
        artist: z.string(),
        year: z.number(),

        quotes: z.string().array(),

        genres: z.string().array(),
        vibes: z.string().array(),

        greenborder: z.boolean().default(false)
    })
})


export const collections = { pages, blog, albums }