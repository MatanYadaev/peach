import type {Issue} from "./issue.js";

export type SchemaOutput<TOutput> = {
  issues: Issue[]
} | {
  value: TOutput
}
