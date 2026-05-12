document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

const MODALS = ['modal-sql','modal-python','modal-powerbi','modal-ml'];
let currentIdx = 0;

function openModal(index) {
  MODALS.forEach(id => { const d = document.getElementById(id); if (d.open) d.close(); });
  currentIdx = index;
  const dlg = document.getElementById(MODALS[index]);
  dlg.showModal();
  dlg.querySelector('.modal-inner').scrollTop = 0;
  updateNavState(dlg);
}

function updateNavState(dlg) {
  dlg.querySelector('.mnav-prev').disabled = currentIdx === 0;
  dlg.querySelector('.mnav-next').disabled = currentIdx === MODALS.length - 1;
  dlg.querySelectorAll('.mnav-dot').forEach((d,i) => d.classList.toggle('active', i === currentIdx));
}

document.querySelectorAll('[data-modal]').forEach(tile => {
  const idx = MODALS.indexOf(tile.getAttribute('data-modal'));
  tile.addEventListener('click', () => openModal(idx));
  tile.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); openModal(idx); } });
});

document.querySelectorAll('.modal').forEach(dlg => {
  dlg.querySelector('.modal-close').addEventListener('click', () => dlg.close());
  dlg.querySelector('.mnav-prev').addEventListener('click', () => openModal(currentIdx - 1));
  dlg.querySelector('.mnav-next').addEventListener('click', () => openModal(currentIdx + 1));
  dlg.querySelectorAll('.mnav-dot').forEach((dot,i) => dot.addEventListener('click', () => openModal(i)));
  dlg.addEventListener('click', e => {
    if (!e.target.closest('.modal-card') && !e.target.closest('.mnav-arrow') && !e.target.closest('.mnav-dot')) dlg.close();
  });
});

document.addEventListener('keydown', e => {
  const open = document.querySelector('.modal[open]');
  if (!open) return;
  if (e.key==='ArrowLeft' && currentIdx > 0) openModal(currentIdx - 1);
  if (e.key==='ArrowRight' && currentIdx < MODALS.length-1) openModal(currentIdx + 1);
});

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.tile').forEach(t => io.observe(t));
