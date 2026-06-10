/* ── PARALLAX HERO ── */
const heroBg = document.querySelector('.hero-bg img');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroBg) heroBg.style.transform = `translateY(${y * 0.28}px)`;

  /* sticky nav */
  const nav = document.querySelector('nav');
  if (nav) nav.classList.toggle('scrolled', y > 80);
}, { passive: true });

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── SMOOTH SCROLL NAV ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── CALENDAR DATA ── */
const calData = [
  {
    park: 'Masai Mara',
    months: [
      ['good','Dry season residents'],['good','Dry season residents'],
      ['fair','Long rains begin'],['low','Long rains'],['low','Long rains'],
      ['good','Migration arrives'],['peak','Wildebeest crossing peak'],
      ['peak','Wildebeest crossing peak'],['peak','Migration continues'],
      ['good','Migration departs'],['fair','Short rains begin'],
      ['good','Dry, festive season']
    ]
  },
  {
    park: 'Amboseli',
    months: [
      ['peak','Dry, Kilimanjaro views'],['peak','Excellent elephant viewing'],
      ['good','Still dry'],['fair','Long rains'],['fair','Long rains'],
      ['good','Drying out'],['peak','Best elephant herds'],
      ['peak','Clearest mountain views'],['good','Good all round'],
      ['fair','Short rains'],['fair','Short rains'],['peak','Peak festive season']
    ]
  },
  {
    park: 'Samburu',
    months: [
      ['peak','Hot & dry — wildlife at rivers'],['peak','Excellent predator activity'],
      ['good','Hot, some showers'],['fair','Rains begin'],['fair','Wet season'],
      ['good','Drying, lush scenery'],['good','Good game viewing'],
      ['peak','Dry season peak'],['peak','Dry season peak'],
      ['good','Short rains start'],['fair','Short rains'],['good','Cooling, good game']
    ]
  },
  {
    park: 'Lake Nakuru',
    months: [
      ['good','Flamingos present'],['peak','Rhino & flamingo sightings'],
      ['fair','Rains start'],['fair','Long rains'],['fair','Long rains'],
      ['good','Flamingos return'],['peak','Best flamingo spectacle'],
      ['peak','Best flamingo spectacle'],['good','Lush, good birding'],
      ['fair','Short rains'],['fair','Short rains'],['good','Festive birding']
    ]
  },
  {
    park: 'Tsavo',
    months: [
      ['peak','Dry — red elephants at waterholes'],['peak','Excellent game viewing'],
      ['good','Hot, pre-rains'],['fair','Long rains'],['fair','Long rains'],
      ['good','Green, scenic'],['good','Game concentrates'],
      ['peak','Peak dry season'],['peak','Peak dry season'],
      ['fair','Short rains'],['fair','Short rains'],['good','Drying, good access']
    ]
  }
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const PIP_CLASS = { peak: 'pip-peak', good: 'pip-good', fair: 'pip-fair', low: 'pip-low' };
const PIP_LABEL = { peak: 'P', good: 'G', fair: 'F', low: 'L' };

function buildCalendar() {
  const tbody = document.getElementById('cal-tbody');
  if (!tbody) return;
  calData.forEach(row => {
    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    nameTd.textContent = row.park;
    tr.appendChild(nameTd);
    row.months.forEach(([level, note], mi) => {
      const td = document.createElement('td');
      td.className = 'cal-cell';
      td.innerHTML = `
        <div class="cal-pip ${PIP_CLASS[level]}">${PIP_LABEL[level]}</div>
        <div class="cal-tooltip"><strong>${MONTHS[mi]}</strong><br>${note}</div>
      `;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}
buildCalendar();

/* ── CURRENT YEAR ── */
const yrEl = document.getElementById('year');
if (yrEl) yrEl.textContent = new Date().getFullYear();
