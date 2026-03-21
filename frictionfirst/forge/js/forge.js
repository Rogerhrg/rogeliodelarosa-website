/**
 * Friction First - FORGE Dashboard JavaScript
 * Generates life grid and year progress visualizations
 */

document.addEventListener('DOMContentLoaded', () => {
    generateLifeGrid();
    generateYearGrid();
    animateProgressBars();
    initCopyButtons();
});

/* ============================================
   CLICK TO COPY
   ============================================ */
function initCopyButtons() {
    const copyElements = document.querySelectorAll('.copy-code');

    copyElements.forEach(el => {
        el.addEventListener('click', () => {
            const textToCopy = el.innerText;

            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    el.classList.add('copied');
                    setTimeout(() => el.classList.remove('copied'), 2000);
                }).catch(err => {
                    console.error('Error al copiar: ', err);
                });
            }
        });
    });
}

/* ============================================
   LIFE WEEKS GRID
   ============================================ */
function generateLifeGrid() {
    const grid = document.getElementById('lifeGrid');
    if (!grid) return;

    const data = window.FORGE_DATA;
    const weeksLived = data.weeksLived;
    const weeksTotal = data.weeksTotal;
    const years = data.yearsTotal;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < weeksTotal; i++) {
        const cell = document.createElement('div');
        cell.className = 'week-cell';

        const yearNum = Math.floor(i / 52);
        const weekNum = (i % 52) + 1;

        if (i < weeksLived) {
            cell.classList.add('lived');
            cell.title = `Año ${yearNum}, Semana ${weekNum} — Vivida`;
        } else if (i === weeksLived) {
            cell.classList.add('current');
            cell.title = `Año ${yearNum}, Semana ${weekNum} — AHORA`;
        } else {
            cell.classList.add('remaining');
            cell.title = `Año ${yearNum}, Semana ${weekNum} — Por vivir`;
        }

        fragment.appendChild(cell);
    }

    grid.appendChild(fragment);

    // Scroll to show current week area
    setTimeout(() => {
        const currentCell = grid.querySelector('.week-cell.current');
        if (currentCell) {
            const gridRect = grid.getBoundingClientRect();
            const cellRect = currentCell.getBoundingClientRect();
            const scrollTop = cellRect.top - gridRect.top - (gridRect.height / 2);
            grid.scrollTop = Math.max(0, scrollTop);
        }
    }, 500);
}

/* ============================================
   YEAR PROGRESS GRID
   ============================================ */
function generateYearGrid() {
    const grid = document.getElementById('yearGrid');
    const labelsContainer = document.getElementById('yearMonthsLabels');
    if (!grid) return;

    const data = window.FORGE_DATA;
    const dayOfYear = data.dayOfYear;
    const totalDays = data.totalDaysInYear;

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const fragment = document.createDocumentFragment();
    const year = new Date().getFullYear();

    for (let d = 1; d <= totalDays; d++) {
        const cell = document.createElement('div');
        cell.className = 'day-cell';

        // Get the date for this day of year
        const date = new Date(year, 0, d);
        const dateStr = date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });

        if (d < dayOfYear) {
            cell.classList.add('passed');
            cell.title = `${dateStr} ✓ Vivido`;
        } else if (d === dayOfYear) {
            cell.classList.add('today');
            cell.title = `${dateStr} — HOY`;
        } else {
            cell.classList.add('future');
            cell.title = `${dateStr}`;
        }

        fragment.appendChild(cell);
    }

    grid.appendChild(fragment);

    // Generate month labels
    if (labelsContainer) {
        months.forEach((m, i) => {
            const label = document.createElement('span');
            label.className = 'month-label';
            label.textContent = m;

            // Highlight current month
            if (i === new Date().getMonth()) {
                label.style.color = 'var(--ff-accent)';
                label.style.fontWeight = '700';
            }

            labelsContainer.appendChild(label);
        });
    }
}

/* ============================================
   ANIMATE PROGRESS BARS
   ============================================ */
function animateProgressBars() {
    // Life progress
    const lifeFill = document.querySelector('.life-progress-fill');
    if (lifeFill) {
        const targetWidth = lifeFill.style.width;
        lifeFill.style.width = '0%';
        setTimeout(() => {
            lifeFill.style.width = targetWidth;
        }, 300);
    }

    // Year progress
    const yearFill = document.querySelector('.year-progress-fill');
    if (yearFill) {
        const targetWidth = yearFill.style.width;
        yearFill.style.width = '0%';
        setTimeout(() => {
            yearFill.style.width = targetWidth;
        }, 500);
    }
}
