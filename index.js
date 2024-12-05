document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon && navLinks) {
        // Toggle menu when menu icon is clicked
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuIcon.classList.toggle('active');
        });

        // Close menu when a nav item is clicked on mobile
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuIcon.classList.remove('active');
                }
            });
        });

        // Close menu if clicking outside nav on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !e.target.closest('nav') && 
                !e.target.closest('.menu-icon')) {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('active');
            }
        });
    }

    // FAQ Dropdown Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                // Close all other open answers first
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.classList.remove('active');
                        }
                    }
                });
                
                // Toggle the current answer
                answer.classList.toggle('active');
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const explanationCarousel = document.querySelector('.explanation-carousel');
    const slides = explanationCarousel.querySelectorAll('.explanation-slide');
    const prevButton = explanationCarousel.querySelector('.prev-slide');
    const nextButton = explanationCarousel.querySelector('.next-slide');
    const progressBar = explanationCarousel.querySelector('.progress-bar');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 seconds per slide

    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Add active class to current slide
        slides[index].classList.add('active');

        // Update progress bar based on slide position
        const progressPercentage = (currentSlide / (totalSlides - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
        startAutoSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
        startAutoSlide();
    }

    function startAutoSlide() {
        // Clear any existing interval
        clearInterval(autoSlideInterval);

        // Start new auto-slide interval
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    // Add event listeners to navigation buttons
    nextButton.addEventListener('click', () => {
        nextSlide();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
    });

    // Initialize the first slide and progress bar
    showSlide(currentSlide);

    // Start auto-sliding
    startAutoSlide();
});

document.addEventListener('DOMContentLoaded', () => {
    const gamesCarousel = document.querySelector('.games-carousel');
    const gamesInner = document.querySelector('.games-inner');
    const prevBtn = document.querySelector('.games-prev-btn');
    const nextBtn = document.querySelector('.games-next-btn');
    const gameCards = document.querySelectorAll('.game-card');

    let currentIndex = 0;
    const totalCards = gameCards.length - 1;

    // Function to get visible cards based on screen width
    function getVisibleCards() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) return 1;  // Mobile
        if (screenWidth <= 1024) return 2; // Tablet
        return 3; // Desktop
    }

    function updateCarousel() {
        const visibleCards = getVisibleCards();
        const cardWidth = gameCards[0].offsetWidth + 20; // card width + margin
        gamesInner.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        if (currentIndex < totalCards - visibleCards) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Initial setup and responsive handling
    function setupCarousel() {
        updateCarousel();
    }

    // Initial setup
    setupCarousel();

    // Responsive adjustments
    window.addEventListener('resize', setupCarousel);
});


document.addEventListener('DOMContentLoaded', () => {
    const teamsData = {
        "red-raccoons": Array(5).fill({
            name: "TBA",
            avatar: "/images/teams/red.png",
            link: ""
        }),
        "orange-otters": Array(5).fill({
            name: "TBA",
            avatar: "/images/teams/orange.png",
            link: ""
        }),
        "fire-foxes": Array(5).fill({
            name: "TBA",
            avatar: "/images/teams/yellow.png",
            link: ""
        }),
        "green-goats": Array(5).fill({
            name: "TBA",
            avatar: "/images/teams/green.png",
            link: ""
        }),
        "cyan-crabs": Array(5).fill({
            name: "TBA",
            avatar: "/images/teams/cyan.png",
            link: ""
        }),
        "blue-belugas": Array(5).fill({
            name: "TBA",
            avatar: "/images/teams/blue.png",
            link: ""
        }),
        "purple-puffins": Array(5).fill({
            name: "TBA",
            avatar: "/images/teams/purple.png",
            link: ""
        }),
        "pink-panthers": Array(5).fill({
            name: "TBA",
            avatar: "/images/teams/pink.png",
            link: ""
        })
    };

    function populateTeams() {
        for (const [teamId, players] of Object.entries(teamsData)) {
            const teamList = document.getElementById(teamId);
            if (!teamList) continue;

            teamList.innerHTML = ""; // Clear existing content

            players.forEach(player => {
                const playerElement = document.createElement('li');
                playerElement.classList.add('player');

                const avatar = document.createElement('img');
                avatar.src = player.avatar;
                avatar.alt = `${player.name}'s Avatar`;
                avatar.classList.add('player-head');

                const playerName = document.createElement('span');
                playerName.textContent = player.name;
                playerName.classList.add('player-name');

                playerElement.appendChild(avatar);
                playerElement.appendChild(playerName);
                teamList.appendChild(playerElement);
            });
        }
    }

    populateTeams();
});
