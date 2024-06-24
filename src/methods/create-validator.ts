import type {Schema} from "../schema.js";
import type {Simplify} from "type-fest";

export const createValidator = <
  const TSchemas extends Record<string, Schema<unknown, unknown>>,
>({schemas}: {
  schemas: TSchemas
}) => {
  return {
    parse: <
      TSchemaName extends keyof TSchemas,
      TSchema extends TSchemas[TSchemaName],
      // @TODO: Improve `input` type to be `TInput` inferred from `TSchema`
    >(schema: TSchemaName, input: unknown) => {
      const result = (schemas[schema] as TSchema).parse(input);

      if ('issues' in result) {
        throw new Error(result.issues.map(issue => issue.message).join('\n'));
      }

      return result.value
    }
  }
}
