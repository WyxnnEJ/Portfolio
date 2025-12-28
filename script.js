document.addEventListener('DOMContentLoaded', () => {

    // --- Light/Dark Mode Toggle ---
    const modeBtn = document.getElementById('mode-btn');
    const icon = modeBtn ? modeBtn.querySelector('i') : null;

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    if (modeBtn) {
        modeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');

            if (document.body.classList.contains('light-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- Random Quote---
    const quotes = [{
            text: "The function of good software is to make the complex appear simple.",
            author: "Grady Booch"
        },
        {
            text: "Security is not a product, but a process.",
            author: "Bruce Schneier"
        },
        {
            text: "Growth and comfort do not coexist.",
            author: "Ginni Rometty"
        },
        {
            text: "Integrity is doing the right thing, even when no one is watching.",
            author: "C.S. Lewis"
        },
        {
            text: "The secret of getting ahead is getting started.",
            author: "Mark Twain"
        },
        {
            text: "On the days you have only 40%, and you give 40%, you gave 100%",
            author: "Jim Kwik"
        }
    ];

    let lastIndex = -1;

    function displayRandomQuote() {
        const quoteElement = document.getElementById('random-quote');
        const authorElement = document.getElementById('random-author');
        const refreshBtn = document.getElementById('refresh-quote');

        if (!quoteElement || !authorElement) return;

        quoteElement.style.opacity = 0;
        authorElement.style.opacity = 0;

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (randomIndex === lastIndex);

        lastIndex = randomIndex;
        const selected = quotes[randomIndex];

        setTimeout(() => {
            quoteElement.textContent = `"${selected.text}"`;
            authorElement.textContent = `— ${selected.author}`;
            quoteElement.style.opacity = 1;
            authorElement.style.opacity = 1;
        }, 250);

        if (refreshBtn) {
            const refreshIcon = refreshBtn.querySelector('i');
            refreshIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                refreshIcon.style.transform = 'rotate(0deg)';
            }, 500);
        }
    }

    // Initialize Quote
    displayRandomQuote();
    document.getElementById('refresh-quote').addEventListener('click', displayRandomQuote);

    // --- Typing Animation ---
    const typingTarget = document.getElementById('typing-text');
    const roles = [
        "Software Developer",
        "Discord Staff/Manager",
        "Red Hat Hacker",
        "Systems Auditor",
        "Game Tester"
    ];
    let roleIndex = 0,
        charIndex = 0,
        isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingTarget.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTarget.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 100;
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            speed = 2500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }
        setTimeout(type, speed);
    }
    if (typingTarget) type();

    // --- Scroll Reveal Logic ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- Clipboard Logic ---
    const copyBtn = document.getElementById('copy-discord');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const username = "Wyxn";
            const tooltip = document.getElementById('discord-tooltip');

            navigator.clipboard.writeText(username).then(() => {
                tooltip.classList.add('show');
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 2000);
            });
        });
    }

    // --- Form Handling ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const submitBtn = document.getElementById('submit-btn');
            const btnText = document.getElementById('btn-text');
            const btnLoader = document.getElementById('btn-loader');

            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";
            submitBtn.style.cursor = "not-allowed";
            btnText.style.display = "none";
            btnLoader.style.display = "inline-block";
        });
    }
});