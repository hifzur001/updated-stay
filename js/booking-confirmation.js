// Booking confirmation page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    checkAuthStatus();

    // Load booking details from session storage
    loadBookingConfirmation();
});

// Declare checkAuthStatus function
function checkAuthStatus() {
    // Placeholder for authentication status check
    console.log('Checking authentication status...');
}

// Declare showAlert function
function showAlert(message, type) {
    // Placeholder for alert display
    console.log(`Alert: ${message} (Type: ${type})`);
}

// Load booking confirmation details
function loadBookingConfirmation() {
    const bookingData = sessionStorage.getItem('bookingConfirmation');

    if (!bookingData) {
        // No booking data found, redirect to services
        showAlert(
            'No booking information found. Redirecting to services...',
            'warning'
        );
        setTimeout(() => {
            window.location.href = 'services.html';
        }, 2000);
        return;
    }

    try {
        const booking = JSON.parse(bookingData);
        displayBookingConfirmation(booking);

        // Clear the session storage after displaying
        sessionStorage.removeItem('bookingConfirmation');
    } catch (error) {
        console.error('Error parsing booking data:', error);
        showAlert(
            'Error loading booking details. Please check your bookings page.',
            'danger'
        );
    }
}

// Display booking confirmation details
function displayBookingConfirmation(booking) {
    const bookingDetailsContainer = document.getElementById('bookingDetails');

    bookingDetailsContainer.innerHTML = `
        <div class="booking-confirmation-details">
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="confirmation-item">
                        <i class="fas fa-ticket-alt text-primary me-2"></i>
                        <strong>Booking Reference:</strong>
                        <div class="mt-1">
                            <span class="badge bg-primary fs-6">${
                                booking.reference
                            }</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="confirmation-item">
                        <i class="fas fa-calendar-alt text-primary me-2"></i>
                        <strong>Booking Date:</strong>
                        <div class="mt-1">${new Date().toLocaleDateString(
                            'en-US',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            }
                        )}</div>
                    </div>
                </div>
            </div>
            
            <div class="row mb-4">
                <div class="col-12">
                    <div class="confirmation-item">
                        <i class="fas fa-concierge-bell text-primary me-2"></i>
                        <strong>Service:</strong>
                        <div class="mt-1 fs-5">${booking.service_title}</div>
                    </div>
                </div>
            </div>
            
            <div class="row mb-4">
                <div class="col-md-4">
                    <div class="confirmation-item">
                        <i class="fas fa-calendar-check text-primary me-2"></i>
                        <strong>Check-in:</strong>
                        <div class="mt-1">${new Date(
                            booking.check_in_date
                        ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="confirmation-item">
                        <i class="fas fa-calendar-times text-primary me-2"></i>
                        <strong>Check-out:</strong>
                        <div class="mt-1">${new Date(
                            booking.check_out_date
                        ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="confirmation-item">
                        <i class="fas fa-users text-primary me-2"></i>
                        <strong>Guests:</strong>
                        <div class="mt-1">${booking.guests} guest${
        booking.guests > 1 ? 's' : ''
    }</div>
                    </div>
                </div>
            </div>
            
            <div class="row mb-4">
                <div class="col-12">
                    <div class="confirmation-item">
                        <i class="fas fa-tag text-success me-2"></i>
                        <strong>Total Amount:</strong>
                        <div class="mt-1">
                            <span class="fs-4 fw-bold text-success">PKR ${booking.total_price.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="alert alert-success">
                <div class="d-flex align-items-center">
                    <i class="fas fa-check-circle fa-2x me-3"></i>
                    <div>
                        <h6 class="mb-1">Booking Status: Confirmed</h6>
                        <p class="mb-0">Your booking has been successfully confirmed. You will receive a confirmation email shortly with all the details.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
