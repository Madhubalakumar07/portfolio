// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS FOR SECTIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all section titles
document.querySelectorAll('.section-title').forEach(title => {
    observer.observe(title);
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Simple success message (since this is a static site)
        alert('Thank you for your message! This is a demo form. In a production site, this would send your message.');

        // Reset form
        contactForm.reset();
    });
}

// ============================================
// FADE-IN ANIMATION FOR ELEMENTS ON SCROLL
// ============================================
const fadeElements = document.querySelectorAll('.skill-category, .project-card, .stat, .cert-card, .about-text, .leetcode-summary-card, .leetcode-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// ============================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional)
// ============================================
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const subtitleText = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < subtitleText.length) {
            subtitle.textContent += subtitleText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// ============================================
// PERFORMANCE: REDUCE ANIMATIONS ON LOW-POWER DEVICES
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-smooth', '0s');
}

console.log('Portfolio loaded successfully.');

// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

if (savedTheme === 'light' || (!savedTheme && systemTheme === 'light')) {
    body.classList.add('light-theme');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');

        // Save preference
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ============================================
// LEETCODE HEATMAP (LIVE DATA)
// ============================================
const leetcodeSection = document.getElementById('achievements');

const leetcodeElements = {
    solvedCount: document.getElementById('leetcodeSolvedCount'),
    totalQuestions: document.getElementById('leetcodeTotalQuestions'),
    attemptingCount: document.getElementById('leetcodeAttemptingCount'),
    easySolved: document.getElementById('leetcodeEasySolved'),
    easyTotal: document.getElementById('leetcodeEasyTotal'),
    mediumSolved: document.getElementById('leetcodeMediumSolved'),
    mediumTotal: document.getElementById('leetcodeMediumTotal'),
    hardSolved: document.getElementById('leetcodeHardSolved'),
    hardTotal: document.getElementById('leetcodeHardTotal'),
    yearSubmissions: document.getElementById('leetcodeYearSubmissions'),
    activeDays: document.getElementById('leetcodeActiveDays'),
    maxStreak: document.getElementById('leetcodeMaxStreak'),
    currentStreak: document.getElementById('leetcodeCurrentStreak'),
    monthLabels: document.getElementById('leetcodeMonthLabels'),
    heatmapGrid: document.getElementById('leetcodeHeatmapGrid'),
    status: document.getElementById('leetcodeStatus')
};

function toUtcDateKey(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function asNumber(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function findDifficultyEntry(entries, difficulty) {
    if (!Array.isArray(entries)) {
        return null;
    }

    return entries.find(entry => entry.difficulty === difficulty) || null;
}

function buildPastYearSeries(submissionCalendar) {
    const countByDate = new Map();

    if (submissionCalendar && typeof submissionCalendar === 'object') {
        Object.entries(submissionCalendar).forEach(([timestamp, count]) => {
            const date = new Date(asNumber(timestamp) * 1000);
            if (Number.isNaN(date.getTime())) {
                return;
            }

            countByDate.set(toUtcDateKey(date), asNumber(count));
        });
    }

    const now = new Date();
    const todayUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const days = [];

    for (let offset = 364; offset >= 0; offset -= 1) {
        const date = new Date(todayUtc);
        date.setUTCDate(todayUtc.getUTCDate() - offset);
        const key = toUtcDateKey(date);

        days.push({
            date,
            count: countByDate.get(key) || 0
        });
    }

    return days;
}

function getHeatmapLevel(count, maxCount) {
    if (count <= 0) {
        return 0;
    }

    const ratio = count / Math.max(maxCount, 1);
    if (ratio <= 0.25) {
        return 1;
    }
    if (ratio <= 0.5) {
        return 2;
    }
    if (ratio <= 0.75) {
        return 3;
    }

    return 4;
}

function calculateStreaks(days) {
    let maxStreak = 0;
    let rollingStreak = 0;

    days.forEach(day => {
        if (day.count > 0) {
            rollingStreak += 1;
            maxStreak = Math.max(maxStreak, rollingStreak);
        } else {
            rollingStreak = 0;
        }
    });

    let currentStreak = 0;
    for (let index = days.length - 1; index >= 0; index -= 1) {
        if (days[index].count > 0) {
            currentStreak += 1;
        } else {
            break;
        }
    }

    return { maxStreak, currentStreak };
}

function renderHeatmap(days) {
    const { heatmapGrid, monthLabels } = leetcodeElements;
    if (!heatmapGrid || !monthLabels || !Array.isArray(days) || days.length === 0) {
        return;
    }

    const leadingEmptyCells = days[0].date.getUTCDay();
    const paddedDays = Array.from({ length: leadingEmptyCells }, () => null).concat(days);
    const weekCount = Math.ceil(paddedDays.length / 7);
    const maxCount = Math.max(...days.map(day => day.count), 1);

    heatmapGrid.innerHTML = '';
    monthLabels.innerHTML = '';
    heatmapGrid.style.setProperty('--heatmap-weeks', weekCount);
    monthLabels.style.setProperty('--heatmap-weeks', weekCount);

    const shownMonths = new Set();

    paddedDays.forEach((dayData, index) => {
        const column = Math.floor(index / 7) + 1;
        const row = (index % 7) + 1;

        const cell = document.createElement('span');
        cell.className = 'leetcode-cell';
        cell.style.gridColumn = String(column);
        cell.style.gridRow = String(row);

        if (dayData) {
            const level = getHeatmapLevel(dayData.count, maxCount);
            const dayLabel = dayData.date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC'
            });

            cell.setAttribute('data-level', String(level));
            cell.title = `${dayLabel}: ${dayData.count} submission${dayData.count === 1 ? '' : 's'}`;
            cell.setAttribute('aria-label', cell.title);

            const monthKey = `${dayData.date.getUTCFullYear()}-${dayData.date.getUTCMonth()}`;
            if (!shownMonths.has(monthKey) && dayData.date.getUTCDate() <= 7) {
                const monthLabel = document.createElement('span');
                monthLabel.textContent = dayData.date.toLocaleDateString(undefined, {
                    month: 'short',
                    timeZone: 'UTC'
                });
                monthLabel.style.gridColumn = String(column);
                monthLabels.appendChild(monthLabel);
                shownMonths.add(monthKey);
            }
        } else {
            cell.setAttribute('data-level', '0');
            cell.style.opacity = '0.45';
            cell.setAttribute('aria-hidden', 'true');
        }

        heatmapGrid.appendChild(cell);
    });
}

function setText(element, value) {
    if (element) {
        element.textContent = String(value);
    }
}

function updateLeetCodeStats(payload, days) {
    const totalSolved = asNumber(payload.totalSolved, 0);
    const totalQuestions = asNumber(payload.totalQuestions, 0);
    const easySolved = asNumber(payload.easySolved, 0);
    const mediumSolved = asNumber(payload.mediumSolved, 0);
    const hardSolved = asNumber(payload.hardSolved, 0);
    const totalEasy = asNumber(payload.totalEasy, 0);
    const totalMedium = asNumber(payload.totalMedium, 0);
    const totalHard = asNumber(payload.totalHard, 0);

    const attemptedEntry = findDifficultyEntry(payload?.matchedUserStats?.totalSubmissionNum, 'All');
    const attemptedQuestions = asNumber(attemptedEntry?.count, totalSolved);
    const attemptingCount = Math.max(0, attemptedQuestions - totalSolved);

    const yearlySubmissions = days.reduce((sum, day) => sum + day.count, 0);
    const activeDays = days.filter(day => day.count > 0).length;
    const { maxStreak, currentStreak } = calculateStreaks(days);

    setText(leetcodeElements.solvedCount, totalSolved);
    setText(leetcodeElements.totalQuestions, totalQuestions);
    setText(leetcodeElements.attemptingCount, attemptingCount);
    setText(leetcodeElements.easySolved, easySolved);
    setText(leetcodeElements.easyTotal, totalEasy);
    setText(leetcodeElements.mediumSolved, mediumSolved);
    setText(leetcodeElements.mediumTotal, totalMedium);
    setText(leetcodeElements.hardSolved, hardSolved);
    setText(leetcodeElements.hardTotal, totalHard);
    setText(leetcodeElements.yearSubmissions, yearlySubmissions);
    setText(leetcodeElements.activeDays, activeDays);
    setText(leetcodeElements.maxStreak, maxStreak);
    setText(leetcodeElements.currentStreak, currentStreak);
}

function setLeetCodeStatus(message, isError = false) {
    if (!leetcodeElements.status) {
        return;
    }

    leetcodeElements.status.textContent = message;
    leetcodeElements.status.style.color = isError ? '#ef4444' : '';
}

async function loadLeetCodeStats() {
    if (!leetcodeSection) {
        return;
    }

    const username = leetcodeSection.getAttribute('data-username') || 'Madhubalakumar';
    const profileUrl = leetcodeSection.getAttribute('data-profile-url') || `https://leetcode.com/u/${username}/`;
    const endpoint = `https://leetcode-api-faisalshohag.vercel.app/${encodeURIComponent(username)}`;

    leetcodeSection.querySelectorAll('a').forEach(link => {
        link.href = profileUrl;
    });

    setLeetCodeStatus('Syncing activity...');

    try {
        const response = await fetch(endpoint, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Unable to fetch stats (${response.status})`);
        }

        const payload = await response.json();
        const pastYearDays = buildPastYearSeries(payload.submissionCalendar);

        updateLeetCodeStats(payload, pastYearDays);
        renderHeatmap(pastYearDays);

        const dateStamp = new Date().toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        setLeetCodeStatus(`Updated ${dateStamp}`);
    } catch (error) {
        console.error('LeetCode data sync failed:', error);
        setLeetCodeStatus('Live sync unavailable. Showing last saved values.', true);
    }
}

loadLeetCodeStats();