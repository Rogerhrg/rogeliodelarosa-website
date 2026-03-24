/**
 * Friction First - Habit Tracker (The One Thing)
 * Almacenamiento en localStorage
 */

const HT_STORAGE_KEY = 'ff_habit_tracker_data';

let habitData = {
    hideUnmarkWarning: false,
    coreHabit: { name: "", chain: 0, lastMarkedStr: null },
    secondaryHabits: [
        { name: "", lastMarkedStr: null },
        { name: "", lastMarkedStr: null }
    ]
};

function getLocalSettings() {
    const dataString = localStorage.getItem(HT_STORAGE_KEY);
    if (dataString) {
        try {
            const parsed = JSON.parse(dataString);
            habitData = { ...habitData, ...parsed };
        } catch (e) {
            console.error(e);
        }
    }
}

function saveLocalSettings() {
    localStorage.setItem(HT_STORAGE_KEY, JSON.stringify(habitData));
}

function getTodayStr() {
    const today = new Date();
    // Ajustar a timezone local (simulado simple sacando los componentes)
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function diffDays(dateStr1, dateStr2) {
    if (!dateStr1 || !dateStr2) return 999;
    const d1 = new Date(dateStr1);
    const d2 = new Date(dateStr2);
    const diffTime = Math.abs(d2 - d1);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Analizar la cadena del hábito principal
function checkChainStatus() {
    if (!habitData.coreHabit.name) return;
    
    const today = getTodayStr();
    const lastMarked = habitData.coreHabit.lastMarkedStr;
    
    if (!lastMarked) return;

    const missedDays = diffDays(lastMarked, today) - 1; 
    // Si lastMarked es "Ayer", diff = 1, missedDays = 0. (Pending)
    // Si lastMarked fue hace 2 días, diff = 2, missedDays = 1. (Weak)
    // Si lastMarked fue hace 3 días, diff = 3, missedDays = 2. (Broken)
    
    if (missedDays >= 2) {
        // Cadena rota!
        habitData.coreHabit.chain = 0;
        habitData.coreHabit.lastMarkedStr = null; // reset
        saveLocalSettings();
    }
}

function renderHabits() {
    const container = document.getElementById('habitTrackerApp');
    if (!container) return;
    
    checkChainStatus();
    
    const today = getTodayStr();
    
    // Core Habit Logic
    const core = habitData.coreHabit;
    const coreDiff = diffDays(core.lastMarkedStr, today);
    let coreStatus = "PENDING"; // 1 día (o nunca marcado hoy)
    let isWeak = false;
    
    if (core.lastMarkedStr === today) {
        coreStatus = "DONE";
    } else if (core.lastMarkedStr && coreDiff === 2) {
        coreStatus = "WEAK";
        isWeak = true;
    }
    
    // UI Builder
    let html = `
        <div class="habit-container">
            <!-- CORE HABIT -->
            <div class="habit-core-section ${isWeak ? 'habit-weak' : ''}">
                <div class="habit-core-header">
                    <h4>PRIORIDAD ABSOLUTA (THE ONE THING)</h4>
                    <span class="habit-chain">🔥 Racha: ${core.chain}</span>
                </div>
                ${!core.name ? `
                    <div class="habit-input-group">
                        <input type="text" id="coreHabitInput" placeholder="Define tu única misión prioritaria..." class="form-input">
                        <button onclick="setCoreHabit()" class="btn btn-primary btn-sm">Establecer</button>
                    </div>
                ` : `
                    <div class="habit-item core-item ${coreStatus === 'DONE' ? 'done' : ''}">
                        <div class="habit-info">
                            <span class="habit-name">${escapeHTML(core.name)}</span>
                            ${isWeak && coreStatus !== 'DONE' ? '<span class="habit-weak-badge">¡Cadena Débil! (1 día perdido)</span>' : ''}
                        </div>
                        <button onclick="markCoreHabit()" class="habit-check-btn" ${coreStatus === 'DONE' ? 'disabled' : ''}>
                            ${coreStatus === 'DONE' ? '✅ Completado' : 'Marcar Hecho'}
                        </button>
                    </div>
                `}
            </div>
            
            <!-- SECONDARY HABITS -->
            <div class="habit-secondary-section">
                <h4>Misiones Secundarias (Triviales)</h4>
                <div class="secondary-list">
                    ${habitData.secondaryHabits.map((sh, idx) => `
                        <div class="habit-item secondary-item ${sh.lastMarkedStr === today ? 'done' : ''}">
                            ${!sh.name ? `
                                <input type="text" id="secHabitInput${idx}" placeholder="Hábito adicional (opcional)" class="form-input form-input-sm">
                                <button onclick="setSecHabit(${idx})" class="btn btn-outline btn-sm">Guardar</button>
                            ` : `
                                <span class="habit-name">${escapeHTML(sh.name)}</span>
                                <button onclick="markSecHabit(${idx})" class="habit-check-btn secondary" ${sh.lastMarkedStr === today ? 'disabled' : ''}>
                                    ${sh.lastMarkedStr === today ? '✓' : 'Marcar'}
                                </button>
                                <button onclick="clearSecHabit(${idx})" class="habit-delete-btn" title="Eliminar">🗑️</button>
                            `}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <!-- MODAL (CANT UNMARK) -->
        <div class="ht-modal-overlay" id="htWarningModal" style="display:none;">
            <div class="ht-modal">
                <h3 style="margin-top:0">No hay marcha atrás</h3>
                <p>Una vez marcado un hábito como hecho en la Fragua, no se puede desmarcar. La disciplina requiere honestidad absoluta.</p>
                <label style="display:flex; align-items:center; gap:8px; margin-top:15px; font-size:14px; color:#aaa; cursor:pointer;">
                    <input type="checkbox" id="htHideWarningCheckbox"> No volver a mostrar este mensaje
                </label>
                <button onclick="closeWarningModal()" class="btn btn-primary btn-block" style="margin-top:15px;">Entendido</button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Actions
window.setCoreHabit = function() {
    const val = document.getElementById('coreHabitInput').value.trim();
    if(val) {
        habitData.coreHabit.name = val;
        habitData.coreHabit.chain = 0;
        saveLocalSettings();
        renderHabits();
    }
}

window.setSecHabit = function(idx) {
    const val = document.getElementById('secHabitInput'+idx).value.trim();
    if(val) {
        habitData.secondaryHabits[idx].name = val;
        saveLocalSettings();
        renderHabits();
    }
}

window.clearSecHabit = function(idx) {
    habitData.secondaryHabits[idx] = { name: "", lastMarkedStr: null };
    saveLocalSettings();
    renderHabits();
}

window.markCoreHabit = function() {
    const today = getTodayStr();
    if (habitData.coreHabit.lastMarkedStr !== today) {
        habitData.coreHabit.lastMarkedStr = today;
        habitData.coreHabit.chain += 1;
        saveLocalSettings();
        showWarningModalIfNeeded();
        renderHabits();
    }
}

window.markSecHabit = function(idx) {
    const today = getTodayStr();
    if (habitData.secondaryHabits[idx].lastMarkedStr !== today) {
        habitData.secondaryHabits[idx].lastMarkedStr = today;
        saveLocalSettings();
        showWarningModalIfNeeded();
        renderHabits();
    }
}

// Modal Logic
function showWarningModalIfNeeded() {
    if (!habitData.hideUnmarkWarning) {
        document.getElementById('htWarningModal').style.display = 'flex';
    }
}

window.closeWarningModal = function() {
    const cb = document.getElementById('htHideWarningCheckbox');
    if (cb && cb.checked) {
        habitData.hideUnmarkWarning = true;
        saveLocalSettings();
    }
    document.getElementById('htWarningModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    getLocalSettings();
    renderHabits();
});
