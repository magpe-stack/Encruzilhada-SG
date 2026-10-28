"use strict";

const CACHE_NAME = "encruzilhada-v1";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icon.svg"
];

self.addEventListener("install", function (evento) {
  evento.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ARQUIVOS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (evento) {
  evento.waitUntil(
    caches.keys().then(function (chaves) {
      return Promise.all(
        chaves
          .filter(function (chave) { return chave !== CACHE_NAME; })
          .map(function (chave) { return caches.delete(chave); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (evento) {
  const requisicao = evento.request;
  if (requisicao.method !== "GET") return;

  const url = new URL(requisicao.url);
  if (url.origin !== self.location.origin) return;

  evento.respondWith(
    caches.match(requisicao).then(function (emCache) {
      if (emCache) return emCache;
      return fetch(requisicao).then(function (resposta) {
        if (resposta && resposta.status === 200) {
          const copia = resposta.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(requisicao, copia);
          });
        }
        return resposta;
      }).catch(function () {
        if (requisicao.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
