// Tab functionality
document.addEventListener('DOMContentLoaded', function () {
    // Declare all variables at the top
    const editorialBoardModal = document.getElementById('editorialBoardModal');
    const openEditorialBoard = document.getElementById('view-editorial-board');
    const openEditorialBoardLink = document.getElementById('editorial-board-link');
    const closeEditorialBoard = document.getElementById('closeEditorialBoard');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const closeBtn = document.querySelector('.close-btn');
    const modal = document.getElementById('aboutModal');
    const aboutopenbtn = document.getElementById('viewDetails');
    const aimsScope = document.getElementById('aims&scope');
    const closeBtn1 = document.getElementById('closeModal');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const mobileSearchInput = document.querySelector('.mobile-search input');
    const mobileSearchBtn = document.querySelector('.mobile-search .search-btn');
    const desktopSearchInput = document.querySelector('.search-bar input');
    const desktopSearchBtn = document.querySelector('.search-bar .search-btn');
    const hero = document.querySelector('.hero');
    const heroInner = document.querySelector('.hero-inner');
    const heroLeft = document.querySelector('.hero-left');
    const coverImg = document.querySelector('.cover-img');
    const img = coverImg ? coverImg.querySelector('img') : null;
    const titleBlock = document.querySelector('.title-block');
    const titleH1 = document.querySelector('.title-block h1');
    const primaryNav = document.querySelector('.primary-nav');
    const mobileSearchContainer = document.querySelector('.mobile-search-container');
    const mainContent = document.querySelector('.main');
    const announcementLink = document.getElementById('announcement-link');
    const announcementModal = document.getElementById('announcementModal');
    const closeAnnouncement = document.getElementById('closeAnnouncement');
    const closeNavMenu = document.querySelector('.close-nav-menu');
    
    // New modal variables
    const submitArticleLink = document.querySelector('.right-links a');
    const submitArticleModal = document.getElementById('submitArticleModal');
    const closeSubmitArticle = document.getElementById('closeSubmitArticle');
    const openAuthorGuideFromSubmit = document.getElementById('openAuthorGuideFromSubmit');
    const openAuthorGuideBtn = document.getElementById('openAuthorGuideBtn');

    // Function to safely add event listeners
    function safeAddEventListener(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    // Function to show modal
    function showModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // Function to hide modal
    function hideModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Function to activate tab (with optional scrolling)
    function activateTab(targetId, shouldScroll = true) {
        // Update active tab button
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
            }
        });

        // Show target content
        tabContents.forEach(content => {
            content.classList.add('hidden');
            if (content.id === targetId) {
                content.classList.remove('hidden');
            }
        });

        // Scroll to articles section only if shouldScroll is true
        if (shouldScroll) {
            const articlesSection = document.querySelector('.articles');
            if (articlesSection) {
                setTimeout(() => {
                    articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }

    // Add event listeners to ALL navigation links with data-target attribute
    function setupNavigationLinks() {
        // Get all links in the navigation that have data-target attribute
        const navLinks = document.querySelectorAll('.nav-menu a[data-target]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const target = this.getAttribute('data-target');

                // Activate the tab with scrolling
                activateTab(target, true);

                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }

                // Close dropdowns
                dropdowns.forEach(d => d.classList.remove('active'));
            });
        });
    }

    // Announcement modal functionality
    safeAddEventListener(announcementLink, 'click', function (e) {
        e.preventDefault();
        showModal(announcementModal);

        // Close mobile menu if open
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
        }

        // Close dropdowns
        dropdowns.forEach(d => d.classList.remove('active'));
    });

    safeAddEventListener(closeAnnouncement, 'click', function () {
        hideModal(announcementModal);
    });

    // Submit Article Modal functionality
    safeAddEventListener(submitArticleLink, 'click', function (e) {
        e.preventDefault();
        showModal(submitArticleModal);
    });

    safeAddEventListener(closeSubmitArticle, 'click', function () {
        hideModal(submitArticleModal);
    });

    // Open Author Guide from Submit Article modal
    safeAddEventListener(openAuthorGuideFromSubmit, 'click', function (e) {
        e.preventDefault();
        hideModal(submitArticleModal);
        showModal(document.getElementById('authorGuideModal'));
    });

    safeAddEventListener(openAuthorGuideBtn, 'click', function (e) {
        e.preventDefault();
        hideModal(submitArticleModal);
        showModal(document.getElementById('authorGuideModal'));
    });

    // Close modals when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === announcementModal) {
            hideModal(announcementModal);
        }
        if (e.target === submitArticleModal) {
            hideModal(submitArticleModal);
        }
    });

    // Tab functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const target = this.getAttribute('data-target');
            activateTab(target, true);
        });
    });

    // Modal functionality - Only add listeners if elements exist
    safeAddEventListener(aboutopenbtn, 'click', (e) => {
        e.preventDefault();
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    safeAddEventListener(aimsScope, 'click', (e) => {
        e.preventDefault();
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    safeAddEventListener(closeBtn1, 'click', () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Mobile menu toggle
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Dropdown functionality for mobile
    function handleMobileDropdown(e) {
        if (window.innerWidth <= 767) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');

            // Close other dropdowns at the same level
            const parent = this.closest('.dropdown-menu') || document;
            const siblingDropdowns = parent.querySelectorAll('.dropdown');
            siblingDropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
        }
    }

    // Add click event to dropdown toggles for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', handleMobileDropdown);
    });

    // Close dropdowns when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 767) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        }
    });

    // Mobile search functionality
    if (mobileSearchBtn && mobileSearchInput) {
        mobileSearchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const searchTerm = mobileSearchInput.value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
            }
        });

        // Also allow search on Enter key
        mobileSearchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                mobileSearchBtn.click();
            }
        });
    }

    // Desktop search functionality
    if (desktopSearchBtn && desktopSearchInput) {
        desktopSearchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const searchTerm = desktopSearchInput.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                alert(`Searching for: ${searchTerm}`);
            }
        });

        // Also allow search on Enter key
        desktopSearchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                desktopSearchBtn.click();
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 767) {
            // Reset mobile menu state
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
            document.body.style.overflow = '';

            // Reset dropdowns
            dropdowns.forEach(d => d.classList.remove('active'));
        }

        // Recalculate hero position on resize
        updateHeroPosition();
    });

    // Sticky header behavior with fixed hero at top
    let lastScrollTop = 0;
    let heroFixed = false;
    let heroOriginalTop = 0;
    let heroOriginalHeight = 0;
    const reducedHeroHeight = 70; // Reduced height when fixed (in pixels)
    const scrollThreshold = 10; // Small threshold to prevent immediate fixing

    // Function to reset all styles to initial state
    function resetToInitialState() {
        // Reset tracking variables
        heroFixed = false;
        heroOriginalTop = 0;
        heroOriginalHeight = 0;
        lastScrollTop = 0;

        // Reset hero styles
        if (hero) {
            hero.style.position = '';
            hero.style.top = '';
            hero.style.left = '';
            hero.style.width = '';
            hero.style.zIndex = '';
            hero.style.height = '';
            hero.style.display = '';
            hero.style.alignItems = '';
            hero.style.justifyContent = '';
            hero.style.marginTop = '';
        }

        // Reset hero inner styles
        if (heroInner) {
            heroInner.style.padding = '';
            heroInner.style.width = '';
            heroInner.style.display = '';
            heroInner.style.justifyContent = '';
        }

        // Reset cover image to original state
        if (coverImg) {
            coverImg.style.width = '';
            coverImg.style.height = '';
            coverImg.style.opacity = '1';
            coverImg.style.transform = 'scale(1)';
            coverImg.style.position = '';
            coverImg.style.visibility = 'visible';
        }

        // Reset title block
        if (titleBlock) {
            titleBlock.style.textAlign = '';
            titleBlock.style.width = '';
            titleBlock.style.position = '';
            titleBlock.style.zIndex = '';
        }

        // Reset title font size
        if (titleH1) {
            titleH1.style.fontSize = '';
        }

        // Reset primary nav
        if (primaryNav) {
            primaryNav.style.position = 'sticky';
            primaryNav.style.top = '0';
            primaryNav.style.width = '';
            primaryNav.style.zIndex = '';
        }

        // Reset mobile search container
        if (mobileSearchContainer) {
            mobileSearchContainer.style.position = 'sticky';
            mobileSearchContainer.style.top = '';
            mobileSearchContainer.style.zIndex = '';
        }

        // Reset main content padding
        if (mainContent) {
            mainContent.style.paddingTop = '';
        }

        // Reset body scroll
        document.body.style.overflow = '';

        // Close mobile menu if open
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');

        // Close dropdowns
        dropdowns.forEach(d => d.classList.remove('active'));

        // Close modal
        if (modal) modal.classList.remove('active');
    }

    // Function to update hero position
    function updateHeroPosition() {
        if (!hero) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = hero.offsetHeight;

        // For desktop
        if (window.innerWidth > 767) {
            // Calculate where the hero should become fixed
            if (heroOriginalTop === 0) {
                heroOriginalTop = hero.getBoundingClientRect().top + scrollTop;
                heroOriginalHeight = hero.offsetHeight;
            }

            // Only fix hero if we've scrolled past the threshold
            if (scrollTop >= scrollThreshold && !heroFixed) {
                // Make hero fixed at top
                hero.style.position = 'fixed';
                hero.style.top = '0';
                hero.style.left = '0';
                hero.style.width = '100%';
                hero.style.zIndex = '98';
                hero.style.height = `${reducedHeroHeight}px`;
                hero.style.transition = 'height 0.2s ease';
                hero.style.display = 'flex';
                hero.style.alignItems = 'center';
                hero.style.justifyContent = 'center';
                heroFixed = true;

                // Adjust hero inner padding for reduced height
                if (heroInner) {
                    heroInner.style.padding = '12px 0';
                    heroInner.style.transition = 'padding 0.2s ease';
                    heroInner.style.width = '100%';
                    heroInner.style.display = 'flex';
                    heroInner.style.justifyContent = 'center';
                }

                // Reduce cover image size only when scroll happens
                if (coverImg) {
                    coverImg.style.width = '30px';
                    coverImg.style.height = '40px';
                    coverImg.style.transition = 'width 0.2s ease, height 0.2s ease';
                    coverImg.style.opacity = '1';
                    coverImg.style.visibility = 'visible';
                    coverImg.style.position = 'relative';
                    if (img) {
                        img.style.objectFit = 'contain';
                        img.style.height = '100%';
                    }
                    coverImg.style.marginLeft = '10px';
                }

                // Position title block in center when cover is reduced
                if (titleBlock) {
                    titleBlock.style.transition = 'all 0.2s ease';
                    titleBlock.style.textAlign = 'Left';
                    titleBlock.style.width = '100%';
                    titleBlock.style.position = 'relative';
                    titleBlock.style.zIndex = '1';
                }

                // Adjust title font size for compact header
                if (titleH1) {
                    titleH1.style.fontSize = '18px';
                    titleH1.style.transition = 'font-size 0.3s ease';
                }

                // Add padding to main content to account for fixed hero
                if (mainContent) {
                    mainContent.style.paddingTop = `${reducedHeroHeight}px`;
                    mainContent.style.transition = 'padding-top 0.2s ease';
                }
            }
            // If we've scrolled back up and the hero is fixed
            else if (scrollTop < scrollThreshold && heroFixed) {
                // Return hero to original position
                hero.style.position = '';
                hero.style.top = '';
                hero.style.left = '';
                hero.style.width = '';
                hero.style.zIndex = '';
                hero.style.height = '';
                hero.style.display = '';
                hero.style.alignItems = '';
                hero.style.justifyContent = '';
                heroFixed = false;

                // Restore hero inner padding
                if (heroInner) {
                    heroInner.style.padding = '';
                    heroInner.style.width = '';
                    heroInner.style.display = '';
                    heroInner.style.justifyContent = '';
                }

                // Restore cover image size when scrolling back to top
                if (coverImg) {
                    coverImg.style.width = '';
                    coverImg.style.height = '';
                    coverImg.style.opacity = '1';
                    coverImg.style.visibility = 'visible';
                    coverImg.style.position = '';
                }

                // Restore title block
                if (titleBlock) {
                    titleBlock.style.textAlign = '';
                    titleBlock.style.width = '';
                    titleBlock.style.position = '';
                    titleBlock.style.zIndex = '';
                }

                // Restore title font size
                if (titleH1) {
                    titleH1.style.fontSize = '';
                }

                // Remove padding from main content
                if (mainContent) {
                    mainContent.style.paddingTop = '';
                }
            }

            // Make primary nav sticky below hero if hero is fixed
            if (primaryNav) {
                if (heroFixed) {
                    primaryNav.style.position = 'fixed';
                    primaryNav.style.top = `${reducedHeroHeight}px`;
                    primaryNav.style.width = '100%';
                    primaryNav.style.zIndex = '97';
                    primaryNav.style.transition = 'top 0.2s ease';
                } else {
                    primaryNav.style.position = 'sticky';
                    primaryNav.style.top = '0';
                    primaryNav.style.width = '';
                    primaryNav.style.zIndex = '';
                }
            }
        }
        // For mobile devices
        else {
            // Adjust hero for mobile (no topbar)
            if (hero) {
                hero.style.position = '';
                hero.style.top = '';
                hero.style.left = '';
                hero.style.width = '';
                hero.style.zIndex = '';
                hero.style.height = '';
                hero.style.display = '';
                hero.style.alignItems = '';
                hero.style.justifyContent = '';
                hero.style.marginTop = '0';
                heroFixed = false;
            }

            // Restore hero inner padding on mobile
            if (heroInner) {
                heroInner.style.padding = '';
                heroInner.style.width = '';
                heroInner.style.display = '';
                heroInner.style.justifyContent = '';
            }

            // Show cover image on mobile
            if (coverImg) {
                coverImg.style.opacity = '1';
                coverImg.style.position = '';
                coverImg.style.visibility = 'visible';
                coverImg.style.width = '';
                coverImg.style.height = '';
            }

            // Restore title block on mobile
            if (titleBlock) {
                titleBlock.style.textAlign = '';
                titleBlock.style.width = '';
                titleBlock.style.position = '';
                titleBlock.style.zIndex = '';
            }

            // Restore title font size on mobile
            if (titleH1) {
                titleH1.style.fontSize = '';
            }

            // Make primary nav sticky at top on mobile
            if (primaryNav) {
                primaryNav.style.position = 'sticky';
                primaryNav.style.top = '0';
                primaryNav.style.width = '';
                primaryNav.style.zIndex = '1000';
            }

            // Make mobile search sticky below nav
            if (mobileSearchContainer && primaryNav) {
                mobileSearchContainer.style.position = 'sticky';
                mobileSearchContainer.style.top = `${primaryNav.offsetHeight}px`;
                mobileSearchContainer.style.zIndex = '999';
            }

            // Remove padding from main content
            if (mainContent) {
                mainContent.style.paddingTop = '';
            }
        }

        lastScrollTop = scrollTop;
    }

    // Add event listener to close the mobile menu when the close button is clicked
    safeAddEventListener(closeNavMenu, 'click', function () {
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Add scroll event listener
    window.addEventListener('scroll', updateHeroPosition);

    // Initialize the correct tab on page load
    function initializeTabs() {
        // Set "All Issues" as active by default WITHOUT scrolling
        activateTab('all-issues', false);
    }

    // Initialize positions on page load
    window.addEventListener('load', function () {
        resetToInitialState();
        // Ensure page starts at top
        window.scrollTo(0, 0);
        
        // Small delay to ensure DOM is fully ready
        setTimeout(() => {
            updateHeroPosition();
            // Setup navigation links after page loads
            setupNavigationLinks();
            // Initialize the correct tab on page load WITHOUT scrolling
            initializeTabs();
        }, 50);
    });

    // Also handle pageshow event (for back/forward navigation)
    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            resetToInitialState();
            window.scrollTo(0, 0);
            setTimeout(() => {
                updateHeroPosition();
            }, 100);
        }
    });

    // Also update on resize
    window.addEventListener('resize', updateHeroPosition);

    // Modal handlers for various modals
    const modalHandlers = [
        { open: 'openCallForPapers', close: 'closeCallForPapers', modal: 'callForPapersModal' },
        { open: 'openReviewRegulations', close: 'closeReviewRegulations', modal: 'reviewRegulationsModal' },
        { open: 'openResearchEthics', close: 'closeResearchEthics', modal: 'researchEthicsModal' },
        { open: 'openAuthorGuide', close: 'closeAuthorGuide', modal: 'authorGuideModal' }
    ];

    modalHandlers.forEach(handler => {
        const openBtn = document.getElementById(handler.open);
        const closeBtn = document.getElementById(handler.close);
        const modal = document.getElementById(handler.modal);

        safeAddEventListener(openBtn, 'click', () => showModal(modal));
        safeAddEventListener(closeBtn, 'click', () => hideModal(modal));
    });

    // Editorial Board Modal
    [openEditorialBoard, openEditorialBoardLink].forEach(btn => {
        safeAddEventListener(btn, 'click', (e) => {
            e.preventDefault();
            showModal(editorialBoardModal);
        });
    });

    safeAddEventListener(closeEditorialBoard, 'click', () => {
        hideModal(editorialBoardModal);
    });

    // Close when clicking outside modal
    window.addEventListener('click', (e) => {
        if (e.target === editorialBoardModal) {
            hideModal(editorialBoardModal);
        }
    });
});