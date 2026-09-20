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
      'Worked on an AI care companion, translating patient needs into product requirements and web and mobile experiences.',
    body: [
      'Defined use cases and product requirements, translating patient feedback into features.',
      'Developed web and mobile UX across eight feature areas, including care tracking and medication management.',
      'Built an outreach pipeline of 750+ contacts across eight healthcare networks.',
    ],
    tags: ['Product Management', 'Product Requirements', 'UX', 'Digital Health', 'Outreach'],
  },
  {
    slug: 'replit',
    company: 'Replit',
    role: 'Student Product Strategy Consultant',
    dates: 'Aug 2026 — Present',
    location: 'Champaign, IL',
    via: 'Disruption Lab at Gies',
    title: 'Student Product Strategy Consultant',
    subtitle: 'Replit',
    meta: 'Aug 2026 — Present',
    summary: 'Product research and campus adoption strategy for Replit Agent.',
    body: [
      'Assessing AI literacy and readiness across 4+ UIUC colleges.',
      'Developing pre- and post-workshop assessments.',
      'Translating campus problems into development briefs for a proposed innovation challenge.',
    ],
    tags: ['Product Strategy', 'User Research', 'Requirements Gathering', 'Data Analysis', 'Technology Adoption'],
  },
  {
    slug: 'confidential-media-firm',
    company: 'Confidential Media Production Firm',
    role: 'Student Strategy Consultant',
    dates: 'Aug 2026 — Present',
    location: 'Champaign, IL',
    via: 'Illinois Business Consulting',
    title: 'Student Strategy Consultant',
    subtitle: 'Confidential Media Production Firm',
    meta: 'Aug 2026 — Present',
    summary: 'Workflow optimization and AI adoption strategy for a media production business.',
    context:
      'The client is a media production business with roughly $300,000 in annual revenue, a figure supplied by the client rather than a verified public number.',
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
    role: 'Student Strategy Consultant',
    dates: 'Jan 2026 — May 2026',
    location: 'Champaign, IL',
    via: 'Illinois Business Consulting',
    title: 'Student Strategy Consultant',
    subtitle: 'Confidential Berkshire Hathaway-Affiliated Manufacturer',
    meta: 'Jan 2026 — May 2026',
    summary: 'Market expansion strategy for a confidential Berkshire Hathaway-affiliated manufacturer.',
    body: [
      'Evaluated 500+ applications across 10 industries, identifying 12 potential expansion opportunities.',
      'Organized market and competitive research into a 200+ row Excel analysis.',
      "Presented recommendations that informed the client's 2026 growth roadmap.",
    ],
    tags: ['Market Research', 'Competitive Analysis', 'Growth Strategy', 'Excel', 'Data Analysis'],
  },
  {
    slug: 'avilux',
    company: 'AviLux',
    role: 'Student Strategy Consultant',
    dates: 'Jan 2026 — May 2026',
    location: 'Champaign, IL',
    via: 'Disruption Lab at Gies',
    title: 'Student Strategy Consultant',
    subtitle: 'AviLux',
    meta: 'Jan 2026 — May 2026',
    summary: 'Go-to-market and pilot planning for a drone technology startup.',
    context: 'AviLux builds infrastructure for autonomous drone operations. This engagement focused on drone delivery.',
    body: [
      'Synthesized 80+ hours of logistics, distribution, and competitive research into a go-to-market strategy.',
      'Assessed market sizing, competitive dynamics, and a phased distribution approach.',
      'Mapped 15+ FAA and state-level regulatory requirements into a compliance roadmap supporting a potential Champaign pilot within six months.',
    ],
    tags: ['Go-to-Market Strategy', 'Market Sizing', 'Competitive Analysis', 'Regulatory Research', 'Launch Planning'],
  },
]
