import {createValidator} from "./methods/create-validator.js";
import * as schemas from "./schemas/index.js";
import {expectTypeOf} from "vitest";


const p = createValidator({
  schemas: {
    ...schemas,
  }
})

const validatedString = p.parse('string', 'test')
expectTypeOf(validatedString).toMatchTypeOf<string>()
const validatedBoolean = p.parse('boolean', true)
expectTypeOf(validatedBoolean).toMatchTypeOf<boolean>()
