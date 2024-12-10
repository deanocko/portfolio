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
document.addEventListener("DOMContentLoaded", () => {
	// Check for saved theme preference or system preference
	const savedTheme = localStorage.getItem("theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	if (savedTheme) {
		setTheme(savedTheme);
	} else if (prefersDark) {
		setTheme("dark");
	}

	// Add click event listener to toggle button
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
});
