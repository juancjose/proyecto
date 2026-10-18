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
