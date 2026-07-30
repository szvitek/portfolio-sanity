import type { HomePageData } from "@/lib/sanity"

export const mockHomePageData: HomePageData = {
  profile: {
    title: "John Doe",
    subtitle: "Full-Stack Developer",
    bio: [
      {
        _type: "block",
        _key: "a1b2c3d4",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "e5f6g7h8",
            text: "I build things for the web.",
            marks: [],
          },
        ],
      },
    ],
    avatar: {
      _type: "image",
      asset: {
        _ref: "image-abc123-200x200-png",
      },
    },
    email: "john@example.com",
    cv: {
      asset: {
        _ref: "file-cv123-pdf",
      },
    },
    socialLinks: [
      { platform: "github", url: "https://github.com/johndoe" },
      { platform: "linkedin", url: "https://linkedin.com/in/johndoe" },
    ],
    availability: "available",
  },
  skills: [
    {
      _id: "skill-react",
      name: "React",
      image: {
        _type: "image",
        asset: { _ref: "image-react-48x48-png" },
      },
      category: "Frontend",
      featured: true,
      order: 1,
      publishedAt: "2024-01-01T00:00:00Z",
    },
    {
      _id: "skill-nextjs",
      name: "Next.js",
      category: "Frontend",
      featured: true,
      order: 2,
      publishedAt: "2024-01-01T00:00:00Z",
    },
    {
      _id: "skill-node",
      name: "Node.js",
      category: "Backend",
      featured: false,
      order: 3,
      publishedAt: "2024-01-01T00:00:00Z",
    },
    {
      _id: "skill-python",
      name: "Python",
      category: "Languages",
      featured: false,
      order: 4,
      publishedAt: "2024-01-01T00:00:00Z",
    },
  ],
  jobs: [
    {
      _id: "job-1",
      company: "Acme Corp",
      role: "Senior Developer",
      startDate: "2022-01-01",
      endDate: "2024-06-30",
      description: [
        {
          _type: "block",
          _key: "job1-desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "job1-span",
              text: "Led development of microservices platform.",
              marks: [],
            },
          ],
        },
      ],
      image: {
        _type: "image",
        asset: { _ref: "image-acme-96x96-png" },
      },
      location: "San Francisco, CA",
      website: "https://acme.example.com",
      skills: [
        { _id: "skill-react", name: "React", category: "Frontend" },
        { _id: "skill-node", name: "Node.js", category: "Backend" },
      ],
      highlights: [
        {
          title: "Reduced API latency by 40%",
          description: "Optimized database queries and implemented caching layer",
          category: "PERF",
        },
        {
          title: "Mentored team of 5 developers",
          description: "Led weekly code reviews and pairing sessions",
          category: "LEAD",
        },
      ],
      order: 1,
      publishedAt: "2024-01-01T00:00:00Z",
    },
    {
      _id: "job-2",
      company: "TechStart",
      role: "Full-Stack Developer",
      startDate: "2019-03-01",
      endDate: "2021-12-31",
      description: [
        {
          _type: "block",
          _key: "job2-desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "job2-span",
              text: "Built and maintained core product features.",
              marks: [],
            },
          ],
        },
      ],
      location: "Remote",
      skills: [
        { _id: "skill-nextjs", name: "Next.js", category: "Frontend" },
        { _id: "skill-python", name: "Python", category: "Languages" },
      ],
      order: 2,
      publishedAt: "2022-01-01T00:00:00Z",
    },
  ],
  studies: [
    {
      _id: "study-1",
      institution: "University of California, Berkeley",
      field: "Computer Science",
      startDate: "2015-08-01",
      endDate: "2019-05-15",
      description: "Bachelor of Science in Computer Science with focus on distributed systems.",
      order: 1,
      publishedAt: "2019-05-15T00:00:00Z",
    },
    {
      _id: "study-2",
      institution: "Stanford University",
      field: "Software Engineering",
      startDate: "2019-09-01",
      endDate: "2021-06-01",
      description: "Master of Science in Software Engineering.",
      order: 2,
      publishedAt: "2021-06-01T00:00:00Z",
    },
  ],
  certifications: [
    {
      _id: "cert-1",
      name: "AWS Solutions Architect",
      date: "2023-06-15",
      url: "https://aws.amazon.com/certification/aws-solutions-architect",
      thumbnail: {
        _type: "image",
        asset: { _ref: "image-aws-192x192-png" },
      },
      order: 1,
      publishedAt: "2023-06-15T00:00:00Z",
    },
    {
      _id: "cert-2",
      name: "Google Cloud Professional",
      date: "2022-11-20",
      order: 2,
      publishedAt: "2022-11-20T00:00:00Z",
    },
  ],
  projects: [
    {
      _id: "project-1",
      title: "Portfolio Site",
      description: [
        {
          _type: "block",
          _key: "proj1-desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "proj1-span",
              text: "A personal portfolio built with Next.js and Sanity CMS, featuring a Tron-inspired theme system.",
              marks: [],
            },
          ],
        },
      ],
      thumbnail: {
        _type: "image",
        asset: { _ref: "image-portfolio-600x340-png" },
      },
      skills: [
        { _id: "skill-react", name: "React", category: "Frontend" },
        { _id: "skill-nextjs", name: "Next.js", category: "Frontend" },
      ],
      liveUrl: "https://portfolio.example.com",
      githubUrl: "https://github.com/johndoe/portfolio",
      featured: true,
      order: 1,
      publishedAt: "2024-06-01T00:00:00Z",
    },
    {
      _id: "project-2",
      title: "Task Manager API",
      description: [
        {
          _type: "block",
          _key: "proj2-desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "proj2-span",
              text: "RESTful API for task management with authentication and real-time updates.",
              marks: [],
            },
          ],
        },
      ],
      skills: [
        { _id: "skill-node", name: "Node.js", category: "Backend" },
        { _id: "skill-python", name: "Python", category: "Languages" },
      ],
      githubUrl: "https://github.com/johndoe/task-manager",
      featured: false,
      order: 2,
      publishedAt: "2024-03-15T00:00:00Z",
    },
    {
      _id: "project-3",
      title: "Cloud Deploy Tool",
      description: [
        {
          _type: "block",
          _key: "proj3-desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "proj3-span",
              text: "CLI tool for automated deployments to major cloud providers.",
              marks: [],
            },
          ],
        },
      ],
      skills: [
        { _id: "skill-node", name: "Node.js", category: "Backend" },
        { _id: "skill-python", name: "Python", category: "Languages" },
      ],
      liveUrl: "https://clouddeploy.example.com",
      githubUrl: "https://github.com/johndoe/cloud-deploy",
      featured: true,
      order: 3,
      publishedAt: "2024-01-10T00:00:00Z",
    },
  ],
}