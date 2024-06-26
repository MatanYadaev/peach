import type { Schema } from "../../schema.js";

export const trim: Schema<string, string> = {
  parse: ({value, path, message}) => {
    return {
      value: value.trim(),
    };
  },
}
