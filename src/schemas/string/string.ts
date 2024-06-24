import type { Schema } from "../../schema.js";

export const string: Schema<unknown, string> = {
  parse: (value, path) => {
    if (typeof value !== 'string') {
      return {
        issues: [
          {
            ...(path !== undefined ? { path } : {}),
            message: 'Value must be a string',
          }
        ],
      };
    }

    return {
      value,
    };
  },
}
