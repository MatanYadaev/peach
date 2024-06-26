# Peach

Another validation library for TypeScript.

## Features

- Type-safe validation
- Extensible
- Serializable
- Compiles into JSON Schema
- Internationalization

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
  name: p.pipe(p.string('Name is required'), p.trim(), p.minLength(1, 'Name must be at least 1 character long')),
  content: p.pipe(p.string('Content is required'), p.base64('Content must be a base64 string')),
});

console.log(FileSchema); // Schemas are serializable
// {
//   name: [
//     { type: 'string', message: 'Name is required' },
//     { type: 'trim' },
//     { type: 'minLength', min: 1, message: 'Name must be at least 1 character long' },
//   ],
//   content: [
//     { type: 'string', message: 'Content is required' },
//     { type: 'base64', message: 'Content must be a base64 string' },
//   ],
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

// Schemas can be converted to JSON Schema
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
