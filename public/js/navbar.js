document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navContent = document.getElementById('nav-content');
    const dropdowns = document.querySelectorAll('.dropdown-wrapper');
    let lastScroll = 0;

    // Mobile menu toggle
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Handle dropdowns
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-button');
        const menu = dropdown.querySelector('.dropdown-menu');
        let isOpen = false;

        // Toggle dropdown on click
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Tutup dropdown lain
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                    const otherIcon = otherDropdown.querySelector('.dropdown-icon');
                    otherMenu.classList.add('hidden');
                    otherIcon?.classList.remove('rotate-180');
                }
            });

            // Toggle current dropdown
            isOpen = !isOpen;
            if (isOpen) {
                menu.classList.remove('hidden');
                button.querySelector('.dropdown-icon')?.classList.add('rotate-180');
            } else {
                menu.classList.add('hidden');
                button.querySelector('.dropdown-icon')?.classList.remove('rotate-180');
            }
        });

        // Prevent menu from closing when clicking inside dropdown
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                const icon = dropdown.querySelector('.dropdown-icon');
                menu.classList.add('hidden');
                icon?.classList.remove('rotate-180');
            });
        }
    });

    function toggleMobileMenu() {
        const isHidden = navContent.classList.contains('hidden');
        
        if (isHidden) {
            navContent.classList.remove('hidden');
            navContent.classList.add('flex');
            mobileMenuButton.innerHTML = '<i class="bx bx-x text-3xl"></i>';
        } else {
            navContent.classList.add('hidden');
            navContent.classList.remove('flex');
            mobileMenuButton.innerHTML = '<i class="bx bx-menu text-3xl"></i>';
        }
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navContent.classList.remove('flex');
            navContent.classList.add('hidden', 'md:flex');
            mobileMenuButton.innerHTML = '<i class="bx bx-menu text-3xl"></i>';
            
            // Reset all dropdowns
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                const icon = dropdown.querySelector('.dropdown-icon');
                menu.classList.add('hidden');
                icon?.classList.remove('rotate-180');
            });
        }
    });

    // Navbar scroll behavior
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 0) {
            navbar.classList.add('bg-[#121212]/80', 'backdrop-blur-md');
        } else {
            navbar.classList.remove('bg-[#121212]/80', 'backdrop-blur-md');
        }

        if (window.innerWidth >= 768) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        lastScroll = currentScroll;
    });
}); 