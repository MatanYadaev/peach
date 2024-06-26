import type { Schema } from "../../schema.js";

export const string: Schema<unknown, string> = {
  parse: ({value, path, message}) => {
    if (typeof value !== 'string') {
      return {
        issues: [
          {
            ...(path !== undefined ? { path } : {}),
            received: value,
            expected: 'string',
            message: message ?? 'Value must be a string',
          }
        ],
      };
    }

    return {
      value,
    };
  },
}
