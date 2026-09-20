import type { Education } from './types'

/** One source for the education card, the list view, and anything else that names the degree. */
export const education: Education = {
  school: 'University of Illinois Urbana-Champaign',
  degree: 'B.S. Computer Science + Economics',
  dates: 'Aug 2025 — May 2029',
  expected: 'Expected graduation May 2029',
  location: 'Champaign, IL',
  minors: ['Statistics', 'Advertising'],
  courseworkNote: 'Selected coursework as of September 19, 2026.',
  coursework: [
    { code: 'CS 222', name: 'Software Design Lab', status: 'In progress' },
    { code: 'CS 225', name: 'Data Structures', status: 'In progress' },
    { code: 'ECON 302', name: 'Intermediate Microeconomic Theory', status: 'In progress' },
    { code: 'ECON 203', name: 'Economic Statistics II', status: 'Completed' },
    { code: 'CS 173', name: 'Discrete Structures', status: 'Completed' },
    { code: 'CS 128', name: 'Introduction to Computer Science II', status: 'Completed' },
  ],
}
