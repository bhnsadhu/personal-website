/** The short form, split so the hero's seeking line can mark Product as the lead. */
const interests = { lead: 'Product', rest: 'Software, & Strategy' }

export const site = {
  name: 'Bhanu Prakash Sadhu',
  shortName: 'Bhanu Sadhu',
  /** The short form: tab title, social preview, the hero's seeking line, and the label under About in the list view. */
  title: `${interests.lead}, ${interests.rest}`,
  browserTitle: `Bhanu Sadhu | ${interests.lead}, ${interests.rest}`,
  description:
    'Bhanu Sadhu studies Computer Science + Economics at UIUC and builds products across software, digital health, and AI. Explore his projects, experience, and interests.',
  location: 'Hawthorn Woods, Illinois',
  education: 'Computer Science + Economics, University of Illinois Urbana-Champaign',
  /** The label beside "Your hand" in the hero. */
  focus: 'Product Management',
  seeking: 'Summer 2027 internships',
  interests,
  tagline:
    "I turn ideas into products and research into decisions. I'm studying Computer Science + Economics at UIUC, with a focus on product management and building useful software.",
  about: [
    "I'm Bhanu, a Computer Science + Economics student at the University of Illinois Urbana-Champaign, with minors in Statistics and Advertising. My experience spans digital health, AI adoption, consulting, and building products of my own. I enjoy understanding what people need, deciding what matters most, and turning those decisions into something they can use.",
    "Outside of work, I'm usually playing cards with friends, trying a restaurant, collecting fragrances, or watching a movie.",
  ],
  workingStyle: 'Understand the problem, make thoughtful tradeoffs, and improve through feedback.',
  /** The long form, as a sentence: the contact section and the list view. */
  availability:
    "I'm seeking Summer 2027 internships in Product Management, Software Development, & Business Strategy.",
  email: 'sadhubhanu07@gmail.com',
  phone: '224-428-4480',
  phoneHref: 'tel:+12244284480',
  linkedin: 'https://www.linkedin.com/in/bhanusadhu',
  linkedinHandle: 'bhanusadhu',
  github: 'https://github.com/bhnsadhu',
  githubHandle: 'bhnsadhu',
  /** Drop the real PDF at public/Bhanu_Sadhu_Resume.pdf. */
  resume: '/Bhanu_Sadhu_Resume.pdf',
  contactLede: "Have a product internship, a project idea, or something interesting to build? I'd love to hear from you.",
  copyrightYear: '2026',
  signoff: 'Shuffled, not stirred.',
  /** Static on purpose. Update by hand when content changes. */
  updated: 'September 19, 2026',
  asOf: 'September 19, 2026',
}

/** The link at the foot of an expanded card, named for where it leads. */
export const moreLabel = { experience: 'View experience', project: 'Explore the project' } as const
