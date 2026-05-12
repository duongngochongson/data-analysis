// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Modal open/close
document.querySelectorAll('[data-modal]').forEach(tile => {
  const id = tile.getAttribute('data-modal');
  const dlg = document.getElementById(id);
  if (!dlg) return;
  const open = () => { if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', ''); };
  tile.addEventListener('click', open);
  tile.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
});

document.querySelectorAll('.modal').forEach(dlg => {
  const closeBtn = dlg.querySelector('.modal-close');
  closeBtn?.addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => {
    const rect = dlg.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inside) dlg.close();
  });
});

// Fade-in on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.tile').forEach(t => io.observe(t));
