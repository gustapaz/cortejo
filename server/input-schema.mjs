export const inputSchema = {
  type: "object",
  additionalProperties: false,
  required: ["guests", "tables", "capacity", "policy", "blocked_pairs"],
  properties: {
    guests: { type: "integer", minimum: 8, maximum: 12 },
    tables: { type: "integer", minimum: 2, maximum: 4 },
    capacity: { type: "integer", minimum: 3, maximum: 6 },
    policy: { type: "string", enum: ["together", "mixed"] },
    blocked_pairs: {
      type: "array",
      uniqueItems: true,
      maxItems: 32,
      items: {
        type: "string",
        pattern: "^g(?:[1-9]|1[0-2]):g(?:[1-9]|1[0-2])$",
      },
    },
  },
};
