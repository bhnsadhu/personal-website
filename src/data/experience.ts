import type { Experience } from './types'

/**
 * The spread: professional and client work, ranked high to low. Campus
 * leadership lives in leadership.ts. Confidential clients stay unnamed
 * everywhere, including slugs; the consulting org is listed separately
 * under `via`.
 */
export const experience: Experience[] = [
  {
    slug: 'ingenio-care',
    company: 'Ingenio Care, Inc.',
    role: 'Product Builder Intern',
    dates: 'May 2026 — Aug 2026',
    location: 'Lombard, IL',
    title: 'Product Builder Intern',
    subtitle: 'Ingenio Care, Inc.',
    meta: 'May 2026 — Aug 2026',
    summary: 'Product strategy and feature development for a pre-seed digital health startup.',
    context:
      "Shaped product direction for an AI care companion, led the web-to-mobile UI/UX redesign, and drove Ingenio Care's App Store launch while building patient and provider outreach.",
    body: [
      'Defined use cases and product requirements for an AI care companion, translating patient feedback into features.',
      "Drove Ingenio Care's App Store launch by leading the web-to-mobile UI/UX redesign across eight feature areas.",
      'Built a patient and provider outreach pipeline spanning 750+ contacts across eight healthcare networks.',
    ],
    tags: ['Product Management', 'Product Requirements', 'UX', 'Digital Health', 'Outreach'],
    links: [{ label: 'App Store', href: 'https://apps.apple.com/us/app/ingenio-care/id6798790795' }],
  },
  {
    slug: 'replit',
    company: 'Replit',
    role: 'Product Strategy & Development Consultant',
    dates: 'Aug 2026 — Present',
    location: 'Champaign, IL',
    via: 'Disruption Lab at Gies',
    title: 'Product Strategy & Development Consultant',
    subtitle: 'Replit',
    meta: 'Aug 2026 — Present',
    summary: 'Product research, campus adoption strategy, and a learnathon platform for Replit Agent.',
    body: [
      'Assessing AI literacy and readiness across the University of Illinois Urbana-Champaign.',
      'Conceived an AI learnathon to help beginners build AI fluency by creating a working project with Replit Agent.',
      'Translate campus problems into product development briefs and design assessments to measure gains in AI fluency.',
      'Built and deployed a Next.js learnathon platform with event guidance, app showcases, and automated screenshots.',
    ],
    tags: ['Product Strategy', 'Product Development', 'User Research', 'Requirements Gathering', 'Technology Adoption', 'Next.js'],
    links: [
      { label: 'Live Demo', href: 'https://learnathon.bhanusadhu.com' },
      { label: 'Repository', href: 'https://github.com/bhnsadhu/replit-learnathon' },
    ],
    shots: [
      {
        src: '/replit/home.jpg',
        alt: 'Learnathon home page: "Built with Replit" in large type, presented by Disruption Lab at UIUC and Replit, with a countdown to build day.',
        caption: 'Home',
      },
      {
        src: '/replit/guide.jpg',
        alt: 'The event guide: interest, pre-event, and post-event forms, then the itinerary, prizes, and food.',
        caption: 'Event guide',
      },
      {
        src: '/replit/wall.jpg',
        alt: 'The project wall before build day, with search, a tour, and reserved slots waiting for builds.',
        caption: 'Project wall',
      },
    ],
  },
  {
    slug: 'confidential-media-firm',
    company: 'Confidential Media Production Firm',
    role: 'Strategy Consultant',
    dates: 'Aug 2026 — Present',
    location: 'Champaign, IL',
    via: 'Illinois Business Consulting',
    title: 'Strategy Consultant',
    subtitle: 'Confidential Media Production Firm',
    meta: 'Aug 2026 — Present',
    summary: 'Workflow optimization and AI adoption strategy for a media production business.',
    context:
      'The client is a media production business with roughly $300,000 in annual revenue.',
    body: [
      'Mapping production workflows, along with the time and cost behind each step.',
      'Gathering input from the founder and contract crew on handoffs, quality standards, and responsibilities.',
      'Evaluating AI and media-management tools to standardize post-production and reduce dependence on the founder.',
    ],
    tags: ['Business Analysis', 'Process Mapping', 'AI Tool Evaluation', 'Stakeholder Management', 'Operations'],
  },
  {
    slug: 'confidential-manufacturer',
    company: 'Confidential Berkshire Hathaway-Affiliated Manufacturer',
    role: 'Strategy Consultant',
    dates: 'Jan 2026 — May 2026',
    location: 'Champaign, IL',
    via: 'Illinois Business Consulting',
    title: 'Strategy Consultant',
    subtitle: 'Confidential Berkshire Hathaway-Affiliated Manufacturer',
    meta: 'Jan 2026 — May 2026',
    summary: 'Market expansion strategy for a confidential Berkshire Hathaway-affiliated manufacturer.',
    body: [
      'Evaluated 500+ potential product applications across 10 industries, identifying 12 potential expansion opportunities.',
      'Organized market and competitive research into a 200+ row Excel analysis.',
      "Presented recommendations that informed the client's 2026 growth roadmap.",
    ],
    tags: ['Market Research', 'Competitive Analysis', 'Growth Strategy', 'Excel', 'Data Analysis'],
  },
  {
    slug: 'avilux',
    company: 'AviLux',
    role: 'Strategy Consultant',
    dates: 'Jan 2026 — May 2026',
    location: 'Champaign, IL',
    via: 'Disruption Lab at Gies',
    title: 'Strategy Consultant',
    subtitle: 'AviLux',
    meta: 'Jan 2026 — May 2026',
    summary: 'Go-to-market and pilot planning for a drone technology startup.',
    context: 'AviLux builds infrastructure for autonomous drone operations. This engagement focused on drone delivery.',
    body: [
      'Synthesized 80+ hours of logistics, distribution, and competitive research into a go-to-market strategy.',
      'Assessed market sizing, competitive dynamics, and a phased distribution approach.',
      'Mapped 15+ FAA and state-level regulatory requirements into a compliance roadmap for a proposed Champaign pilot.',
    ],
    tags: ['Go-to-Market Strategy', 'Market Sizing', 'Competitive Analysis', 'Regulatory Research', 'Launch Planning'],
  },
]
