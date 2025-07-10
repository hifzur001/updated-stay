// Booking page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    checkAuthStatus();

    // Get service ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');

    if (!serviceId) {
        showAlert('No service selected. Redirecting to services page...', 'warning');
        setTimeout(() => {
            window.location.href = 'services.html';
        }, 2000);
        return;
    }

    // Load service details
    loadServiceDetails(serviceId);
    setupBookingForm();
    setupDateValidation();
    setupPriceCalculation();
});

// Check authentication status
function checkAuthStatus() {
    fetch('php/auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'action=check_session'
    })
    .then(response => response.json())
    .then(result => {
        if (result.success && result.logged_in) {
            // User is logged in, show user avatar
            document.getElementById('authButtons').style.display = 'none';
            document.getElementById('userAvatar').style.display = 'block';
            document.getElementById('usernameDisplay').textContent = result.user.username;
            
            // Pre-fill contact information
            if (result.user.full_name) {
                document.getElementById('contactName').value = result.user.full_name;
            }
            if (result.user.email) {
                document.getElementById('contactEmail').value = result.user.email;
            }
            if (result.user.phone) {
                document.getElementById('contactPhone').value = result.user.phone;
            }
        } else {
            // User not logged in, show auth buttons
            document.getElementById('authButtons').style.display = 'block';
            document.getElementById('userAvatar').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Auth check error:', error);
    });
}

// Load service details
function loadServiceDetails(serviceId) {
    // Get service from the predefined data
    const service = findServiceById(serviceId);
    
    if (!service) {
        showAlert('Service not found. Redirecting to services page...', 'error');
        setTimeout(() => {
            window.location.href = 'services.html';
        }, 2000);
        return;
    }

    // Set service ID in form
    document.getElementById('serviceId').value = serviceId;

    // Display service details
    displayServiceDetails(service);

    // Set initial price
    updatePriceSummary(service);
}

// Setup date validation
function setupDateValidation() {
    const checkInDate = document.getElementById('checkInDate');
    const checkOutDate = document.getElementById('checkOutDate');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkInDate.min = today;
    checkOutDate.min = today;

    // Update checkout minimum when checkin changes
    checkInDate.addEventListener('change', function () {
        const checkInValue = this.value;
        if (checkInValue) {
            const checkInDateObj = new Date(checkInValue);
            checkInDateObj.setDate(checkInDateObj.getDate() + 1);
            checkOutDate.min = checkInDateObj.toISOString().split('T')[0];

            // Clear checkout if it's before new minimum
            if (checkOutDate.value && checkOutDate.value <= checkInValue) {
                checkOutDate.value = '';
            }
        }
        updatePriceSummary();
    });

    checkOutDate.addEventListener('change', updatePriceSummary);
    document.getElementById('guests').addEventListener('change', updatePriceSummary);
}

// Setup price calculation
function setupPriceCalculation() {
    const guestsInput = document.getElementById('guests');
    const serviceId = document.getElementById('serviceId').value;
    const service = findServiceById(serviceId);

    if (service && service.maxGuests) {
        guestsInput.max = service.maxGuests;
    }
}

// Update price summary
function updatePriceSummary(service = null) {
    if (!service) {
        const serviceId = document.getElementById('serviceId').value;
        service = findServiceById(serviceId);
    }

    if (!service) return;

    const checkInDate = document.getElementById('checkInDate').value;
    const checkOutDate = document.getElementById('checkOutDate').value;
    const guests = parseInt(document.getElementById('guests').value) || 1;

    // Update guest count display
    document.getElementById('guestCount').textContent = `${guests} guest${guests > 1 ? 's' : ''}`;

    // Calculate base price
    let basePrice = 0;
    let priceLabel = '';

    if (service.price_per_night) {
        basePrice = service.price_per_night;
        priceLabel = 'per night';
    } else if (service.price_per_day) {
        basePrice = service.price_per_day;
        priceLabel = 'per day';
    } else if (service.price_per_hour) {
        basePrice = service.price_per_hour;
        priceLabel = 'per hour';
    } else if (service.price) {
        basePrice = service.price;
        priceLabel = 'total';
    }

    document.getElementById('basePrice').textContent = `PKR ${basePrice.toLocaleString()} ${priceLabel}`;

    // Calculate duration and total
    let totalPrice = basePrice;
    let duration = '1 day';

    if (checkInDate && checkOutDate) {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

        if (nights > 0) {
            duration = `${nights} ${nights === 1 ? 'day' : 'days'}`;

            if (service.price_per_night || service.price_per_day) {
                totalPrice = basePrice * nights;
            }
        }
    }

    // Apply guest multiplier for certain service types
    if (['Experience', 'Adventure', 'Cultural', 'Food & Dining'].includes(service.type) && guests > 1) {
        totalPrice *= guests;
    }

    document.getElementById('duration').textContent = duration;
    document.getElementById('totalPrice').textContent = `PKR ${totalPrice.toLocaleString()}`;
}

// Setup booking form
function setupBookingForm() {
    const form = document.getElementById('bookingForm');
    form.addEventListener('submit', handleBookingSubmission);
}

// Handle booking form submission
async function handleBookingSubmission(e) {
    e.preventDefault();

    // Check if user is logged in
    const authCheck = await fetch('php/auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'action=check_session'
    });
    
    const authResult = await authCheck.json();
    
    if (!authResult.success || !authResult.logged_in) {
        showAlert('Please login to make a booking', 'warning');
        showLoginModal();
        return;
    }

    const submitBtn = document.getElementById('submitBooking');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';

    try {
        const formData = new FormData(e.target);
        formData.append('action', 'create');

        const response = await fetch('php/booking.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            // Store booking details for confirmation page
            sessionStorage.setItem('bookingConfirmation', JSON.stringify(result.booking));

            // Redirect to confirmation page
            window.location.href = 'booking-confirmation.html';
        } else {
            showAlert(result.message || 'Booking failed. Please try again.', 'danger');
        }
    } catch (error) {
        console.error('Booking error:', error);
        showAlert('An error occurred. Please try again.', 'danger');
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Find service by ID
function findServiceById(serviceId) {
    const servicesData = {
        'lahore-1': {
            id: 'lahore-1',
            title: 'Luxury Villa in DHA Phase 5',
            type: 'Accommodation',
            rating: 4.8,
            description: 'Luxurious villa with modern amenities in the heart of DHA Phase 5',
            location: 'DHA Phase 5, Lahore',
            maxGuests: 8,
            price_per_night: 12000,
            picture: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
            amenities: ['WiFi', 'AC', 'Parking', 'Security', 'Garden'],
            brokerName: 'Ahmed Khan',
            brokerPhone: '+92 300 1234567'
        },
        'lahore-2': {
            id: 'lahore-2',
            title: 'Old City Heritage Food Tour',
            type: 'Experience',
            rating: 4.9,
            description: 'Authentic food tour through Lahore historic old city',
            location: 'Gawalmandi, Lahore',
            maxGuests: 12,
            price: 3000,
            picture: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
            amenities: ['Guide', 'Food Tastings', 'Transportation'],
            brokerName: 'Fatima Ali',
            brokerPhone: '+92 301 2345678'
        },
        'karachi-1': {
            id: 'karachi-1',
            title: 'Clifton Beach Luxury Apartment',
            type: 'Accommodation',
            rating: 4.7,
            description: 'Luxury apartment with sea view in Clifton',
            location: 'Clifton Block 4, Karachi',
            maxGuests: 6,
            price_per_night: 8500,
            picture: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
            amenities: ['Sea View', 'WiFi', 'AC', 'Parking'],
            brokerName: 'Zara Ahmed',
            brokerPhone: '+92 305 1234567'
        },
        'karachi-2': {
            id: 'karachi-2',
            title: 'Manora Island Deep Sea Fishing',
            type: 'Experience',
            rating: 4.8,
            description: 'Deep sea fishing experience around Manora Island',
            location: 'Manora Island, Karachi',
            maxGuests: 8,
            price: 4500,
            picture: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
            amenities: ['Boat', 'Equipment', 'Lunch', 'Guide'],
            brokerName: 'Captain Rashid',
            brokerPhone: '+92 306 2345678'
        },
        'islamabad-1': {
            id: 'islamabad-1',
            title: 'Margalla Hills Eco Resort',
            type: 'Accommodation',
            rating: 4.9,
            description: 'Eco-friendly resort in the Margalla Hills',
            location: 'Margalla Hills, Islamabad',
            maxGuests: 4,
            price_per_night: 9500,
            picture: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
            amenities: ['Mountain View', 'Hiking Trails', 'Organic Food'],
            brokerName: 'Dr. Sarah Khan',
            brokerPhone: '+92 308 1234567'
        },
        'islamabad-2': {
            id: 'islamabad-2',
            title: 'Margalla Hills Hiking',
            type: 'Adventure',
            rating: 4.6,
            description: 'Guided hiking tours in Margalla Hills',
            location: 'Margalla Hills National Park',
            maxGuests: 15,
            price: 1500,
            picture: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
            amenities: ['Guide', 'Water', 'First Aid', 'Nature Experience'],
            brokerName: 'Hiking Guide Ahmad',
            brokerPhone: '+92 309 2345678'
        }
    };

    return servicesData[serviceId] || null;
}

// Display service details
function displayServiceDetails(service) {
    const serviceDetailsContainer = document.getElementById('serviceDetails');

    const priceDisplay = service.price_per_night
        ? `PKR ${service.price_per_night.toLocaleString()}/night`
        : service.price_per_day
        ? `PKR ${service.price_per_day.toLocaleString()}/day`
        : service.price_per_hour
        ? `PKR ${service.price_per_hour.toLocaleString()}/hour`
        : service.price_per_km
        ? `PKR ${service.price_per_km}/km`
        : service.price
        ? `PKR ${service.price.toLocaleString()}`
        : 'Contact for Price';

    const generateStars = rating => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        if (halfStar) {
            stars += '☆';
        }
        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            stars += '☆';
        }
        
        return stars;
    };

    serviceDetailsContainer.innerHTML = `
        <div class="service-summary">
            <img src="${service.picture}" class="img-fluid rounded mb-3" alt="${service.title}">
            <h5 class="mb-2">${service.title}</h5>
            <div class="mb-2">
                <span class="badge service-badge badge-${service.type.toLowerCase().replace(/\s+/g, '-')}">${service.type}</span>
                <div class="rating-stars mt-1">
                    <span class="text-warning">${generateStars(service.rating)}</span>
                    <small class="text-muted ms-1">(${service.rating})</small>
                </div>
            </div>
            <p class="text-muted mb-3">${service.description}</p>
            <div class="mb-2">
                <i class="fas fa-map-marker-alt me-2 text-primary"></i>
                <span>${service.location}</span>
            </div>
            <div class="mb-2">
                <i class="fas fa-users me-2 text-primary"></i>
                <span>Max ${service.maxGuests} guests</span>
            </div>
            <div class="mb-3">
                <i class="fas fa-tag me-2 text-primary"></i>
                <span class="fw-bold text-green-primary">${priceDisplay}</span>
            </div>
            ${service.amenities ? `
                <div class="amenities">
                    <h6 class="mb-2">Amenities:</h6>
                    ${service.amenities.slice(0, 5).map(amenity => 
                        `<span class="feature-item-small">${amenity}</span>`
                    ).join('')}
                    ${service.amenities.length > 5 ? 
                        `<span class="feature-item-small">+${service.amenities.length - 5} more</span>` : ''
                    }
                </div>
            ` : ''}
            
            <div class="mt-3 pt-3 border-top">
                <h6 class="mb-2">Service Provider:</h6>
                <div class="d-flex align-items-center">
                    <i class="fas fa-user-circle fa-2x text-primary me-3"></i>
                    <div>
                        <div class="fw-bold">${service.brokerName}</div>
                        <small class="text-muted">${service.brokerPhone}</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Show alert function
function showAlert(message, type = 'info') {
    // Create alert container if it doesn't exist
    let alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alertContainer';
        alertContainer.className = 'position-fixed top-0 end-0 p-3';
        alertContainer.style.zIndex = '9999';
        document.body.appendChild(alertContainer);
    }

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    alertContainer.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Show login modal function
function showLoginModal() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}