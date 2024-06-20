# Peach

Another validation library for TypeScript.

## Features

- Type-safe validation
- Extensible
- Serializable
- Compiles into JSON Schema (?)

## Usage

```ts
import { schemas, createValidator } from 'peach';

const isBase64String = (value: string) =>
  Buffer.from(value, 'base64').toString('utf8') === value;

const p = createValidator({
  schemas: {
    // Pick built-in schemas:
    ...schemas,
    // Or define your own:
    base64: {
      check: isBase64String,
      toJsonSchema: (jsonSchema) => ({
        ...jsonSchema,
        contentEncoding: 'base64',
      }),
    }, 
  },
});

const FileSchema = p.object({
  name: p.string(),
  content: p.pipe(p.string(), p.base64()),
});

console.log(FileSchema); // Schemas are serializable
// {
//   name: ['string'],
//   content: ['string', 'base64'],
// }

const file = p.parse(FileSchema, {
  name: 'test.txt',
  content: 'dGVzdA==',
  extra: 'extra', // This will be ignored
});

// `file` is now typed as `{ name: string; content: string }`

console.log(file);
// {
//   name: 'test.txt',
//   content: 'dGVzdA==',
// }

console.log(p.toJsonSchema(FileSchema));
// {
//   type: 'object',
//   properties: {
//     name: { type: 'string' },
//     content: { type: 'string', contentEncoding: 'base64' },
//   },
//   required: ['name', 'content'],
//   additionalProperties: false,
// }
```
