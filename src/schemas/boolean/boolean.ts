import type {Schema} from "../../schema.js";

export const boolean: Schema<unknown, boolean> = {
  parse: ({value, path, message}) => {
    if (typeof value !== 'boolean') {
      return {
        issues: [
          {
            ...(path !== undefined ? {path} : {}),
            received: value,
            expected: 'boolean',
            message: message ?? 'Value must be a boolean',
          }
        ]
      }
    }

    return {
      value,
    }
  },
};
