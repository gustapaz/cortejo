import { inputSchema } from "./input-schema.mjs";
import { fail } from "./errors.mjs";
import * as s from "superstruct";
function convert(p) {
  let r;
  if (p.enum) return s.enums(p.enum);
  if (p.type === "object")
    return s.object(
      Object.fromEntries(
        Object.entries(p.properties).map(([k, v]) => [k, convert(v)]),
      ),
    );
  if (p.type === "array") {
    r = s.array(convert(p.items));
    r = s.size(r, p.minItems ?? 0, p.maxItems ?? 10000);
    if (p.uniqueItems)
      r = s.refine(r, "unique", (v) => new Set(v).size === v.length);
    return r;
  }
  if (p.type === "boolean") return s.boolean();
  if (p.type === "string") {
    r = s.string();
    if (p.pattern) r = s.pattern(r, new RegExp(p.pattern));
    return s.size(r, p.minLength ?? 0, p.maxLength ?? 10000);
  }
  r = p.type === "integer" ? s.integer() : s.number();
  return s.refine(
    r,
    "bounds",
    (v) =>
      Number.isFinite(v) &&
      (p.minimum === undefined || v >= p.minimum) &&
      (p.maximum === undefined || v <= p.maximum),
  );
}
const schema = convert(inputSchema);
export function validateInput(input) {
  try {
    s.assert(input, schema);
    return input;
  } catch {
    fail("invalid_input", "Confira tipos, limites e campos dos convidados.");
  }
}
