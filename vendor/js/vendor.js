// Vendor panel JavaScript
let currentVendor = null;
const bootstrap = window.bootstrap;

document.addEventListener('DOMContentLoaded', () => {
    checkVendorAuth();
});

// Check vendor authentication
function checkVendorAuth() {
    const vendorData = sessionStorage.getItem('currentVendor');

    if (!vendorData) {
        showLoginModal();
        return;
    }

    try {
        currentVendor = JSON.parse(vendorData);
        updateVendorInfo();
        loadDashboard();
    } catch (error) {
        console.error('Error parsing vendor data:', error);
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
    const loginForm = document.getElementById('vendorLoginForm');
    loginForm.addEventListener('submit', handleVendorLogin);
}

// Show signup form
function showSignupForm() {
    const loginModal = bootstrap.Modal.getInstance(
        document.getElementById('loginModal')
    );
    loginModal.hide();

    const signupModal = new bootstrap.Modal(
        document.getElementById('signupModal')
    );
    signupModal.show();

    // Setup signup form
    const signupForm = document.getElementById('vendorSignupForm');
    signupForm.addEventListener('submit', handleVendorSignup);
}

// Show login form
function showLoginForm() {
    const signupModal = bootstrap.Modal.getInstance(
        document.getElementById('signupModal')
    );
    signupModal.hide();

    showLoginModal();
}

// Handle vendor login
async function handleVendorLogin(e) {
    e.preventDefault();

    const username = document.getElementById('vendorUsername').value;
    const password = document.getElementById('vendorPassword').value;

    try {
        const formData = new FormData();
        formData.append('action', 'vendor_login');
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch('../php/auth.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            currentVendor = result.vendor;
            sessionStorage.setItem(
                'currentVendor',
                JSON.stringify(currentVendor)
            );

            // Hide login modal
            const loginModal = bootstrap.Modal.getInstance(
                document.getElementById('loginModal')
            );
            loginModal.hide();

            updateVendorInfo();
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

// Handle vendor signup
async function handleVendorSignup(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('action', 'vendor_signup');
    formData.append('username', document.getElementById('signupUsername').value);
    formData.append('email', document.getElementById('signupEmail').value);
    formData.append('password', document.getElementById('signupPassword').value);
    formData.append('full_name', document.getElementById('signupFullName').value);
    formData.append('phone', document.getElementById('signupPhone').value);
    formData.append('city', document.getElementById('signupCity').value);
    formData.append('business_name', document.getElementById('signupBusinessName').value);
    formData.append('address', document.getElementById('signupAddress').value);
    formData.append('business_license', document.getElementById('signupBusinessLicense').value);

    try {
        const response = await fetch('../php/auth.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            // Hide signup modal
            const signupModal = bootstrap.Modal.getInstance(
                document.getElementById('signupModal')
            );
            signupModal.hide();

            showAlert('Registration successful! Please wait for admin approval.', 'success');
            showLoginModal();
        } else {
            showAlert(result.message || 'Registration failed', 'danger');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showAlert('An error occurred during registration', 'danger');
    }
}

// Update vendor info display
function updateVendorInfo() {
    const vendorInfo = document.getElementById('vendorInfo');
    if (vendorInfo && currentVendor) {
        vendorInfo.textContent = `${currentVendor.full_name} - ${currentVendor.city}`;
    }
}

// Load dashboard
async function loadDashboard() {
    try {
        const response = await fetch('../php/vendor.php?action=get_stats');
        const result = await response.json();

        if (result.success) {
            displayDashboardStats(result.stats);
            displayRecentBookings(result.stats.recent_bookings);
        } else {
            showAlert('Failed to load dashboard data', 'danger');
        }
    } catch (error) {
        console.error('Dashboard error:', error);
        // Show placeholder stats
        displayDashboardStats({
            total_services: 0,
            total_bookings: 0,
            total_revenue: 0,
            pending_bookings: 0,
            active_services: 0,
            monthly_earnings: 0,
            recent_bookings: []
        });
    }
}

// Display dashboard stats
function displayDashboardStats(stats) {
    const statsContainer = document.getElementById('statsContainer');

    statsContainer.innerHTML = `
    <div class="col-md-3">
      <div class="stats-card text-center">
        <i class="fas fa-concierge-bell fa-3x text-success mb-3"></i>
        <div class="stats-number text-success">${stats.total_services || 0}</div>
        <h6>My Services</h6>
      </div>
    </div>
    <div class="col-md-3">
      <div class="stats-card text-center">
        <i class="fas fa-calendar-alt fa-3x text-primary mb-3"></i>
        <div class="stats-number text-primary">${stats.total_bookings || 0}</div>
        <h6>Total Bookings</h6>
      </div>
    </div>
    <div class="col-md-3">
      <div class="stats-card text-center">
        <i class="fas fa-money-bill-wave fa-3x text-warning mb-3"></i>
        <div class="stats-number text-warning">PKR ${Number(
            stats.total_revenue || 0
        ).toLocaleString()}</div>
        <h6>Total Revenue</h6>
      </div>
    </div>
    <div class="col-md-3">
      <div class="stats-card text-center">
        <i class="fas fa-clock fa-3x text-info mb-3"></i>
        <div class="stats-number text-info">${stats.pending_bookings || 0}</div>
        <h6>Pending Bookings</h6>
      </div>
    </div>
  `;

    // Update quick stats
    document.getElementById('activeServices').textContent = stats.active_services || 0;
    document.getElementById('pendingBookings').textContent = stats.pending_bookings || 0;
    document.getElementById('monthlyEarnings').textContent = `PKR ${Number(stats.monthly_earnings || 0).toLocaleString()}`;
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
        <small class="text-muted">${booking.contact_name} - PKR ${Number(
            booking.total_price
        ).toLocaleString()}</small>
      </div>
      <div class="text-end">
        <span class="badge bg-${getStatusColor(booking.status)}">${booking.status}</span><br>
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

// Show my bookings
async function showMyBookings() {
    setActiveNavLink('bookings');

    try {
        const response = await fetch('../php/vendor.php?action=get_bookings');
        const result = await response.json();

        if (result.success) {
            displayBookingsTable(result.bookings);
        } else {
            showAlert('Failed to load bookings', 'danger');
        }
    } catch (error) {
        console.error('Bookings error:', error);
        showAlert('Error loading bookings', 'danger');
    }
}

// Display bookings table
function displayBookingsTable(bookings) {
    const dynamicContent = document.getElementById('dynamicContent');
    const dashboardContent = document.getElementById('dashboardContent');

    dashboardContent.style.display = 'none';
    dynamicContent.style.display = 'block';

    dynamicContent.innerHTML = `
    <h2 class="mb-4">My Bookings</h2>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Service</th>
                <th>Customer</th>
                <th>Dates</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${bookings
                  .map(
                      booking => `
                <tr>
                  <td><strong>${booking.booking_reference}</strong></td>
                  <td>${booking.service_title}</td>
                  <td>${booking.contact_name}<br><small>${
                          booking.contact_email
                      }</small></td>
                  <td>${new Date(booking.check_in_date).toLocaleDateString()} - ${new Date(booking.check_out_date).toLocaleDateString()}</td>
                  <td>PKR ${Number(booking.total_price).toLocaleString()}</td>
                  <td><span class="badge bg-${getStatusColor(
                      booking.status
                  )}">${booking.status}</span></td>
                  <td>
                    <select class="form-select form-select-sm" onchange="updateBookingStatus(${
                        booking.id
                    }, this.value)">
                      <option value="pending" ${
                          booking.status === 'pending' ? 'selected' : ''
                      }>Pending</option>
                      <option value="confirmed" ${
                          booking.status === 'confirmed' ? 'selected' : ''
                      }>Confirmed</option>
                      <option value="cancelled" ${
                          booking.status === 'cancelled' ? 'selected' : ''
                      }>Cancelled</option>
                      <option value="completed" ${
                          booking.status === 'completed' ? 'selected' : ''
                      }>Completed</option>
                    </select>
                  </td>
                </tr>
              `
                  )
                  .join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Update booking status
async function updateBookingStatus(bookingId, status) {
    try {
        const formData = new FormData();
        formData.append('action', 'update_booking_status');
        formData.append('booking_id', bookingId);
        formData.append('status', status);

        const response = await fetch('../php/vendor.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            showAlert('Booking status updated successfully', 'success');
        } else {
            showAlert(result.message || 'Failed to update status', 'danger');
        }
    } catch (error) {
        console.error('Update status error:', error);
        showAlert('Error updating booking status', 'danger');
    }
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

// Get status color for badges
function getStatusColor(status) {
    const colors = {
        pending: 'warning',
        confirmed: 'success',
        cancelled: 'danger',
        completed: 'info',
    };
    return colors[status] || 'secondary';
}

// Vendor logout
function vendorLogout() {
    sessionStorage.removeItem('currentVendor');
    currentVendor = null;
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

function showAddService() {
    showAlert('Add Service functionality coming soon', 'info');
}

function showProfile() {
    showAlert('Profile management coming soon', 'info');
}