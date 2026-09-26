(function(){
  var BASE = 'https://givebutter.com/embed/c/sovereign-brutality-owmjb9';
  var overlay = document.getElementById('pay-overlay');
  var frame = document.getElementById('pay-frame');
  var closeBtn = document.getElementById('pay-close');
  if (!overlay || !frame) return;

  function openPay(amount){
    var src = BASE + (amount ? ('?amount=' + encodeURIComponent(amount)) : '');
    if (frame.getAttribute('src') !== src) frame.setAttribute('src', src);
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pay-lock');
  }
  function closePay(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('pay-lock');
  }

  document.querySelectorAll('[data-give]').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      openPay(el.getAttribute('data-give') || '');
    });
  });
  if (closeBtn) closeBtn.addEventListener('click', closePay);
  overlay.addEventListener('click', function(e){
    if (e.target === overlay) closePay();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closePay();
  });
})();
