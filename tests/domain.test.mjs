import { test } from "node:test";
import assert from "node:assert/strict";
import { service } from "../server/service.mjs";

test("all guests seated once with bounded table capacity", () => {
  for (const p of service.meta.presets) {
    const r = service.compute(p.input);
    assert.equal(r.found, true);
    const ids = r.tables.flatMap((t) => t.guests.map((g) => g.id));
    assert.equal(ids.length, p.input.guests);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(r.tables.every((t) => t.guests.length <= p.input.capacity));
  }
});
test("every blocked pair is separated", () => {
  for (const p of service.meta.presets) {
    const r = service.compute(p.input);
    for (const pair of p.input.blocked_pairs) {
      const [a, b] = pair.split(":");
      assert.ok(
        r.tables.every(
          (t) =>
            !t.guests.some((g) => g.id === a) ||
            !t.guests.some((g) => g.id === b),
        ),
      );
    }
  }
});
test("capacity shortfall is honest and not a partially filled success", () => {
  const r = service.compute({
    ...service.meta.default_input,
    guests: 12,
    tables: 2,
    capacity: 3,
  });
  assert.equal(r.found, false);
  assert.deepEqual(r.tables, []);
});
test("three mutually incompatible guests cannot fit in two tables", () => {
  const r = service.compute({
    ...service.meta.default_input,
    guests: 8,
    tables: 2,
    capacity: 6,
    blocked_pairs: ["g1:g2", "g1:g3", "g2:g3"],
  });
  assert.equal(r.found, false);
  assert.equal(r.exhausted, false);
});
test("search remains bounded deterministic and CSV only contains selected guests", () => {
  const p = service.meta.default_input,
    r = service.compute(p);
  assert.ok(r.nodes_examined <= 25000);
  assert.deepEqual(r, service.compute(p));
  assert.equal(service.export(p).text.trim().split("\n").length, p.guests + 1);
});
test("self reverse duplicate out-of-list and invalid guest counts rejected", () => {
  for (const x of [
    { blocked_pairs: ["g1:g1"] },
    { blocked_pairs: ["g1:g2", "g2:g1"] },
    { guests: 8, blocked_pairs: ["g1:g12"] },
    { guests: 13 },
    { extra: 1 },
  ])
    assert.throws(() =>
      service.compute({ ...service.meta.default_input, ...x }),
    );
});
