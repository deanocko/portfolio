// Function to set theme
function setTheme(theme) {
	document.documentElement.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);
}

// Function to toggle theme
function toggleTheme() {
	const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
	const newTheme = currentTheme === "light" ? "dark" : "light";
	setTheme(newTheme);
}

// Initialize theme
function initTheme() {
	const savedTheme = localStorage.getItem("theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	if (savedTheme) {
		setTheme(savedTheme);
	} else if (prefersDark) {
		setTheme("dark");
	} else {
		setTheme("light");
	}
}

// Add event listeners when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
	initTheme();

	const toggleButton = document.getElementById("darkModeToggle");
	if (toggleButton) {
		toggleButton.addEventListener("click", toggleTheme);
	}

	// Listen for system theme changes
	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
		if (!localStorage.getItem("theme")) {
			setTheme(e.matches ? "dark" : "light");
		}
	});

	// Mobile hamburger menu
	const menuButton = document.querySelector(".w-nav-button");
	const navMenu = document.querySelector(".w-nav-menu");

	if (menuButton && navMenu) {
		menuButton.addEventListener("click", () => {
			const isOpen = navMenu.classList.toggle("w--open");
			menuButton.classList.toggle("w--open", isOpen);
			menuButton.setAttribute("aria-expanded", isOpen);
		});

		// Close menu when a nav link is clicked
		navMenu.querySelectorAll(".navigation-item").forEach((link) => {
			link.addEventListener("click", () => {
				navMenu.classList.remove("w--open");
				menuButton.classList.remove("w--open");
				menuButton.setAttribute("aria-expanded", "false");
			});
		});

		// Close menu when clicking outside
		document.addEventListener("click", (e) => {
			if (!menuButton.contains(e.target) && !navMenu.contains(e.target)) {
				navMenu.classList.remove("w--open");
				menuButton.classList.remove("w--open");
				menuButton.setAttribute("aria-expanded", "false");
			}
		});
	}
});
