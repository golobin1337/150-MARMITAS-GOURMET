// 150 Almoços Fitness - interações da página

document.addEventListener('DOMContentLoaded', function () {
  // Data da barra de topo = sempre o dia atual (dd/mm/aaaa)
  var dataHoje = document.getElementById('data-hoje');
  if (dataHoje) {
    var hoje = new Date();
    var dia = String(hoje.getDate()).padStart(2, '0');
    var mes = String(hoje.getMonth() + 1).padStart(2, '0');
    var ano = hoje.getFullYear();
    dataHoje.textContent = dia + '/' + mes + '/' + ano;
  }

  // Setas do carrossel de resultados ("QUEM JÁ PREPAROU, APROVOU!")
  var results = document.querySelector('.results');
  if (results) {
    var track = results.querySelector('.carousel');
    var buttons = results.querySelectorAll('.nav-arrows button');
    var prevBtn = buttons[0];
    var nextBtn = buttons[1];

    function step() {
      var card = track.querySelector('.result-card');
      // largura do card + gap (14px)
      return card ? card.getBoundingClientRect().width + 14 : 180;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -step(), behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: step(), behavior: 'smooth' });
      });
    }
  }

  // FAQ: mantém apenas um item aberto por vez (comportamento de acordeão)
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  // Popup de upsell: abre em qualquer botão com [data-open-upsell]
  var modal = document.getElementById('modal-upsell');
  var modalClose = document.getElementById('modal-close');

  function abrirModal() {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // trava o scroll do fundo
  }
  function fecharModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modal) {
    document.querySelectorAll('[data-open-upsell]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        abrirModal();
      });
    });
  }
  if (modalClose) {
    modalClose.addEventListener('click', fecharModal);
  }
  if (modal) {
    // fecha ao clicar fora do card
    modal.addEventListener('click', function (e) {
      if (e.target === modal) fecharModal();
    });
  }
  // Lightbox: ampliar imagens das prévias e dos depoimentos
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  function abrirLightbox(src, alt) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function fecharLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  if (lightbox) {
    document.querySelectorAll('.rc-img, .result-img').forEach(function (el) {
      el.addEventListener('click', function () {
        var img = el.querySelector('img');
        if (img) abrirLightbox(img.src, img.alt);
      });
    });
    // clicar em qualquer lugar (fundo ou imagem) fecha
    lightbox.addEventListener('click', fecharLightbox);
    if (lightboxClose) {
      lightboxClose.addEventListener('click', function (e) {
        e.stopPropagation();
        fecharLightbox();
      });
    }
  }

  // fecha com a tecla ESC (popup e lightbox)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      fecharModal();
      fecharLightbox();
    }
  });
});
