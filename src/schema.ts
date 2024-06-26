import type {SchemaOutput} from "./schema-output.js";

export type Schema<TInput, TOutput> = {
  parse: ({value, path, message}: {
    value: TInput,
    path?: string[],
    message?: string,
  }) => SchemaOutput<TOutput>
}
