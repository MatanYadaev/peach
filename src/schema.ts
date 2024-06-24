import type {SchemaOutput} from "./schema-output.js";

export type Schema<TInput, TOutput> = {
  parse: (value: TInput, path?: string[]) => SchemaOutput<TOutput>;
}
