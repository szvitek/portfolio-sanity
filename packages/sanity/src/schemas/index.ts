import type { SchemaTypeDefinition } from "sanity"
import { profile } from "./profile"
import { skill } from "./skill"
import { job } from "./job"
import { study } from "./study"
import { certification } from "./certification"
import { project } from "./project"
import { socialLink } from "./socialLink"
import { blockContent } from "./blockContent"

export const schemaTypes: SchemaTypeDefinition[] = [
  profile,
  skill,
  job,
  study,
  certification,
  project,
  socialLink,
  blockContent,
]

export {
  profile,
  skill,
  job,
  study,
  certification,
  project,
  socialLink,
  blockContent,
}
