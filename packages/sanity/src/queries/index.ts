import groq from "groq"

export const profileQuery = groq`*[_type == "profile"][0]{
  title,
  subtitle,
  bio,
  avatar,
  email,
  cv,
  socialLinks[]{
    platform,
    url
  }
}`

export const skillsQuery = groq`*[_type == "skill"] | order(order asc){
  _id,
  name,
  image,
  category,
  order,
  publishedAt
}`

export const jobsQuery = groq`*[_type == "job"] | order(order asc){
  _id,
  company,
  role,
  startDate,
  endDate,
  description,
  website,
  skills[]->{ _id, name, image, category },
  order,
  publishedAt
}`

export const studiesQuery = groq`*[_type == "study"] | order(order asc){
  _id,
  institution,
  field,
  startDate,
  endDate,
  description,
  order,
  publishedAt
}`

export const certificationsQuery = groq`*[_type == "certification"] | order(order asc){
  _id,
  name,
  date,
  url,
  thumbnail,
  order,
  publishedAt
}`

export const projectsQuery = groq`*[_type == "project"] | order(featured desc, order asc){
  _id,
  title,
  description,
  thumbnail,
  skills[]->{ _id, name, image, category },
  liveUrl,
  githubUrl,
  featured,
  order,
  publishedAt
}`

export const homePageQuery = groq`{
  "profile": ${profileQuery},
  "skills": ${skillsQuery},
  "jobs": ${jobsQuery},
  "studies": ${studiesQuery},
  "certifications": ${certificationsQuery},
  "projects": ${projectsQuery}
}`
