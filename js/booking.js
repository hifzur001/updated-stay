// Booking page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const checkAuthStatus = () => {
        // Placeholder for authentication check logic
        console.log('Checking authentication status...');
    };

    checkAuthStatus();

    // Get service ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');

    if (!serviceId) {
        const showAlert = (message, type) => {
            // Placeholder for alert logic
            console.log(`Alert: ${message} (Type: ${type})`);
        };

        showAlert(
            'No service selected. Redirecting to services page...',
            'warning'
        );
        setTimeout(() => {
            window.location.href = 'services.html';
        }, 2000);
        return;
    }

    // Load service details
    const loadServiceDetails = serviceId => {
        const service = findServiceById(serviceId);

        if (!service) {
            const showAlert = (message, type) => {
                // Placeholder for alert logic
                console.log(`Alert: ${message} (Type: ${type})`);
            };

            showAlert(
                'Service not found. Redirecting to services page...',
                'error'
            );
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
    };

    loadServiceDetails(serviceId);

    // Setup form handlers
    const setupBookingForm = () => {
        const form = document.getElementById('bookingForm');
        const getCurrentUser = () => {
            // Placeholder for getting current user logic
            return { full_name: 'John Doe', email: 'john.doe@example.com' };
        };

        const currentUser = getCurrentUser();

        // Pre-fill contact information if user is logged in
        if (currentUser) {
            document.getElementById('contactName').value =
                currentUser.full_name || currentUser.username || '';
            document.getElementById('contactEmail').value =
                currentUser.email || '';
        }

        form.addEventListener('submit', handleBookingSubmission);
    };

    setupBookingForm();
    setupDateValidation();
    setupPriceCalculation();
});

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
    document
        .getElementById('guests')
        .addEventListener('change', updatePriceSummary);
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
    const guests =
        Number.parseInt(document.getElementById('guests').value) || 1;

    // Update guest count display
    document.getElementById('guestCount').textContent = `${guests} guest${
        guests > 1 ? 's' : ''
    }`;

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

    document.getElementById(
        'basePrice'
    ).textContent = `PKR ${basePrice.toLocaleString()} ${priceLabel}`;

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
    if (
        ['Experience', 'Adventure', 'Cultural', 'Food & Dining'].includes(
            service.type
        ) &&
        guests > 1
    ) {
        totalPrice *= guests;
    }

    document.getElementById('duration').textContent = duration;
    document.getElementById(
        'totalPrice'
    ).textContent = `PKR ${totalPrice.toLocaleString()}`;
}

// Handle booking form submission
async function handleBookingSubmission(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBooking');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';

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
            sessionStorage.setItem(
                'bookingConfirmation',
                JSON.stringify(result.booking)
            );

            // Redirect to confirmation page
            window.location.href = 'booking-confirmation.html';
        } else {
            const showAlert = (message, type) => {
                // Placeholder for alert logic
                console.log(`Alert: ${message} (Type: ${type})`);
            };

            showAlert(
                result.message || 'Booking failed. Please try again.',
                'danger'
            );
        }
    } catch (error) {
        console.error('Booking error:', error);
        const showAlert = (message, type) => {
            // Placeholder for alert logic
            console.log(`Alert: ${message} (Type: ${type})`);
        };

        showAlert('An error occurred. Please try again.', 'danger');
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Find service by ID (from main script.js)
function findServiceById(serviceId) {
    const pakistanData = {
        Pakistan: {
            cities: [
                {
                    services: [
                        {
                            id: '1',
                            title: 'Service 1',
                            type: 'Experience',
                            rating: 4.5,
                            description: 'Description 1',
                            location: 'Location 1',
                            maxGuests: 2,
                            price_per_night: 1000,
                            picture: 'image1.jpg',
                        },
                        {
                            id: '2',
                            title: 'Service 2',
                            type: 'Adventure',
                            rating: 4.0,
                            description: 'Description 2',
                            location: 'Location 2',
                            maxGuests: 4,
                            price_per_day: 2000,
                            picture: 'image2.jpg',
                        },
                    ],
                },
            ],
        },
    };

    for (const city of pakistanData.Pakistan.cities) {
        const service = city.services.find(s => s.id === serviceId);
        if (service) return service;
    }
    return null;
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
        // Placeholder for generating stars logic
        return '★★★★★';
    };

    serviceDetailsContainer.innerHTML = `
        <div class="service-summary">
            <img src="${service.picture}" class="img-fluid rounded mb-3" alt="${
        service.title
    }">
            <h5 class="mb-2">${service.title}</h5>
            <div class="mb-2">
                <span class="badge service-badge badge-${service.type
                    .toLowerCase()
                    .replace(/\s+/g, '-')}">${service.type}</span>
                <div class="rating-stars mt-1">
                    ${generateStars(service.rating)}
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
            ${
                service.amenities
                    ? `
                <div class="amenities">
                    <h6 class="mb-2">Amenities:</h6>
                    ${service.amenities
                        .slice(0, 5)
                        .map(
                            amenity =>
                                `<span class="feature-item-small">${amenity}</span>`
                        )
                        .join('')}
                    ${
                        service.amenities.length > 5
                            ? `<span class="feature-item-small">+${
                                  service.amenities.length - 5
                              } more</span>`
                            : ''
                    }
                </div>
            `
                    : ''
            }
            
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
