import type {Schema} from "../schema.js";

type ExtractInput<T> = T extends Schema<infer TInput, any> ? TInput : never
type ExtractOutput<T> = T extends Schema<any, infer TOutput> ? TOutput : never

export const createValidator = <
  const TSchemas extends Record<string, Schema<any, any>>,
>({schemas}: {
  schemas: TSchemas
}) => {
  return {
    parse: <
      TSchemaName extends keyof TSchemas,
      TSchema extends TSchemas[TSchemaName],
      TInput extends ExtractInput<TSchema>,
      TOutput extends ExtractOutput<TSchema>,
    >(schema: TSchemaName, value: TInput): TOutput => {
      let result;

      try {
        result = (schemas[schema] as TSchema).parse({value});
      } catch (error) {
        throw new Error('Error while parsing the schema', {cause: error});
      }

      if ('issues' in result) {
        throw new Error(result.issues.map(issue => issue.message).join('\n'));
      }

      return result.value as TOutput;
    }
  }
}
