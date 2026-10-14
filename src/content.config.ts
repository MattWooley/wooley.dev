import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

/** A year and month, e.g. "2021-04". Ordering and display both derive from it. */
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'expected YYYY-MM');

/** One title held at a company. `end: null` means current. */
const role = z
  .object({ title: z.string(), start: yearMonth, end: yearMonth.nullable() })
  .refine((r) => r.end === null || r.end >= r.start, { message: 'role ends before it starts' });

/** One company, with every title held there (newest first), so promotions read as a progression. */
const experience = defineCollection({
  loader: file('src/data/experience.yaml'),
  schema: z.object({
    company: z.string(),
    location: z.string(),
    roles: z.array(role).min(1),
    summary: z.string(),
    highlights: z.array(z.string()).min(1),
  }),
});

const recognition = defineCollection({
  loader: file('src/data/recognition.yaml'),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    year: z.number().int().min(1990).max(2100),
    description: z.string(),
    quote: z.string().optional(),
    quoteBy: z.string().optional(),
  }),
});

const highlights = defineCollection({
  loader: file('src/data/highlights.yaml'),
  schema: z.object({
    metric: z.string(),
    text: z.string(),
    order: z.number().int(),
  }),
});

const education = defineCollection({
  loader: file('src/data/education.yaml'),
  schema: z.object({
    degree: z.string(),
    school: z.string(),
    year: z.number().int().min(1990).max(2100),
  }),
});

const certifications = defineCollection({
  loader: file('src/data/certifications.yaml'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      issuer: z.string(),
      issued: yearMonth.optional(),
      verifyUrl: z.url().optional(),
      badge: image().optional(),
      order: z.number().int(),
    }),
});

const skills = defineCollection({
  loader: file('src/data/skills.yaml'),
  schema: z.object({
    category: z.string(),
    items: z.array(z.string()).min(1),
    order: z.number().int(),
  }),
});

export const collections = { experience, highlights, education, certifications, skills, recognition };
