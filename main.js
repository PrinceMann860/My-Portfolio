document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeBtn = document.getElementById('theme');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    body.classList.toggle('light-mode', savedTheme === 'light');
    
    // Update button icons based on current theme
    updateThemeIcons();
    
    function toggleTheme() {
        const isDark = body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode', !isDark);
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update button icons
        updateThemeIcons();
    }
    
    function updateThemeIcons() {
        const isDark = body.classList.contains('dark-mode');
        document.querySelector('#theme .fa-sun').style.display = isDark ? 'none' : 'inline-block';
        document.querySelector('#theme .fa-moon').style.display = isDark ? 'inline-block' : 'none';
    }
    
    themeBtn.addEventListener('click', toggleTheme);

    // Mobile menu functionality (rest of your existing code remains the same)
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const navList = document.getElementById('nav-list');
    const menuIcon = menuBtn.querySelector('i');

    function toggleMenu() {
        const isOpen = navList.classList.toggle('show');
        document.body.classList.toggle('menu-open', isOpen);
        menuBtn.setAttribute('aria-expanded', isOpen);
        
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    closeMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking a link
    document.querySelectorAll('#nav-list a, #nav-list button:not(#close-menu)').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 900 && navList.classList.contains('show')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 900 && 
            navList.classList.contains('show') && 
            !e.target.closest('nav') && 
            !e.target.closest('#nav-list')) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('show')) {
            toggleMenu();
        }
    });

    // Close menu on resize if screen gets larger
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navList.classList.contains('show')) {
            toggleMenu();
        }
    });
});
