import type {Schema} from "../../schema.js";

export const boolean: Schema<unknown, boolean> = {
  parse: (value: unknown, path) => {
    if (typeof value !== 'boolean') {
      return {
        issues: [
          {
            ...(path !== undefined ? {path} : {}),
            message: 'Value must be a boolean',
          }
        ]
      }
    }

    return {
      value,
    }
  },
};
