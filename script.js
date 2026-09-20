(function () {
  "use strict";

  /* ============ NOMBRE DE LA PERSONA ============ */
  /* Cambia solo esta línea para reutilizar la plantilla con otro nombre */
  var NOMBRE_DESTINATARIO = "Cielo";
  var elNombre = document.getElementById("nombre-destinatario");
  if (elNombre) elNombre.textContent = NOMBRE_DESTINATARIO;

  /* ============ FONDO VIVO: pétalos, doodles, mariposas ============ */
  function iniciarFondo() {
    var capaPetalos = document.getElementById("petalos");
    for (var i = 0; i < 20; i++) {
      var p = document.createElement("div");
      p.className = "petalo";
      var s = 0.55 + Math.random();
      p.style.cssText +=
        "left:" + Math.random() * 100 + "vw;" +
        "width:" + 15 * s + "px;height:" + 22 * s + "px;" +
        "opacity:" + (0.3 + Math.random() * 0.5).toFixed(2) + ";" +
        "animation-duration:" + (7 + Math.random() * 8) + "s;" +
        "animation-delay:" + -Math.random() * 12 + "s";
      capaPetalos.appendChild(p);
    }

    var formas = ["✦", "♡", "✧", "❀", "✿", "✩"];
    var capaDoodles = document.getElementById("doodles");
    for (var j = 0; j < 16; j++) {
      var d = document.createElement("span");
      d.className = "doodle";
      d.textContent = formas[j % formas.length];
      d.style.cssText +=
        "left:" + Math.random() * 94 + "vw;" +
        "top:" + Math.random() * 94 + "vh;" +
        "font-size:" + (14 + Math.random() * 20) + "px;" +
        "animation-delay:" + -Math.random() * 5 + "s;" +
        "animation-duration:" + (4 + Math.random() * 3) + "s";
      capaDoodles.appendChild(d);
    }

    var NS = "http://www.w3.org/2000/svg";
    var colores = [
      ["#f6b93b", "#e58e26"],
      ["#ffd97d", "#f0a202"],
      ["#f4a3c1", "#e07b9a"],
      ["#fff0b8", "#f5c542"],
    ];
    var capaMariposas = document.getElementById("mariposas");
    for (var m = 0; m < 5; m++) {
      var w = colores[m % colores.length];
      var b = document.createElement("div");
      b.className = "mariposa";
      var sz = 24 + Math.random() * 20;
      b.style.cssText =
        "width:" + sz + "px;top:" + (6 + Math.random() * 78) + "vh;left:-14vw;" +
        "animation-duration:" + (16 + Math.random() * 16) + "s;" +
        "animation-delay:" + -Math.random() * 20 + "s";
      b.innerHTML =
        '<svg viewBox="0 0 100 80" xmlns="' + NS + '">' +
        '<g class="ala" style="animation-delay:' + -Math.random() * 0.3 + 's">' +
        '<path d="M50 40 C22 2 -6 12 6 34 C14 50 36 52 50 40Z" fill="' + w[0] + '" opacity=".93"/>' +
        '<path d="M50 42 C26 46 8 62 22 74 C36 84 48 62 50 42Z" fill="' + w[1] + '" opacity=".93"/></g>' +
        '<g class="ala" style="animation-delay:' + -Math.random() * 0.3 + 's">' +
        '<path d="M50 40 C78 2 106 12 94 34 C86 50 64 52 50 40Z" fill="' + w[0] + '" opacity=".93"/>' +
        '<path d="M50 42 C74 46 92 62 78 74 C64 84 52 62 50 42Z" fill="' + w[1] + '" opacity=".93"/></g>' +
        '<ellipse cx="50" cy="44" rx="3.4" ry="15" fill="#4a3411"/>' +
        '<path d="M50 30 C46 20 42 16 38 14 M50 30 C54 20 58 16 62 14" stroke="#4a3411" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';
      capaMariposas.appendChild(b);
    }
  }

  /* ============ NAVEGACIÓN ENTRE PASOS ============ */
  var puntosProgreso = document.querySelectorAll(".progreso .punto");

  function actualizarProgreso(numeroPaso) {
    puntosProgreso.forEach(function (punto) {
      var n = parseInt(punto.getAttribute("data-paso"), 10);
      punto.classList.remove("activo", "completado");
      if (n === numeroPaso) punto.classList.add("activo");
      else if (n < numeroPaso) punto.classList.add("completado");
    });
  }

  function irAPaso(id) {
    var actual = document.querySelector(".paso:not(.oculto)");
    var siguiente = document.getElementById(id);
    var numeroPaso = parseInt(siguiente.getAttribute("data-paso"), 10);

    function mostrarSiguiente() {
      if (actual) {
        actual.classList.add("oculto");
        actual.classList.remove("saliendo");
      }
      siguiente.classList.remove("oculto");
      siguiente.scrollIntoView({ behavior: "smooth", block: "start" });
      if (numeroPaso) actualizarProgreso(numeroPaso);
    }

    if (actual) {
      actual.classList.add("saliendo");
      setTimeout(mostrarSiguiente, 420);
    } else {
      mostrarSiguiente();
    }
  }

  /* ============ PASO 1 → 2: portada → carta ============ */
  document.getElementById("btn-portada").addEventListener("click", function () {
    irAPaso("paso-carta");
    iniciarMusica();
  });

  /* ============ PASO 2 → 3: carta → flores ============ */
  document.getElementById("btn-carta").addEventListener("click", function () {
    irAPaso("paso-flores");
  });

  /* ============ PASO 3: flores interactivas ============ */
  var floresTocadas = new Set();
  var mensajeFlor = document.getElementById("mensaje-flor");
  var btnFloresContinuar = document.getElementById("btn-flores-continuar");
  var botonesFlor = document.querySelectorAll(".flor-btn[data-msg]");

  botonesFlor.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var msg = btn.getAttribute("data-msg");
      mensajeFlor.style.opacity = 0;
      setTimeout(function () {
        mensajeFlor.textContent = msg;
        mensajeFlor.style.opacity = 1;
      }, 150);
      floresTocadas.add(btn);
      if (floresTocadas.size === botonesFlor.length) {
        btnFloresContinuar.classList.remove("oculto");
        btnFloresContinuar.classList.add("rebote");
        setTimeout(function () {
          btnFloresContinuar.classList.remove("rebote");
        }, 750);
      }
    });
  });

  btnFloresContinuar.addEventListener("click", function () {
    irAPaso("paso-sorpresa");
  });

  /* ============ PASO 4: la sorpresa (regalo) ============ */
  var overlay = document.getElementById("overlay");
  var regaloBtn = document.getElementById("regalo-btn");
  var regaloTexto = document.getElementById("regalo-texto");

  var temporizadorInvitar = null;

  document.getElementById("btn-sorpresa").addEventListener("click", function () {
    overlay.classList.remove("oculto");
    clearTimeout(temporizadorInvitar);
    temporizadorInvitar = setTimeout(function () {
      regaloBtn.classList.add("invitar");
    }, 1400);
  });

  regaloBtn.addEventListener("click", function () {
    if (regaloBtn.classList.contains("abierto")) return;
    clearTimeout(temporizadorInvitar);
    regaloBtn.classList.remove("invitar");
    regaloBtn.classList.add("abierto");
    regaloTexto.textContent = "✨";
    setTimeout(function () {
      overlay.classList.add("oculto");
      irAPaso("paso-final");
      lanzarLluviaPetalos(40);
    }, 700);
  });

  /* ============ PASO 5 → 6: final → ustedes ============ */
  document.getElementById("btn-final").addEventListener("click", function () {
    irAPaso("paso-ustedes");
  });

  /* ============ PASO 6 → 7: ustedes → juego ============ */
  document.getElementById("btn-ustedes").addEventListener("click", function () {
    irAPaso("paso-juego");
    lanzarLluviaPetalos(20);
  });

  /* ============ lluvia extra de pétalos (para momentos clave) ============ */
  function lanzarLluviaPetalos(cantidad) {
    var capa = document.getElementById("petalos");
    for (var i = 0; i < cantidad; i++) {
      var p = document.createElement("div");
      p.className = "petalo";
      var s = 0.6 + Math.random();
      p.style.cssText +=
        "left:" + Math.random() * 100 + "vw;" +
        "width:" + 15 * s + "px;height:" + 22 * s + "px;" +
        "opacity:" + (0.4 + Math.random() * 0.5).toFixed(2) + ";" +
        "animation-duration:" + (5 + Math.random() * 5) + "s;" +
        "animation-delay:" + -Math.random() * 2 + "s";
      capa.appendChild(p);
      (function (el) {
        setTimeout(function () { el.remove(); }, 12000);
      })(p);
    }
  }

  /* ============ MÚSICA DE FONDO ============ */
  var musica = document.getElementById("musica-fondo");
  var btnMusica = document.getElementById("btn-musica");
  var musicaLista = false;
  var musicaSilenciada = false;

  function iniciarMusica() {
    if (musicaLista) return;
    musicaLista = true;
    musica.volume = 0;
    var promesa = musica.play();
    if (promesa && promesa.catch) {
      promesa.catch(function () {
        /* el navegador bloqueó el autoplay; se activará con btn-musica */
      });
    }
    btnMusica.classList.add("sonando");
    var vol = 0;
    var fade = setInterval(function () {
      vol += 0.05;
      if (vol >= 0.55) {
        vol = 0.55;
        clearInterval(fade);
      }
      musica.volume = vol;
    }, 120);
  }

  btnMusica.addEventListener("click", function () {
    if (!musicaLista) {
      iniciarMusica();
      return;
    }
    musicaSilenciada = !musicaSilenciada;
    if (musicaSilenciada) {
      musica.pause();
      btnMusica.classList.remove("sonando");
      btnMusica.classList.add("silenciado");
      btnMusica.setAttribute("aria-label", "Activar música");
    } else {
      musica.play();
      btnMusica.classList.add("sonando");
      btnMusica.classList.remove("silenciado");
      btnMusica.setAttribute("aria-label", "Silenciar música");
    }
  });

  iniciarFondo();
})();