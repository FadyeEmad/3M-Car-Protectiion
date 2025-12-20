document.addEventListener('DOMContentLoaded', () => {
    // Current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Highlighting active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('show');
        });
    }
});

const UNSPLASH_KEY = "bGOshjRkWdD1OI3_AAp0DfQQyEzLTqpBT9d-VLTrwbc";
const carsContainer = document.getElementById("carsContainer");

async function loadCarImages() {
    try {
        const res = await fetch(
            `https://api.unsplash.com/search/photos?query=luxury car&per_page=12`,
            {
                headers: {
                    Authorization: `Client-ID ${UNSPLASH_KEY}`
                }
            }
        );

        const data = await res.json();

        data.results.forEach(photo => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${photo.urls.regular}" alt="Car image">
                <div class="card-content">
                    <p class="credit">
                        Photo by <a href="${photo.user.links.html}" target="_blank">${photo.user.name}</a>
                    </p>
                </div>
            `;

            carsContainer.appendChild(card);
        });

        // duplicate slides for smooth loop
        carsContainer.innerHTML += carsContainer.innerHTML;

    } catch (err) {
        console.error("Error loading car images", err);
    }
}

loadCarImages();
