import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the branded homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Móveis Gonçalves/);
  assert.match(html, /Levando qualidade e conforto à sua casa/);
  assert.match(html, /href="\/produtos"/);
  assert.match(html, /id="representantes"/);
  assert.match(html, /Ir para o conteúdo principal/);
  assert.match(html, /rel="canonical" href="https:\/\/moveisgoncalves\.com\.br\/"/);
  assert.match(html, /FAQPage/);
  assert.match(html, /O que a Móveis Gonçalves fabrica/);
  assert.match(html, /href="\/llms\.txt"/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("server-renders a product detail with catalog facts", async () => {
  const response = await render("/produtos/cozinha-veneza");
  assert.equal(response.status, 200);

  const html = await response.text();
  const normalizedHtml = html.replace(/<!--.*?-->/g, "");
  assert.match(normalizedHtml, /Veneza/);
  assert.match(normalizedHtml, /Medidas disponíveis/);
  assert.match(normalizedHtml, /2,07 m/);
  assert.match(normalizedHtml, /página 2 do catálogo fornecido/);
  assert.match(normalizedHtml, /application\/ld\+json/);
  assert.match(normalizedHtml, /BreadcrumbList/);
  assert.match(normalizedHtml, /"@type":"Product"/);
});
