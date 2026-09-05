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

const lessonTabs = [...document.querySelectorAll('.lesson-tab')];
const lessonPanels = document.querySelectorAll('[data-lesson-panel]');

function selectLesson(tab) {
  const selected = tab.dataset.lesson;

  lessonTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });

  lessonPanels.forEach((panel) => {
    const active = panel.dataset.lessonPanel === selected;
    panel.classList.toggle('active', active);
    panel.hidden = !active;
  });
}

lessonTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectLesson(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % lessonTabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + lessonTabs.length) % lessonTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lessonTabs.length - 1;

    selectLesson(lessonTabs[nextIndex]);
    lessonTabs[nextIndex].focus();
  });
});

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
