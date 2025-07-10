// Admin panel JavaScript
let currentAdmin = null;
const bootstrap = window.bootstrap;

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
});

// Check admin authentication
function checkAdminAuth() {
    const adminData = sessionStorage.getItem('currentAdmin');

    if (!adminData) {
        showLoginModal();
        return;
    }

    try {
        currentAdmin = JSON.parse(adminData);
        updateAdminInfo();
        loadDashboard();
    } catch (error) {
        console.error('Error parsing admin data:', error);
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
    const loginForm = document.getElementById('adminLoginForm');
    loginForm.addEventListener('submit', handleAdminLogin);
}

// Handle admin login
async function handleAdminLogin(e) {
    e.preventDefault();

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    try {
        const formData = new FormData();
        formData.append('action', 'admin_login');
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch('../php/auth.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            currentAdmin = result.admin;
            sessionStorage.setItem(
                'currentAdmin',
                JSON.stringify(currentAdmin)
            );

            // Hide login modal
            const loginModal = bootstrap.Modal.getInstance(
                document.getElementById('loginModal')
            );
            loginModal.hide();

            updateAdminInfo();
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

// Update admin info display
function updateAdminInfo() {
    const adminInfo = document.getElementById('adminInfo');
    if (adminInfo && currentAdmin) {
        adminInfo.textContent = `${
            currentAdmin.full_name || currentAdmin.username
        }`;
    }
}

// Load dashboard
async function loadDashboard() {
    try {
        const response = await fetch('../php/admin.php?action=get_stats');
        const result = await response.json();

        if (result.success) {
            displayDashboardStats(result.stats);
            displayRecentBookings(result.stats.recent_bookings);
        } else {
            showAlert('Failed to load dashboard data', 'danger');
        }
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
        <i class="fas fa-calendar-alt fa-3x text-primary mb-3"></i>
        <div class="stats-number text-primary">${stats.total_bookings}</div>
        <h6>Total Bookings</h6>
      </div>
    </div>
    <div class="col-md-3">
      <div class="stats-card text-center">
        <i class="fas fa-users fa-3x text-success mb-3"></i>
        <div class="stats-number text-success">${stats.total_users}</div>
        <h6>Total Users</h6>
      </div>
    </div>
    <div class="col-md-3">
      <div class="stats-card text-center">
        <i class="fas fa-store fa-3x text-info mb-3"></i>
        <div class="stats-number text-info">${stats.total_vendors}</div>
        <h6>Total Vendors</h6>
      </div>
    </div>
    <div class="col-md-3">
      <div class="stats-card text-center">
        <i class="fas fa-money-bill-wave fa-3x text-warning mb-3"></i>
        <div class="stats-number text-warning">PKR ${Number(
            stats.total_revenue
        ).toLocaleString()}</div>
        <h6>Total Revenue</h6>
      </div>
    </div>
  `;

    // Update quick stats
    document.getElementById('activeServices').textContent = stats.active_services || 0;
    document.getElementById('pendingApprovals').textContent = stats.pending_approvals || 0;
    document.getElementById('monthlyRevenue').textContent = `PKR ${Number(stats.monthly_revenue || 0).toLocaleString()}`;
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

// Show bookings
async function showBookings() {
    setActiveNavLink('bookings');

    try {
        const response = await fetch('../php/admin.php?action=get_bookings');
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
    <h2 class="mb-4">All Bookings</h2>
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

// Show users
async function showUsers() {
    setActiveNavLink('users');

    try {
        const response = await fetch('../php/admin.php?action=get_users');
        const result = await response.json();

        if (result.success) {
            displayUsersTable(result.users);
        } else {
            showAlert('Failed to load users', 'danger');
        }
    } catch (error) {
        console.error('Users error:', error);
        showAlert('Error loading users', 'danger');
    }
}

// Display users table
function displayUsersTable(users) {
    const dynamicContent = document.getElementById('dynamicContent');
    const dashboardContent = document.getElementById('dashboardContent');

    dashboardContent.style.display = 'none';
    dynamicContent.style.display = 'block';

    dynamicContent.innerHTML = `
    <h2 class="mb-4">All Users</h2>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              ${users
                  .map(
                      user => `
                <tr>
                  <td>${user.id}</td>
                  <td>${user.username}</td>
                  <td>${user.email}</td>
                  <td>${user.full_name || '-'}</td>
                  <td>${user.phone || '-'}</td>
                  <td><span class="badge bg-${user.role === 'admin' ? 'danger' : 'primary'}">${user.role}</span></td>
                  <td><span class="badge bg-${user.status === 'active' ? 'success' : 'secondary'}">${user.status}</span></td>
                  <td>${new Date(user.created_at).toLocaleDateString()}</td>
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

// Show vendors
async function showVendors() {
    setActiveNavLink('vendors');

    try {
        const response = await fetch('../php/admin.php?action=get_vendors');
        const result = await response.json();

        if (result.success) {
            displayVendorsTable(result.vendors);
        } else {
            showAlert('Failed to load vendors', 'danger');
        }
    } catch (error) {
        console.error('Vendors error:', error);
        showAlert('Error loading vendors', 'danger');
    }
}

// Display vendors table
function displayVendorsTable(vendors) {
    const dynamicContent = document.getElementById('dynamicContent');
    const dashboardContent = document.getElementById('dashboardContent');

    dashboardContent.style.display = 'none';
    dynamicContent.style.display = 'block';

    dynamicContent.innerHTML = `
    <h2 class="mb-4">All Vendors</h2>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Business Name</th>
                <th>Owner</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${vendors
                  .map(
                      vendor => `
                <tr>
                  <td>${vendor.id}</td>
                  <td>${vendor.business_name}</td>
                  <td>${vendor.full_name}</td>
                  <td>${vendor.email}</td>
                  <td>${vendor.phone}</td>
                  <td>${vendor.city}</td>
                  <td><span class="badge bg-${getVendorStatusColor(vendor.status)}">${vendor.status}</span></td>
                  <td>
                    ${vendor.status === 'pending' ? `
                      <button class="btn btn-success btn-sm me-1" onclick="approveVendor(${vendor.id})">Approve</button>
                      <button class="btn btn-danger btn-sm" onclick="rejectVendor(${vendor.id})">Reject</button>
                    ` : `
                      <select class="form-select form-select-sm" onchange="updateVendorStatus(${vendor.id}, this.value)">
                        <option value="active" ${vendor.status === 'active' ? 'selected' : ''}>Active</option>
                        <option value="inactive" ${vendor.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                      </select>
                    `}
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

        const response = await fetch('../php/admin.php', {
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

// Approve vendor
async function approveVendor(vendorId) {
    try {
        const formData = new FormData();
        formData.append('action', 'update_vendor_status');
        formData.append('vendor_id', vendorId);
        formData.append('status', 'active');

        const response = await fetch('../php/admin.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            showAlert('Vendor approved successfully', 'success');
            showVendors(); // Refresh the table
        } else {
            showAlert(result.message || 'Failed to approve vendor', 'danger');
        }
    } catch (error) {
        console.error('Approve vendor error:', error);
        showAlert('Error approving vendor', 'danger');
    }
}

// Show messages
async function showMessages() {
    setActiveNavLink('messages');

    try {
        const response = await fetch('../php/admin.php?action=get_messages');
        const result = await response.json();

        if (result.success) {
            displayMessagesTable(result.messages);
        } else {
            showAlert('Failed to load messages', 'danger');
        }
    } catch (error) {
        console.error('Messages error:', error);
        showAlert('Error loading messages', 'danger');
    }
}

// Display messages table
function displayMessagesTable(messages) {
    const dynamicContent = document.getElementById('dynamicContent');
    const dashboardContent = document.getElementById('dashboardContent');

    dashboardContent.style.display = 'none';
    dynamicContent.style.display = 'block';

    dynamicContent.innerHTML = `
    <h2 class="mb-4">Contact Messages</h2>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${messages
                  .map(
                      message => `
                <tr>
                  <td>${message.first_name} ${message.last_name}</td>
                  <td>${message.email}</td>
                  <td>${message.subject}</td>
                  <td>${message.message.substring(0, 100)}${
                          message.message.length > 100 ? '...' : ''
                      }</td>
                  <td>${new Date(message.created_at).toLocaleDateString()}</td>
                  <td><span class="badge bg-${getMessageStatusColor(
                      message.status
                  )}">${message.status}</span></td>
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

    const activeLink = document.querySelector(
        `[onclick*="${section}"]`
    );
    if (activeLink) {
        activeLink.classList.add('active');
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

// Get vendor status color
function getVendorStatusColor(status) {
    const colors = {
        active: 'success',
        inactive: 'secondary',
        pending: 'warning',
    };
    return colors[status] || 'secondary';
}

// Get message status color
function getMessageStatusColor(status) {
    const colors = {
        new: 'primary',
        read: 'info',
        replied: 'success',
        closed: 'secondary',
    };
    return colors[status] || 'secondary';
}

// Admin logout
function adminLogout() {
    sessionStorage.removeItem('currentAdmin');
    currentAdmin = null;
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
function showServices() {
    showAlert('Services management coming soon', 'info');
}