const text = "C:/Users/Stefan Popovski/Projects (Проекти)";
let index = 0;
const element = document.getElementById("typed-text");
const detailsElement = document.getElementById("details");
let intervalId;  // Variable to hold the interval ID for updating the clock

// Typing Effect Function
function type(textToType, elementToType, callback, typingSpeed = 100) {
    let index = 0;
    elementToType.textContent = '';
    function typingLoop() {
        if (index < textToType.length) {
            elementToType.textContent += textToType.charAt(index);
            index++;
            setTimeout(typingLoop, typingSpeed);
        } else {
            callback();
        }
    }
    typingLoop();
}

// Fetch Details Function
async function fetchDetails(typingSpeed = 100) {
    const detailsArray = [
        "Fetching details...",
        "Be sure to check out my projects below!",
    ];

    for (let i = 0; i < detailsArray.length; i++) {
        const detailDiv = document.createElement('div');
        detailsElement.appendChild(detailDiv);

        await new Promise((resolve) => {
            setTimeout(() => {
                type(detailsArray[i], detailDiv, resolve, typingSpeed);
            }, i * 2500);
        });
    }
}











async function fetchUserInfo() {
    try {
        // Fetch the user's IP and location data
        const response = await fetch('https://ipinfo.io/json?token=578e339a6329e3');
        const data = await response.json();

        // Extract user info
        const ip = data.ip;
        const location = data.city + ', ' + data.region + ', ' + data.country;
        const timezone = data.timezone;

        // Set the IP address and location in the sidebar
        document.getElementById("ip-address").textContent = `IP: ${ip}`;
        document.getElementById("location").textContent = `Location: ${location}`;

        // Fetch the current time based on the timezone
        const currentTime = new Date().toLocaleString("en-US", { timeZone: timezone });
        document.getElementById("current-time").textContent = `Time: ${currentTime}`;

        // Start the clock to update every second
        updateClock(timezone);  // Call the function to update the clock immediately
        intervalId = setInterval(() => updateClock(timezone), 1000);  // Update the clock every second
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

// Function to update the clock every second
function updateClock(timezone) {
    const currentTime = new Date().toLocaleString("en-US", { timeZone: timezone });
    document.getElementById("current-time").textContent = `Time: ${currentTime}`;
}

// Fetch user info when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const typingSpeedForName = 100;
    const typingSpeedForDetails = 15;
    type(text, element, () => fetchDetails(typingSpeedForDetails), typingSpeedForName);
    fetchUserInfo(); // Fetch and display user info
});

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle('active');
}
