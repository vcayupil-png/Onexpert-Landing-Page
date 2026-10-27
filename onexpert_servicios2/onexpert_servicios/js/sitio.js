(function () {
  'use strict';
  var raiz = document.documentElement;
  var botonMenu = document.querySelector('.menu-boton');
  var menu = document.getElementById('panel-menu');
  if (botonMenu && menu) {
    var abrirMenu = function (abrir) {
      raiz.classList.toggle('menu-abierto', abrir);
      botonMenu.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
      if (abrir) menu.removeAttribute('inert'); else menu.setAttribute('inert', '');
    };
    botonMenu.addEventListener('click', function () {
      abrirMenu(!raiz.classList.contains('menu-abierto'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.hasAttribute('data-cerrar-menu')) abrirMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && raiz.classList.contains('menu-abierto')) {
        abrirMenu(false);
        botonMenu.focus();
      }
    });
  }
  function alternar(boton, contenedor, abrir) {
    var abierto = typeof abrir === 'boolean' ? !abrir : boton.getAttribute('aria-expanded') === 'true';
    boton.setAttribute('aria-expanded', abierto ? 'false' : 'true');
    if (contenedor) contenedor.classList.toggle('is-abierta', !abierto);
  }
  [
    ['.pregunta__boton', '.pregunta'],
    ['.mosaico__boton', '.mosaico__tarjeta'],
    ['.lectura__boton', '.lectura']
  ].forEach(function (par) {
    document.querySelectorAll(par[0]).forEach(function (boton) {
      var contenedor = boton.closest(par[1]);
      boton.addEventListener('click', function () { alternar(boton, contenedor); });
    });
  });
  function abrirDestino() {
    var destino = document.querySelector('.pregunta:target');
    var boton = destino && destino.querySelector('.pregunta__boton');
    if (boton) alternar(boton, destino, true);
  }
  abrirDestino();
  window.addEventListener('hashchange', abrirDestino);
  var filtros = [].slice.call(document.querySelectorAll('[data-filtro-cat]'));
  if (filtros.length) {
    var tarjetas = [].slice.call(document.querySelectorAll('.guia-tarjeta[data-cat]'));
    filtros.forEach(function (b) {
      b.addEventListener('click', function () {
        var cat = b.getAttribute('data-filtro-cat');
        filtros.forEach(function (x) {
          x.setAttribute('aria-pressed', String(x === b));
        });
        tarjetas.forEach(function (t) {
          t.hidden = !(cat === 'todas' || t.getAttribute('data-cat') === cat);
        });
      });
    });
  }
})();
