import { validateInput } from "./validator.mjs";
import { fail } from "./errors.mjs";
export const people = [
  "Amora",
  "Bento",
  "Cora",
  "Davi",
  "Elisa",
  "Felipe",
  "Gael",
  "Helena",
  "Íris",
  "Joaquim",
  "Lia",
  "Noa",
].map((name, i) => ({
  id: "g" + (i + 1),
  name,
  group: i % 3,
  initial: name[0],
}));
export const meta = {
  slug: "cortejo",
  title: "CORTEJO",
  engine: "sunder-superstruct-seating",
  people,
  groups: ["Estúdio", "Oficina", "Ateliê"],
  default_input: {
    guests: 10,
    tables: 3,
    capacity: 4,
    policy: "mixed",
    blocked_pairs: ["g1:g2"],
  },
  presets: [
    {
      name: "Boas misturas",
      input: {
        guests: 10,
        tables: 3,
        capacity: 4,
        policy: "mixed",
        blocked_pairs: ["g1:g2"],
      },
    },
    {
      name: "Afinidades",
      input: {
        guests: 12,
        tables: 3,
        capacity: 4,
        policy: "together",
        blocked_pairs: [],
      },
    },
    {
      name: "Salão íntimo",
      input: {
        guests: 8,
        tables: 2,
        capacity: 4,
        policy: "mixed",
        blocked_pairs: ["g1:g4", "g3:g7"],
      },
    },
  ],
  note: "Nomes e grupos são fictícios. Não use dados pessoais. Busca determinística limitada a 25 mil nós; indica a melhor composição encontrada, sem promessa de ótimo global.",
};
export function validate(raw) {
  const p = validateInput(raw),
    seen = new Set();
  for (const pair of p.blocked_pairs) {
    const [a, b] = pair.split(":").map((x) => +x.slice(1));
    if (a === b || a > p.guests || b > p.guests)
      fail(
        "invalid_input",
        "Bloqueios precisam envolver convidados distintos desta lista.",
      );
    const key = [a, b].sort((a, b) => a - b).join(":");
    if (seen.has(key))
      fail("invalid_input", "Não repita um bloqueio em ordem inversa.");
    seen.add(key);
  }
  return p;
}
export function compute(raw) {
  const p = validate(raw),
    guests = people.slice(0, p.guests);
  if (p.guests > p.tables * p.capacity)
    return {
      found: false,
      tables: [],
      reason: "Faltam lugares. Aumente mesas ou capacidade.",
      nodes_examined: 0,
      exhausted: false,
    };
  const conflict = (a, b) =>
      p.blocked_pairs.includes(a + ":" + b) ||
      p.blocked_pairs.includes(b + ":" + a),
    degree = (g) => guests.filter((x) => conflict(g.id, x.id)).length,
    order = [...guests].sort(
      (a, b) => degree(b) - degree(a) || a.id.localeCompare(b.id),
    ),
    tables = Array.from({ length: p.tables }, () => []);
  let best = null,
    bestScore = -Infinity,
    nodes = 0,
    exhausted = false;
  function visit(i, score) {
    if (++nodes > 25000) {
      exhausted = true;
      return;
    }
    if (i === order.length) {
      if (score > bestScore) {
        bestScore = score;
        best = tables.map((t) => [...t]);
      }
      return;
    }
    const g = order[i];
    let emptyUsed = false;
    const candidates = tables
      .map((t, index) => ({
        t,
        index,
        increment: t.reduce(
          (s, x) =>
            s +
            (p.policy === "together"
              ? x.group === g.group
                ? 3
                : 0
              : x.group !== g.group
                ? 2
                : 0),
          0,
        ),
      }))
      .sort((a, b) => b.increment - a.increment || a.index - b.index);
    for (const { t, increment } of candidates) {
      if (t.length >= p.capacity || t.some((x) => conflict(x.id, g.id)))
        continue;
      if (!t.length) {
        if (emptyUsed) continue;
        emptyUsed = true;
      }
      t.push(g);
      visit(i + 1, score + increment);
      t.pop();
      if (exhausted) return;
    }
  }
  visit(0, 0);
  return best
    ? {
        found: true,
        tables: best.map((guests, i) => ({
          id: "T" + (i + 1),
          guests,
          capacity: p.capacity,
        })),
        score: bestScore,
        nodes_examined: Math.min(nodes, 25000),
        exhausted,
        guest_count: p.guests,
        method: "bounded deterministic backtracking",
      }
    : {
        found: false,
        tables: [],
        reason: exhausted
          ? "A busca atingiu o limite sem encontrar uma composição. Relaxe os bloqueios."
          : "Os bloqueios impedem uma composição com estes lugares.",
        nodes_examined: Math.min(nodes, 25000),
        exhausted,
      };
}
export function exportResult(input) {
  const r = compute(input);
  return {
    type: "text/csv; charset=utf-8",
    extension: "csv",
    text:
      "mesa,convidado,grupo\n" +
      r.tables
        .flatMap((t) =>
          t.guests.map((g) => [t.id, g.name, meta.groups[g.group]].join(",")),
        )
        .join("\n") +
      "\n",
  };
}
export const service = { meta, validate, compute, export: exportResult };
