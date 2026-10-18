// Tema claro / oscuro
(function () {
    var root = document.documentElement;
    var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    function guardado() {
        try { return localStorage.getItem('tema'); } catch (e) { return null; }
    }
    function aplicar(tema) {
        root.setAttribute('data-theme', tema);
        document.querySelectorAll('.theme-toggle').forEach(function (b) {
            b.setAttribute('aria-pressed', tema === 'dark' ? 'true' : 'false');
        });
    }
    aplicar(root.getAttribute('data-theme') || (media && media.matches ? 'dark' : 'light'));
    document.querySelectorAll('.theme-toggle').forEach(function (b) {
        b.addEventListener('click', function () {
            var nuevo = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            aplicar(nuevo);
            try { localStorage.setItem('tema', nuevo); } catch (e) {}
        });
    });
    if (media && media.addEventListener) {
        media.addEventListener('change', function (e) {
            if (!guardado()) aplicar(e.matches ? 'dark' : 'light');
        });
    }
})();

// Menú móvil
document.querySelectorAll('.abrir-menu').forEach(function (btn) {
    var header = btn.closest('.site-header');
    btn.addEventListener('click', function () {
        var abierto = header.classList.toggle('menu-abierto');
        btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        document.body.classList.toggle('sin-scroll', abierto);
    });
});

// Carruseles
document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var slides = root.querySelectorAll('.carousel__slide');
    var count = root.querySelector('[data-count]');
    var actual = 0;
    function dos(n) { return (n < 10 ? '0' : '') + n; }
    function mostrar(i) {
        actual = (i + slides.length) % slides.length;
        slides.forEach(function (s, n) { s.classList.toggle('is-active', n === actual); });
        if (count) count.textContent = dos(actual + 1) + ' / ' + dos(slides.length);
    }
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { mostrar(actual - 1); });
    if (next) next.addEventListener('click', function () { mostrar(actual + 1); });
    mostrar(0);
});

// Animaciones al hacer scroll
(function () {
    var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducir || !('IntersectionObserver' in window)) return;

    var grupos = ['.features', '.info-tiles', '.productos-container', '.bento', '.servicios__list',
        '.contacto__datos', '.ayuda-container', '.site-footer__grid', '.statement', '.nosotros',
        '.newsletter__inner', '.split__body', '.ubicacion'];
    var sueltos = ['.section__head', '.page-hero__title', '.split__title', '.contacto__info h4',
        '.contacto__info .contacto-subtitle', '.contacto-form', '.site-footer__cta', '.site-footer__bottom'];

    var elementos = [];
    grupos.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (g) {
            Array.prototype.forEach.call(g.children, function (hijo, i) {
                hijo.style.setProperty('--d', Math.min(i, 7) * 90 + 'ms');
                elementos.push(hijo);
            });
        });
    });
    sueltos.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) { elementos.push(el); });
    });

    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    elementos.forEach(function (el) {
        if (el.classList.contains('reveal')) return;
        el.classList.add('reveal');
        io.observe(el);
    });
})();
