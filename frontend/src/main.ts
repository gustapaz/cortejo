import Backbone from "backbone";
import { model } from "./model";
import { canvasStage } from "./canvas";
import { motionToggle } from "./client";
const state = new Backbone.Model();
let last: any,
  started = 0;
const stage = canvasStage(
  document.querySelector<HTMLCanvasElement>("#salon")!,
  (c, w, h, t, r) => {
    c.clearRect(0, 0, w, h);
    if (!r?.found) return false;
    if (last !== r) {
      last = r;
      started = performance.now();
    }
    const progress = t ? Math.min(1, (performance.now() - started) / 1100) : 1,
      cols = r.tables.length === 4 ? 2 : r.tables.length,
      rows = Math.ceil(r.tables.length / cols),
      scale = Math.min(w / (cols * 220), h / (rows * 240), 1.25),
      radius = 57 * scale;
    c.font = "12px Georgia";
    c.textAlign = "center";
    r.tables.forEach((table: any, i: number) => {
      const x = w / 2 + ((i % cols) - (cols - 1) / 2) * 225 * scale,
        y = h / 2 + (Math.floor(i / cols) - (rows - 1) / 2) * 245 * scale;
      c.fillStyle = "#e4dccb";
      c.strokeStyle = "#9c7c5844";
      c.lineWidth = 1;
      c.beginPath();
      c.arc(x, y, radius, 0, Math.PI * 2);
      c.fill();
      c.stroke();
      c.fillStyle = "#73513b";
      c.fillText(table.id, x, y - 3);
      c.font = "8px monospace";
      c.fillText(table.guests.length + "/" + table.capacity, x, y + 13);
      table.guests.forEach((g: any, j: number) => {
        const ang = (j / table.capacity) * Math.PI * 2 - Math.PI / 2,
          rad =
            (radius + 30 * scale) *
            (0.35 + 0.65 * (1 - Math.pow(1 - progress, 3))),
          gx = x + Math.cos(ang) * rad,
          gy = y + Math.sin(ang) * rad;
        c.beginPath();
        c.arc(gx, gy, 17 * scale, 0, Math.PI * 2);
        c.fillStyle = ["#a35236", "#4e6c55", "#cfaa52"][g.group];
        c.fill();
        c.fillStyle = "#fff9ed";
        c.font = `${12 * scale}px Georgia`;
        c.fillText(g.initial, gx, gy + 4 * scale);
        c.fillStyle = "#5c4637";
        c.font = `${9 * scale}px Georgia`;
        c.fillText(
          g.name,
          x + Math.cos(ang) * (radius + 64 * scale),
          y + Math.sin(ang) * (radius + 64 * scale) + 3,
        );
      });
    });
    return progress < 1;
  },
);
const a = model(
    "cortejo",
    () => state.set("revision", (state.get("revision") || 0) + 1),
    (r) => stage.set(r),
  ),
  d = a.d,
  host = document.querySelector("#app-root")!;
let blockA = "g1",
  blockB = "g2";
const el = (tag: string, text = "", cls = "") => {
  const n = document.createElement(tag);
  n.textContent = text;
  if (cls) n.className = cls;
  return n;
};
const button = (text: string, fn: () => any) => {
  const n = el("button", text) as HTMLButtonElement;
  n.disabled = d.busy;
  n.onclick = fn;
  return n;
};
const select = (
  label: string,
  value: any,
  choices: any[],
  fn: (v: string) => void,
) => {
  const l = el("label", label),
    s = document.createElement("select");
  s.setAttribute("aria-label", label);
  for (const [id, name] of choices) {
    const o = document.createElement("option");
    o.value = String(id);
    o.textContent = name;
    s.append(o);
  }
  s.value = String(value);
  s.disabled = d.busy;
  s.onchange = () => fn(s.value);
  l.append(s);
  return l;
};
function render() {
  const previous = document.activeElement as HTMLInputElement | null,
    key = previous?.getAttribute("aria-label"),
    start = previous?.selectionStart;
  const fragment = document.createDocumentFragment();
  if (d.catalog) {
    const controls = el("div", "", "settings");
    for (const [field, label, min, max] of [
      ["guests", "Convidados", 8, 12],
      ["tables", "Mesas", 2, 4],
      ["capacity", "Lugares por mesa", 3, 6],
    ] as const)
      controls.append(
        select(
          label,
          d.input[field],
          Array.from({ length: max - min + 1 }, (_, i) => [
            i + min,
            String(i + min),
          ]),
          (v) => {
            a.change(field, +v);
            if (field === "guests")
              a.change(
                "blocked_pairs",
                d.input.blocked_pairs.filter((x: string) =>
                  x.split(":").every((g) => +g.slice(1) <= +v),
                ),
              );
          },
        ),
      );
    controls.append(
      select(
        "Intenção",
        d.input.policy,
        [
          ["mixed", "Misturar encontros"],
          ["together", "Aproximar afinidades"],
        ],
        (v) => a.change("policy", v),
      ),
    );
    fragment.append(
      controls,
      button("Compor os encontros ↗", () => a.run()),
    );
    const presets = el("div", "", "examples");
    d.catalog.presets.forEach((p: any) =>
      presets.append(button(p.name + " ↗", () => a.preset(p))),
    );
    fragment.append(presets);
  } else fragment.append(button("Tentar abrir o salão", () => a.init()));
  const status = el("p", d.error || d.status, "status");
  status.setAttribute("role", "status");
  fragment.append(status);
  if (d.catalog) {
    const details = document.createElement("details");
    details.append(el("summary", "Pessoas que precisam de mesas diferentes"));
    const guests = d.catalog.people.slice(0, d.input.guests);
    if (!guests.some((g: any) => g.id === blockA)) blockA = "g1";
    if (!guests.some((g: any) => g.id === blockB)) blockB = "g2";
    const choices = guests.map((g: any) => [g.id, g.name]);
    details.append(
      select("Primeira pessoa", blockA, choices, (v) => {
        blockA = v;
      }),
      select("Segunda pessoa", blockB, choices, (v) => {
        blockB = v;
      }),
      button("Separar este par", () => {
        if (blockA === blockB) {
          d.error = "Escolha duas pessoas diferentes.";
          state.trigger("change");
          return;
        }
        const pair = [blockA, blockB]
          .sort((a, b) => +a.slice(1) - +b.slice(1))
          .join(":");
        if (!d.input.blocked_pairs.includes(pair))
          a.change("blocked_pairs", [...d.input.blocked_pairs, pair]);
      }),
    );
    d.input.blocked_pairs.forEach((pair: string) =>
      details.append(
        button(
          pair
            .split(":")
            .map((id) => d.catalog.people.find((g: any) => g.id === id).name)
            .join(" / ") + " · remover",
          () =>
            a.change(
              "blocked_pairs",
              d.input.blocked_pairs.filter((x: string) => x !== pair),
            ),
        ),
      ),
    );
    fragment.append(details);
  }
  if (d.result) {
    const result = el("div", "", "guestlist");
    result.append(
      el(
        "h2",
        d.result.found ? "Os lugares encontrados." : "Ainda falta um encontro.",
      ),
    );
    if (!d.result.found) result.append(el("p", d.result.reason));
    else {
      const tables = el("div", "", "table-lists");
      d.result.tables.forEach((t: any) => {
        const box = el("section");
        box.append(el("h3", t.id + " · " + t.guests.length + " lugares"));
        const ul = el("ul");
        t.guests.forEach((g: any) =>
          ul.append(el("li", g.name + " — " + d.catalog.groups[g.group])),
        );
        box.append(ul);
        tables.append(box);
      });
      result.append(
        tables,
        el(
          "p",
          d.result.exhausted
            ? "Busca limitada: melhor composição encontrada; não há garantia de ótimo."
            : "Busca concluída dentro do orçamento.",
        ),
      );
    }
    result.append(
      el("small", d.result.nodes_examined + " combinações examinadas"),
    );
    fragment.append(result);
  }
  const archive = document.createElement("details");
  archive.className = "archive";
  archive.append(el("summary", "Guardar este encontro"));
  const label = el("label", "Nome do encontro"),
    input = document.createElement("input");
  input.value = d.title;
  input.maxLength = 48;
  input.setAttribute("aria-label", "Nome do encontro");
  input.oninput = () => a.title(input.value);
  label.append(input);
  archive.append(
    label,
    button(d.current && d.owns ? "Salvar alterações" : "Guardar encontro", () =>
      a.save(),
    ),
  );
  if (d.current)
    archive.append(
      button("Reler do banco", () => a.open(d.current.id)),
      button("Exportar CSV", () => a.download()),
      ...(d.owns
        ? [
            button(d.current.published ? "Encerrar link" : "Criar link", () =>
              a.share(),
            ),
          ]
        : []),
      button("Novo encontro", () => a.fresh()),
    );
  if (d.link) {
    const link = el("a", "Abrir encontro compartilhado ↗") as HTMLAnchorElement;
    link.href = d.link;
    link.target = "_blank";
    link.rel = "noreferrer";
    archive.append(link);
  }
  archive.append(
    el("small", "Só nomes fictícios. Retenção de 7 dias; edição nesta aba."),
  );
  d.archive.forEach((x: any) =>
    archive.append(button(x.title + " ↗", () => a.open(x.id))),
  );
  fragment.append(archive);
  const opened = [...host.querySelectorAll("details")].map((x) => x.open);
  host.replaceChildren(fragment);
  host
    .querySelectorAll("details")
    .forEach((x, i) => (x.open = opened[i] || false));
  if (key) {
    const control = [
      ...host.querySelectorAll<HTMLInputElement>("input,select"),
    ].find((x) => x.getAttribute("aria-label") === key);
    control?.focus({ preventScroll: true });
    if (control?.tagName === "INPUT" && start != null)
      control.setSelectionRange(start, start);
  }
}
state.on("change", render);
render();
motionToggle((v) => stage.pause(v));
void a.init();
