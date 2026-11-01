import { routeTable, simpleDispatch } from "./routes.mjs";
import { service } from "./service.mjs";
import { guarded, errorResponse, readJson } from "./transport.mjs";
import { fail } from "./errors.mjs";
import { Sunder, Router } from "./generated-sunder.mjs";
export function createApi(db, clock) {
  const app = new Sunder(),
    router = new Router();
  app.silent = true;
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.response.overwrite(errorResponse(e, crypto.randomUUID()));
    }
  });
  for (const [method, path, handler] of routeTable(db, service, clock))
    router[method.toLowerCase()](path, async (ctx) => {
      ctx.response.overwrite(await handler(ctx.event.request, ctx.params));
    });
  app.use(router.middleware);
  return guarded((req) => {
    if (new URL(req.url).search)
      fail("invalid_query", "Parâmetros de URL não são aceitos.", 400);
    return app.handle({ request: req, waitUntil() {} });
  });
}
