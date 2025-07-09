// Broker panel JavaScript
let currentBroker = null;
const bootstrap = window.bootstrap; // Declare the bootstrap variable

document.addEventListener('DOMContentLoaded', () => {
    checkBrokerAuth();
});

// Check broker authentication
function checkBrokerAuth() {
    const brokerData = sessionStorage.getItem('currentBroker');

    if (!brokerData) {
        showLoginModal();
        return;
    }

    try {
        currentBroker = JSON.parse(brokerData);
        updateBrokerInfo();
        loadDashboard();
    } catch (error) {
        console.error('Error parsing broker data:', error);
        showLoginModal();
    }
}

// Show login modal
function showLoginModal() {
    const loginModal = new bootstrap.Modal(
        document.getElementById('loginModal')
    );
    loginModal.show();

    // Setup login form
    const loginForm = document.getElementById('brokerLoginForm');
    loginForm.addEventListener('submit', handleBrokerLogin);
}

// Handle broker login
async function handleBrokerLogin(e) {
    e.preventDefault();

    const username = document.getElementById('brokerUsername').value;
    const password = document.getElementById('brokerPassword').value;

    try {
        const formData = new FormData();
        formData.append('action', 'broker_login');
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch('../php/auth.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            currentBroker = result.broker;
            sessionStorage.setItem(
                'currentBroker',
                JSON.stringify(currentBroker)
            );

            // Hide login modal
            const loginModal = bootstrap.Modal.getInstance(
                document.getElementById('loginModal')
            );
            loginModal.hide();

            updateBrokerInfo();
            loadDashboard();
            showAlert('Login successful!', 'success');
        } else {
            showAlert(result.message || 'Login failed', 'danger');
        }
    } catch (error) {
        console.error('Login error:', error);
        showAlert('An error occurred during login', 'danger');
    }
}

// Update broker info display
function updateBrokerInfo() {
    const brokerInfo = document.getElementById('brokerInfo');
    if (brokerInfo && currentBroker) {
        brokerInfo.textContent = `${currentBroker.full_name} - ${currentBroker.city}`;
    }
}

// Load dashboard
async function loadDashboard() {
    try {
        // For now, show placeholder stats
        displayDashboardStats({
            total_services: 0,
            total_bookings: 0,
            total_revenue: 0,
            pending_bookings: 0,
        });

        displayRecentBookings([]);
    } catch (error) {
        console.error('Dashboard error:', error);
        showAlert('Error loading dashboard', 'danger');
    }
}

// Display dashboard stats
function displayDashboardStats(stats) {
    const statsContainer = document.getElementById('statsContainer');

    statsContainer.innerHTML = `
    <div class="col-md-3">
      <div class="stats-card text-center">
        <i class="fas fa-concierge-bell fa-3x text-primary mb-3"></i>
        <div class="stats-number">${stats.total_services}</div>
        <h6>My Services</h6>
      </div>
    </div>
    <div class="col-md-3">
      <div class="stats-card text-center">
        <i class="fas fa-calendar-alt fa-3x text-success mb-3"></i>
        <div class="stats-number">${stats.total_bookings}</div>
        <h6>Total Bookings</h6>
      </div>
    </div>
    <div class="col-md-3">
      <div class="stats-card text-center">
        <i class="fas fa-money-bill-wave fa-3x text-warning mb-3"></i>
        <div class="stats-number">PKR ${Number(
            stats.total_revenue
        ).toLocaleString()}</div>
        <h6>Total Revenue</h6>
      </div>
    </div>
    <div class="col-md-3">
      <div class="stats-card text-center">
        <i class="fas fa-clock fa-3x text-info mb-3"></i>
        <div class="stats-number">${stats.pending_bookings}</div>
        <h6>Pending Bookings</h6>
      </div>
    </div>
  `;
}

// Display recent bookings
function displayRecentBookings(bookings) {
    const recentBookingsContainer = document.getElementById('recentBookings');

    if (!bookings || bookings.length === 0) {
        recentBookingsContainer.innerHTML =
            '<p class="text-muted">No recent bookings</p>';
        return;
    }

    const bookingsHtml = bookings
        .map(
            booking => `
    <div class="d-flex justify-content-between align-items-center border-bottom py-2">
      <div>
        <strong>${booking.service_title}</strong><br>
        <small class="text-muted">PKR ${Number(
            booking.total_price
        ).toLocaleString()}</small>
      </div>
      <div class="text-end">
        <small class="text-muted">${new Date(
            booking.created_at
        ).toLocaleDateString()}</small>
      </div>
    </div>
  `
        )
        .join('');

    recentBookingsContainer.innerHTML = bookingsHtml;
}

// Show dashboard
function showDashboard() {
    setActiveNavLink('dashboard');

    const dynamicContent = document.getElementById('dynamicContent');
    const dashboardContent = document.getElementById('dashboardContent');

    dynamicContent.style.display = 'none';
    dashboardContent.style.display = 'block';

    loadDashboard();
}

// Set active navigation link
function setActiveNavLink(section) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Find the correct nav link based on onclick attribute or text content
    const navLink = Array.from(navLinks).find(
        link =>
            link.textContent.toLowerCase().includes(section.toLowerCase()) ||
            link.getAttribute('onclick')?.includes(section)
    );

    if (navLink) {
        navLink.classList.add('active');
    }
}

// Broker logout
function brokerLogout() {
    sessionStorage.removeItem('currentBroker');
    currentBroker = null;
    showLoginModal();
}

// Show alert
function showAlert(message, type = 'info') {
    const alertContainer =
        document.getElementById('alertContainer') || createAlertContainer();

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

    alertContainer.appendChild(alert);

    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Create alert container
function createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alertContainer';
    container.className = 'position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Placeholder functions for other sections
function showMyServices() {
    showAlert('My Services management coming soon', 'info');
}

function showMyBookings() {
    showAlert('My Bookings management coming soon', 'info');
}

function showAddService() {
    showAlert('Add Service functionality coming soon', 'info');
}

function showProfile() {
    showAlert('Profile management coming soon', 'info');
}
