let currentCategory = 'adults';
let currentQuarterFile = '2026-q3.json';
let cachedData = null;
let activeLessonNum = null;

// UI Targets
const catButtons = document.querySelectorAll('.cat-btn');
const lessonGrid = document.getElementById('lesson-grid');
const dayList = document.getElementById('day-list');
const contentDisplay = document.getElementById('content');

// Handle swapping categories
catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        catButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        fetchQuarterlyData();
    });
});

// Fetch current JSON file based on client category choice
async function fetchQuarterlyData() {
    try {
        const response = await fetch(`data/${currentCategory}/${currentQuarterFile}`);
        cachedData = await response.json();
        buildLessonSelector();
    } catch (error) {
        contentDisplay.innerHTML = `<div class="error">Error loading offline lesson data block.</div>`;
    }
}

// Build list of Weeks or Lessons in sidebar
function buildLessonSelector() {
    lessonGrid.innerHTML = '';
    dayList.innerHTML = '';
    
    // Determine keys if structured as "Lessons" (Adults/Kids) or "Stories" (Mission)
    const items = cachedData.Lessons ? Object.keys(cachedData.Lessons) : Object.keys(cachedData.Stories);
    
    items.forEach(itemKey => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = `Week ${itemKey}`;
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('#lesson-grid .nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeLessonNum = itemKey;
            buildDayOrPartSelector();
        });
        lessonGrid.appendChild(btn);
    });

    // Auto-load first week item
    if (lessonGrid.firstChild) lessonGrid.firstChild.click();
}

// Build sub-navigation for individual days (Sunday-Friday) or full story text
function buildDayOrPartSelector() {
    dayList.innerHTML = '';
    
    if (currentCategory === 'mission') {
        // Mission tracks don't have day splits, output direct full story
        const storyData = cachedData.Stories[activeLessonNum];
        contentDisplay.innerHTML = `<h2>${storyData.Title}</h2><h4>Target Field: ${storyData.Country}</h4><p>${storyData.Story}</p>`;
        return;
    }

    // Adult & Child Track: Build Day Sub-navigation list
    const lesson = cachedData.Lessons[activeLessonNum];
    const days = Object.keys(lesson.Days);
    
    days.forEach(day => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn day-btn';
        btn.textContent = day;
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Output layout
            contentDisplay.innerHTML = `
                <h2>Week ${activeLessonNum}: ${lesson.Title}</h2>
                <h3>${day} Study</h3>
                <p style="white-space: pre-wrap; line-height: 1.8;">${lesson.Days[day]}</p>
            `;
            document.getElementById('main-content').scrollTo(0,0);
        });
        dayList.appendChild(btn);
    });

    if (dayList.firstChild) dayList.firstChild.click();
}

// Initialize on App Run
window.addEventListener('load', fetchQuarterlyData);
