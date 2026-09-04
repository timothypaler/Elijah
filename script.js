const menuButton = document.querySelector('.menu-trigger');
const menuPanel = document.querySelector('.menu-panel');
const masthead = document.querySelector('.masthead');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuPanel.setAttribute('aria-hidden', String(!open));
  menuPanel.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
}

menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
menuPanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

function updateMasthead() {
  masthead.classList.toggle('is-scrolled', window.scrollY > 60);
}

updateMasthead();
window.addEventListener('scroll', updateMasthead, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sequenceButtons = document.querySelectorAll('.sequence-step');
const sequencePanels = document.querySelectorAll('[data-panel]');

sequenceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.sequence;
    sequenceButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    sequencePanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === selected));
  });
});
