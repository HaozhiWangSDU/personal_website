document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Toggle Logic ---
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  
  // Icons to swap inside the toggle theme button
  const sunIcon = `<svg viewBox="0 0 24 24" class="sun-icon"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41z"/></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" class="moon-icon"><path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.2-9.8.5-.1 1 .2 1.2.7.2.5 0 1.1-.4 1.4-2.8 2-4.1 5.6-3 9 1.1 3.5 4.3 6 8 6 1.1 0 2.2-.3 3.1-.8.4-.2 1-.2 1.3.1.3.3.5.8.4 1.2-.8 3.6-4 6.2-7.8 6.2z"/></svg>`;

  // Helper function to update the theme button's icon and label
  const updateThemeButton = (theme) => {
    if (!themeToggleBtn) return;
    const isDark = theme === 'dark';
    // We update the theme icon and the text label based on active language
    const currentLang = htmlElement.getAttribute('data-lang') || 'en';
    let label = '';
    if (currentLang === 'cn') {
      label = isDark ? '浅色模式' : '深色模式';
    } else {
      label = isDark ? 'Light Mode' : 'Dark Mode';
    }
    themeToggleBtn.innerHTML = `${isDark ? sunIcon : moonIcon}<span class="theme-text">${label}</span>`;
  };

  // Helper function to set theme
  const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('preferred-theme', theme);
    updateThemeButton(theme);
  };

  // Determine starting theme: check localStorage, then fall back to system preference
  const savedTheme = localStorage.getItem('preferred-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
  
  // Apply initial theme
  setTheme(initialTheme);

  // Add click listener if theme button is present
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // --- 2. Language Toggle Logic ---
  const langToggleBtn = document.getElementById('langToggleBtn');
  const globeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;

  // Helper function to update language toggle button text
  const updateLangButton = (lang) => {
    if (!langToggleBtn) return;
    // Show the language that the user can switch to
    langToggleBtn.innerHTML = `${globeIcon}<span class="lang-text">${lang === 'cn' ? 'English' : '中文'}</span>`;
  };

  // Helper function to set language
  const setLanguage = (lang) => {
    htmlElement.setAttribute('data-lang', lang);
    localStorage.setItem('preferred-lang', lang);
    updateLangButton(lang);
    // Refresh theme button label because it changes language too
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    updateThemeButton(currentTheme);
  };

  // Determine starting language:
  // 1. Check localStorage
  // 2. Check browser language (if it starts with 'zh', use 'cn', otherwise default to 'en')
  const savedLang = localStorage.getItem('preferred-lang');
  let initialLang = 'en'; // default English
  if (savedLang) {
    initialLang = savedLang;
  } else {
    const browserLang = navigator.language || navigator.userLanguage || '';
    if (browserLang.toLowerCase().startsWith('zh')) {
      initialLang = 'cn';
    }
  }

  // Apply initial language
  setLanguage(initialLang);

  // Add click listener if language button is present
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const currentLang = htmlElement.getAttribute('data-lang');
      const newLang = currentLang === 'cn' ? 'en' : 'cn';
      setLanguage(newLang);
    });
  }

  // --- 3. Scroll-to-Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once revealed, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null, // use viewport
      threshold: 0.05, // Lower threshold (5%) to ensure large elements trigger on mobile viewports
      rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

    // Fail-safe: Force activate all reveal elements after 800ms to guarantee no blank content on mobile layout bugs
    setTimeout(() => {
      revealElements.forEach(element => {
        if (!element.classList.contains('active')) {
          element.classList.add('active');
        }
      });
    }, 800);
  }
});
