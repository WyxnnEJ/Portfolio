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

            if (!icon) return;

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
            if (refreshIcon) {
                refreshIcon.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    refreshIcon.style.transform = 'rotate(0deg)';
                }, 500);
            }
        }
    }

    // Initialize Quote
    displayRandomQuote();
    const refreshQuoteButton = document.getElementById('refresh-quote');
    if (refreshQuoteButton) {
        refreshQuoteButton.addEventListener('click', displayRandomQuote);
    }

    // --- Typing Animation ---
    const typingTarget = document.getElementById('typing-text');
    const roles = [
        "Software Developer",
        "Discord Staff/Manager",
        "Red Hat Hacker",
        "Certified Idiot",
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
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }

    // --- Clipboard Logic ---
    const copyBtn = document.getElementById('copy-discord');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const username = "Wyxn";
            const tooltip = document.getElementById('discord-tooltip');

            if (!navigator.clipboard) return;

            navigator.clipboard.writeText(username).then(() => {
                if (!tooltip) return;
                tooltip.classList.add('show');
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 2000);
            }).catch(error => console.error('Unable to copy Discord username:', error));
        });
    }

   // --- Form Handling ---
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');

    if (contactForm && submitBtn && btnText && btnLoader) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";
            submitBtn.style.cursor = "not-allowed";
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';

            const formData = new FormData(contactForm);

            try {
            
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                
                    contactForm.reset();
                    btnText.textContent = "Message Sent! ✓";
                    btnText.style.display = 'inline-block';
                    btnLoader.style.display = 'none';
                    
                    submitBtn.style.background = "#2ecc71";
            
                    setTimeout(() => {
                        btnText.textContent = "Send Message";
                        submitBtn.style.background = ""; 
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = "1";
                        submitBtn.style.cursor = "pointer";
                    }, 5000);

                } else {
                    throw new Error('Failed');
                }
            } catch (error) {

                btnText.textContent = "Error! Try again.";
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
            }
        });
    }

    // --- Visit Counter ---
    const robloxGames = [
    { elementId: 'dead-rails-visits', universeId: '7018190066', fallback: '6.5B+' },
    { elementId: 'humankind-visits', universeId: '8107738357', fallback: '5.1M+' },
    { elementId: 'aacampaign-visits', universeId: '7359962123', fallback: '52.7M+' }
];

function useVisitFallbacks() {
    robloxGames.forEach(game => {
        const targetEl = document.getElementById(game.elementId);
        if (targetEl) targetEl.innerText = game.fallback;
    });
}

useVisitFallbacks();

const visitRequestController = new AbortController();
const visitRequestTimeout = setTimeout(() => visitRequestController.abort(), 8000);

fetch('visits.json', {
        cache: 'no-store',
        signal: visitRequestController.signal
    })
    .then(response => {
        if (!response.ok) throw new Error(`Visit data request failed: ${response.status}`);
        return response.json();
    })
    .then(data => {
        if (!data || typeof data !== 'object') throw new Error('Invalid visit data');

        robloxGames.forEach(game => {
            const targetEl = document.getElementById(game.elementId);
            if (!targetEl) return;

            const rawVisits = data[game.universeId];
            if (rawVisits === undefined) {
                targetEl.innerText = game.fallback;
                return;
            }

            let formattedVisits = rawVisits;
            if (rawVisits >= 1e9) {
                formattedVisits = (rawVisits / 1e9).toFixed(1) + "B";
            } else if (rawVisits >= 1e6) {
                formattedVisits = (rawVisits / 1e6).toFixed(1) + "M";
            } else if (rawVisits >= 1e3) {
                formattedVisits = (rawVisits / 1e3).toFixed(1) + "K";
            }

            targetEl.innerText = formattedVisits;
        });
    })
    .catch(error => {
        console.error("Error fetching Roblox visits:", error);
        useVisitFallbacks();
    })
    .finally(() => {
        clearTimeout(visitRequestTimeout);
    });
});