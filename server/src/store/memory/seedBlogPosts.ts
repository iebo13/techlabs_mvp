import type { BlogPost } from '../../domains/content/blogPosts/blogPost.schemas'

const DEFAULT_AUTHOR = 'TechLabs Team'

export const seedBlogPosts = (): BlogPost[] => {
  return [
    {
      id: '1',
      title: 'Getting Started with Web Development',
      slug: 'getting-started-with-web-development',
      excerpt: 'Learn the fundamentals of web development and start your journey into tech.',
      content:
        '<h2>Introduction</h2><p>Web development is one of the most in-demand skills in the tech industry today...</p>',
      featuredImage: '/img/stories/person1.png',
      author: DEFAULT_AUTHOR,
      tags: ['web-dev', 'beginner', 'tutorial'],
      status: 'published',
      publishedAt: '2024-01-15T10:00:00Z',
      createdAt: '2024-01-10T08:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      title: 'Data Science Career Paths in 2024',
      slug: 'data-science-career-paths-2024',
      excerpt: 'Explore the various career opportunities in data science and AI.',
      content: '<h2>The Data Science Landscape</h2><p>Data science continues to evolve rapidly...</p>',
      featuredImage: '/img/stories/person2.png',
      author: DEFAULT_AUTHOR,
      tags: ['data-science', 'career', 'ai'],
      status: 'published',
      publishedAt: '2024-02-01T12:00:00Z',
      createdAt: '2024-01-28T09:00:00Z',
      updatedAt: '2024-02-01T12:00:00Z',
    },
    {
      id: '3',
      title: 'UX Design Best Practices',
      slug: 'ux-design-best-practices',
      excerpt: 'Draft article about user experience design principles.',
      content: '<h2>Draft</h2><p>This is a work in progress...</p>',
      featuredImage: '',
      author: DEFAULT_AUTHOR,
      tags: ['design', 'ux'],
      status: 'draft',
      createdAt: '2024-02-10T14:00:00Z',
      updatedAt: '2024-02-10T14:00:00Z',
    },
  ]
}
