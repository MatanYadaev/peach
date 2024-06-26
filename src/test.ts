import {createValidator} from "./methods/create-validator.js";
import * as schemas from "./schemas/index.js";
import {expectTypeOf} from "vitest";


const p = createValidator({
  schemas: {
    ...schemas,
  }
})

const validatedString = p.parse('string', 123123)
expectTypeOf(validatedString).toMatchTypeOf<string>()

const validatedBoolean = p.parse('boolean', true)
expectTypeOf(validatedBoolean).toMatchTypeOf<boolean>()

// @ts-expect-error
const validatedTrimmedString = p.parse('trim', true)
const validatedTrimmedString2 = p.parse('trim', ' test ')
expectTypeOf(validatedTrimmedString2).toMatchTypeOf<string>()

