const HABITS = [
    { id: 'water', name: 'Drink 8 Glasses of Water', emoji: '💧' },
    { id: 'exercise', name: 'Exercise 30 Minutes', emoji: '🏃' },
    { id: 'read', name: 'Read 20 Pages', emoji: '📚' },
    { id: 'meditate', name: 'Meditate 10 Minutes', emoji: '🧘' },
    { id: 'eat-healthy', name: 'Eat Healthy Meals', emoji: '🥗' },
    { id: 'sleep', name: 'Sleep 8 Hours', emoji: '😴' },
    { id: 'limit-social', name: 'Limit Social Media', emoji: '🚫' },
    { id: 'journal', name: 'Journal 10 Minutes', emoji: '📝' }
];

const STORAGE_KEY = 'habitTrackerData';
const CELEBRATION_EMOJIS = ['🏆', '⚔️', '🎯'];

let selectedHabits = [];
let habitData = {};

function init() {
    loadData();
    renderHabitList();
    renderTracker();
    document.getElementById('submit-btn').addEventListener('click', handleSubmit);
    document.getElementById('reset-btn').addEventListener('click', resetHabits);
    document.getElementById('modal-close').addEventListener('click', hideModal);
}

function saveData() {
    const data = {
        selectedHabits: selectedHabits,
        habitData: habitData
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const data = JSON.parse(saved);
        selectedHabits = data.selectedHabits || [];
        habitData = data.habitData || {};
        selectedHabits.forEach(habit => {
            if (!habitData[habit]) {
                habitData[habit] = { completedDays: [] };
            }
        });
    }
}

function renderHabitList() {
    const container = document.getElementById('habit-list');
    container.innerHTML = HABITS.map(habit => `
        <div class="habit-card ${selectedHabits.includes(habit.id) ? 'selected' : ''}"
             onclick="toggleHabit('${habit.id}')">
            <input type="checkbox" ${selectedHabits.includes(habit.id) ? 'checked' : ''}>
            <div class="checkbox-custom"></div>
            <span class="emoji">${habit.emoji}</span>
            <span class="habit-name">${habit.name}</span>
        </div>
    `).join('');
}

function toggleHabit(habitId) {
    const index = selectedHabits.indexOf(habitId);
    if (index === -1) {
        // Turning a habit ON. If we've tracked it before, KEEP that history -
        // only start fresh if this is the first time we've ever seen it.
        selectedHabits.push(habitId);
        if (!habitData[habitId]) {
            habitData[habitId] = { completedDays: [] };
        }
    } else {
        // Turning a habit OFF. Stop showing it, but DO NOT delete its history.
        // Unchecking a habit must never destroy the days you already logged -
        // turn it back on later and your streak is exactly where you left it.
        selectedHabits.splice(index, 1);
    }
    saveData();
    renderHabitList();
    renderTracker();
}

function renderTracker() {
    const section = document.getElementById('tracker-section');
    const container = document.getElementById('habit-tracker');

    if (selectedHabits.length === 0) {
        section.classList.remove('visible');
        return;
    }

    section.classList.add('visible');
    const days = getLast7Days();

    container.innerHTML = selectedHabits.map(habitId => {
        const habit = HABITS.find(h => h.id === habitId);
        const data = habitData[habitId];
        const completedCount = data.completedDays.filter(d =>
            days.some(day => day.date === d)
        ).length;
        const streak = calculateStreak(data.completedDays);

        return `
            <div class="habit-track">
                <div class="habit-track-header">
                    <span class="emoji">${habit.emoji}</span>
                    <h3>${habit.name}</h3>
                    ${streak > 0 ? `<span class="streak-badge">🔥 ${streak} day${streak > 1 ? 's' : ''}</span>` : ''}
                </div>
                <div class="progress-container">
                    <div class="progress-text">${completedCount}/7 days this week</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(completedCount / 7) * 100}%"></div>
                    </div>
                </div>
                <div class="week-grid">
                    ${days.map(day => `
                        <div class="day-box ${data.completedDays.includes(day.date) ? 'completed' : ''}"
                             onclick="toggleDay('${habitId}', '${day.date}')">
                            <span class="day-name">${day.name}</span>
                            <span class="day-num">${day.num}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function calculateStreak(completedDays) {
    if (!completedDays || completedDays.length === 0) return 0;

    const sortedDays = [...completedDays].sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (sortedDays[0] !== today && sortedDays[0] !== yesterday) {
        return 0;
    }

    let streak = 1;
    for (let i = 1; i < sortedDays.length; i++) {
        const current = new Date(sortedDays[i - 1]);
        const prev = new Date(sortedDays[i]);
        const diffDays = (current - prev) / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

function getLast7Days() {
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();

    const monday = new Date(today);
    const dayOfWeek = today.getDay();
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    monday.setDate(today.getDate() - daysFromMonday);

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        days.push({
            name: dayNames[date.getDay()],
            num: date.getDate(),
            date: date.toISOString().split('T')[0]
        });
    }

    return days;
}

function toggleDay(habitId, date) {
    const data = habitData[habitId];
    const index = data.completedDays.indexOf(date);

    if (index === -1) {
        data.completedDays.push(date);
    } else {
        data.completedDays.splice(index, 1);
    }

    saveData();
    renderTracker();
}

function handleSubmit() {
    showCelebration();
    setTimeout(() => {
        showModal();
    }, 800);
}

function showCelebration() {
    const container = document.getElementById('celebration-container');
    container.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'celebration-emoji';
        emoji.textContent = CELEBRATION_EMOJIS[i % CELEBRATION_EMOJIS.length];
        emoji.style.left = `${10 + Math.random() * 80}%`;
        emoji.style.animationDelay = `${Math.random() * 0.5}s`;
        container.appendChild(emoji);
    }
}

function showModal() {
    document.getElementById('modal').classList.add('visible');
}

function hideModal() {
    document.getElementById('modal').classList.remove('visible');
}

function resetHabits() {
    if (confirm('Are you sure you want to reset all habits and progress?')) {
        localStorage.removeItem(STORAGE_KEY);
        selectedHabits = [];
        habitData = {};
        renderHabitList();
        renderTracker();
    }
}

document.addEventListener('DOMContentLoaded', init);
