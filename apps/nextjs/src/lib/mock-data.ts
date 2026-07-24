import type { ProjectData } from "@/lib/sanity"

export const MOCK_PROJECTS: ProjectData[] = [
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
]
