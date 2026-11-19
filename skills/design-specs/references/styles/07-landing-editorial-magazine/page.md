# Editorial/Magazine Landing Page: Sample Data and Page Assembly

Part of the [Editorial/Magazine Landing Page specification](index.md).

## Sample Data Structure

```typescript
// types.ts

export interface Article {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  issueNumber: string;
  heroImage: string;
  heroCaption: string;
  sections: ArticleSection[];
}

export interface ArticleSection {
  number: string;
  title: string;
  content: string[];
  pullQuote?: PullQuote;
  figure?: Figure;
}

export interface PullQuote {
  text: string;
  attribution: string;
}

export interface Figure {
  src: string;
  alt: string;
  label: string;
  caption: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface RelatedArticle {
  image: string;
  title: string;
  author: string;
  href: string;
}

export interface Author {
  name: string;
  image: string;
  bio: string;
  handle: string;
}

// Sample data
export const sampleArticle: Article = {
  title: 'THE FUTURE OF DESIGN',
  subtitle: 'A meditation on craft, intention, and the tools that shape our work',
  author: 'Sarah Chen',
  date: 'December 2024',
  issueNumber: '47',
  heroImage: '/hero-design.jpg',
  heroCaption: 'Photography by Marcus Webb - San Francisco, 2024',
  sections: [
    {
      number: '01',
      title: 'The Beginning',
      content: [
        'The story of design is, at its core, a story of intention. Every curve, every pixel, every carefully considered spacing decision reflects a choice made with purpose. The best designers understand that their role is not to decorate, but to clarify.',
        'They create systems that communicate meaning through form, not despite it. In an age of infinite digital possibility, constraint becomes liberation. The grid becomes a guide. Typography becomes voice.',
        'This understanding didn\'t emerge overnight. It evolved through centuries of craft, from the precision of letterpress to the fluidity of digital tools. Each generation built upon the last, refining principles that transcend any single medium.',
      ],
      pullQuote: {
        text: 'Design is not just what it looks like and feels like. Design is how it works.',
        attribution: 'Steve Jobs',
      },
      figure: {
        src: '/figure-1.jpg',
        alt: 'The intersection of form and function',
        label: 'Fig. 1',
        caption: 'The intersection of form and function reveals itself in the careful balance of negative space.',
      },
    },
    {
      number: '02',
      title: 'The Craft',
      content: [
        'Great design emerges from deep understanding-of materials, of constraints, of human needs. It requires patience, iteration, and the willingness to discard what doesn\'t serve the whole.',
        'The most skilled practitioners develop an intuition that looks like magic but is actually the distillation of countless hours of practice. They see possibilities where others see limitations.',
      ],
    },
    {
      number: '03',
      title: 'The Future',
      content: [
        'As we look ahead, the fundamental questions remain unchanged: How do we create meaningful experiences? How do we respect the people who use what we make? How do we balance innovation with responsibility?',
        'The answers will evolve, but the inquiry itself is eternal. Design, at its best, is an act of service-a bridge between possibility and reality, between intention and impact.',
      ],
    },
  ],
};

export const stats: Stat[] = [
  { value: '10,000+', label: 'Hours of research' },
  { value: '47', label: 'Countries studied' },
  { value: '$2.4T', label: 'Economic impact' },
];

export const relatedArticles: RelatedArticle[] = [
  {
    image: '/related-1.jpg',
    title: 'The Art of Restraint',
    author: 'James Park',
    href: '/articles/restraint',
  },
  {
    image: '/related-2.jpg',
    title: 'Typography as Voice',
    author: 'Emma Liu',
    href: '/articles/typography',
  },
  {
    image: '/related-3.jpg',
    title: 'Designing for Meaning',
    author: 'David Kim',
    href: '/articles/meaning',
  },
];

export const author: Author = {
  name: 'Sarah Chen',
  image: '/author-sarah.jpg',
  bio: 'Sarah Chen is a design writer and researcher based in San Francisco. Her work explores the intersection of technology and human experience. She has written for The New York Times, Wired, and Fast Company. This is her third piece for The Design Review.',
  handle: '@sarahchen',
};
```
