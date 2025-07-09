// My bookings page JavaScript
let allBookings = [];
let currentFilter = 'all';

// Declare variables before using them
function checkAuthStatus() {
    // Placeholder for authentication status check
    return true; // Assume user is logged in for demonstration
}

function showAlert(message, type) {
    // Placeholder for alert function
    console.log(`Alert (${type}): ${message}`);
}

const bootstrap = {
    Modal: function (modalElement) {
        // Placeholder for Bootstrap Modal constructor
        this.show = () => {
            modalElement.style.display = 'block';
        };
        this.hide = () => {
            modalElement.style.display = 'none';
        };
    },
    getInstance: modalElement => {
        // Placeholder for Bootstrap Modal getInstance method
        return new bootstrap.Modal(modalElement);
    },
};

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!checkAuthStatus()) {
        showAlert('Please login to view your bookings.', 'warning');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }

    // Load user bookings
    loadUserBookings();

    // Setup filter tabs
    setupFilterTabs();
});

// Load user bookings
async function loadUserBookings() {
    try {
        const response = await fetch('php/get_bookings.php');
        const result = await response.json();

        if (result.success) {
            allBookings = result.bookings;
            displayBookings(allBookings);
        } else {
            if (response.status === 401) {
                showAlert('Please login to view your bookings.', 'warning');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                showAlert(
                    result.message || 'Failed to load bookings.',
                    'danger'
                );
            }
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
        showAlert('An error occurred while loading bookings.', 'danger');
    }
}

// Setup filter tabs
function setupFilterTabs() {
    const tabButtons = document.querySelectorAll('#bookingTabs .nav-link');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter bookings
            currentFilter = this.getAttribute('data-filter');
            filterBookings(currentFilter);
        });
    });
}

// Filter bookings
function filterBookings(filter) {
    let filteredBookings = allBookings;

    if (filter !== 'all') {
        filteredBookings = allBookings.filter(
            booking => booking.status === filter
        );
    }

    displayBookings(filteredBookings);
}

// Display bookings
function displayBookings(bookings) {
    const container = document.getElementById('bookingsContainer');

    if (!bookings || bookings.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-calendar-times fa-4x text-muted mb-3"></i>
                <h4>No Bookings Found</h4>
                <p class="text-muted mb-4">
                    ${
                        currentFilter === 'all'
                            ? "You haven't made any bookings yet."
                            : `No ${currentFilter} bookings found.`
                    }
                </p>
                <a href="services.html" class="btn btn-primary">
                    <i class="fas fa-search me-2"></i>Browse Services
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = bookings
        .map(booking => createBookingCard(booking))
        .join('');
}

// Create booking card
function createBookingCard(booking) {
    const statusClass = getStatusClass(booking.status);
    const statusIcon = getStatusIcon(booking.status);

    return `
        <div class="card booking-card mb-4" data-booking-id="${booking.id}">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <div class="d-flex align-items-start mb-2">
                            <div class="me-3">
                                <span class="badge ${statusClass}">
                                    <i class="${statusIcon} me-1"></i>${
        booking.status_label
    }
                                </span>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">${booking.service_title}</h5>
                                <p class="text-muted mb-2">
                                    <i class="fas fa-map-marker-alt me-1"></i>${
                                        booking.service_location
                                    }
                                </p>
                                <div class="booking-details">
                                    <span class="me-3">
                                        <i class="fas fa-calendar me-1"></i>
                                        ${booking.check_in_date_formatted} - ${
        booking.check_out_date_formatted
    }
                                    </span>
                                    <span class="me-3">
                                        <i class="fas fa-users me-1"></i>
                                        ${booking.guests} guest${
        booking.guests > 1 ? 's' : ''
    }
                                    </span>
                                    <span>
                                        <i class="fas fa-ticket-alt me-1"></i>
                                        ${booking.booking_reference}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 text-md-end">
                        <div class="mb-2">
                            <span class="fs-5 fw-bold text-success">${
                                booking.total_price_formatted
                            }</span>
                        </div>
                        <div class="mb-2">
                            <small class="text-muted">Booked on ${
                                booking.created_at_formatted
                            }</small>
                        </div>
                        <div class="btn-group">
                            <button class="btn btn-outline-primary btn-sm" onclick="showBookingDetails(${
                                booking.id
                            })">
                                <i class="fas fa-eye me-1"></i>Details
                            </button>
                            ${
                                booking.can_cancel
                                    ? `
                                <button class="btn btn-outline-danger btn-sm" onclick="showCancelConfirmation(${booking.id})">
                                    <i class="fas fa-times me-1"></i>Cancel
                                </button>
                            `
                                    : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Get status class for styling
function getStatusClass(status) {
    const statusClasses = {
        pending: 'bg-warning text-dark',
        confirmed: 'bg-success',
        cancelled: 'bg-danger',
        completed: 'bg-info',
    };
    return statusClasses[status] || 'bg-secondary';
}

// Get status icon
function getStatusIcon(status) {
    const statusIcons = {
        pending: 'fas fa-clock',
        confirmed: 'fas fa-check',
        cancelled: 'fas fa-times',
        completed: 'fas fa-check-circle',
    };
    return statusIcons[status] || 'fas fa-question';
}

// Show booking details modal
function showBookingDetails(bookingId) {
    const booking = allBookings.find(b => b.id === bookingId);
    if (!booking) return;

    const modal = document.getElementById('bookingDetailsModal');
    const modalTitle = document.getElementById('bookingDetailsModalTitle');
    const modalBody = document.getElementById('bookingDetailsModalBody');

    modalTitle.textContent = `Booking Details - ${booking.booking_reference}`;

    modalBody.innerHTML = `
        <div class="booking-details-content">
            <div class="row mb-3">
                <div class="col-md-6">
                    <h6><i class="fas fa-concierge-bell me-2"></i>Service</h6>
                    <p>${booking.service_title}</p>
                    <span class="badge service-badge badge-${booking.service_type
                        .toLowerCase()
                        .replace(/\s+/g, '-')}">${booking.service_type}</span>
                </div>
                <div class="col-md-6">
                    <h6><i class="fas fa-map-marker-alt me-2"></i>Location</h6>
                    <p>${booking.service_location}</p>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-4">
                    <h6><i class="fas fa-calendar-check me-2"></i>Check-in</h6>
                    <p>${booking.check_in_date_formatted}</p>
                </div>
                <div class="col-md-4">
                    <h6><i class="fas fa-calendar-times me-2"></i>Check-out</h6>
                    <p>${booking.check_out_date_formatted}</p>
                </div>
                <div class="col-md-4">
                    <h6><i class="fas fa-users me-2"></i>Guests</h6>
                    <p>${booking.guests} guest${
        booking.guests > 1 ? 's' : ''
    }</p>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <h6><i class="fas fa-user me-2"></i>Contact Name</h6>
                    <p>${booking.contact_name}</p>
                </div>
                <div class="col-md-6">
                    <h6><i class="fas fa-envelope me-2"></i>Contact Email</h6>
                    <p>${booking.contact_email}</p>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <h6><i class="fas fa-phone me-2"></i>Contact Phone</h6>
                    <p>${booking.contact_phone}</p>
                </div>
                <div class="col-md-6">
                    <h6><i class="fas fa-ticket-alt me-2"></i>Booking Reference</h6>
                    <p><strong>${booking.booking_reference}</strong></p>
                </div>
            </div>
            
            ${
                booking.special_requests
                    ? `
                <div class="row mb-3">
                    <div class="col-12">
                        <h6><i class="fas fa-comment me-2"></i>Special Requests</h6>
                        <p>${booking.special_requests}</p>
                    </div>
                </div>
            `
                    : ''
            }
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <h6><i class="fas fa-info-circle me-2"></i>Status</h6>
                    <span class="badge ${getStatusClass(booking.status)}">
                        <i class="${getStatusIcon(booking.status)} me-1"></i>${
        booking.status_label
    }
                    </span>
                </div>
                <div class="col-md-6">
                    <h6><i class="fas fa-tag me-2"></i>Total Amount</h6>
                    <p class="fs-5 fw-bold text-success">${
                        booking.total_price_formatted
                    }</p>
                </div>
            </div>
            
            <div class="row">
                <div class="col-12">
                    <h6><i class="fas fa-clock me-2"></i>Booking Date</h6>
                    <p>${booking.created_at_formatted}</p>
                </div>
            </div>
        </div>
    `;

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

// Show cancel confirmation modal
function showCancelConfirmation(bookingId) {
    const booking = allBookings.find(b => b.id === bookingId);
    if (!booking) return;

    const modal = document.getElementById('cancelConfirmationModal');
    const modalBody = document.getElementById('cancelConfirmationModalBody');
    const confirmBtn = document.getElementById('confirmCancelBtn');

    modalBody.innerHTML = `
        <p>Are you sure you want to cancel the following booking?</p>
        <div class="alert alert-info">
            <strong>${booking.service_title}</strong><br>
            <small>Reference: ${booking.booking_reference}</small><br>
            <small>Dates: ${booking.check_in_date_formatted} - ${booking.check_out_date_formatted}</small>
        </div>
        <p class="text-danger">
            <i class="fas fa-exclamation-triangle me-2"></i>
            This action cannot be undone.
        </p>
    `;

    // Set up cancel confirmation
    confirmBtn.onclick = () => cancelBooking(bookingId);

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

// Cancel booking
async function cancelBooking(bookingId) {
    const confirmBtn = document.getElementById('confirmCancelBtn');
    const originalText = confirmBtn.innerHTML;

    // Show loading state
    confirmBtn.disabled = true;
    confirmBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Cancelling...';

    try {
        const formData = new FormData();
        formData.append('action', 'cancel');
        formData.append('booking_id', bookingId);

        const response = await fetch('php/booking.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            // Hide modal
            const modal = bootstrap.getInstance(
                document.getElementById('cancelConfirmationModal')
            );
            modal.hide();

            // Show success message
            showAlert('Booking cancelled successfully!', 'success');

            // Reload bookings
            loadUserBookings();
        } else {
            showAlert(result.message || 'Failed to cancel booking.', 'danger');
        }
    } catch (error) {
        console.error('Error cancelling booking:', error);
        showAlert('An error occurred while cancelling the booking.', 'danger');
    } finally {
        // Reset button
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = originalText;
    }
}
