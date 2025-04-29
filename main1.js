// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const searchForm = document.querySelector('.search-form');
    const destinationInput = document.querySelector('.search-input input');
    const checkInInput = document.querySelector('.date-picker .date-input:first-child input');
    const checkOutInput = document.querySelector('.date-picker .date-input:last-child input');
    const guestsSelect = document.querySelector('.guests select');
    const searchBtn = document.querySelector('.search-btn');
    
    // Results container (we'll create this element)
    let resultsContainer;
    
    // Initialize the application
    initApp();
    
    // Initialize application
    function initApp() {
        initializeDatePickers();
        setupEventListeners();
        createResultsContainer();
    }
    
    // Setup all event listeners
    function setupEventListeners() {
        searchForm.addEventListener('submit', handleSearch);
        
        // Enable real-time validation
        destinationInput.addEventListener('input', validateDestination);
        checkInInput.addEventListener('change', validateDates);
        checkOutInput.addEventListener('change', validateDates);
        
        // Add responsive behavior for mobile
        window.addEventListener('resize', handleResize);
        
        // Initialize responsive layout
        handleResize();
    }
    
    // Initialize date pickers
    function initializeDatePickers() {
        // Convert to date inputs
        checkInInput.type = 'date';
        checkOutInput.type = 'date';
        
        // Set minimum date as today
        const today = new Date().toISOString().split('T')[0];
        checkInInput.min = today;
        checkInInput.placeholder = 'Check-in date';
        
        // Handle date constraints
        checkInInput.addEventListener('change', function() {
            // Set checkout min date to be the checkin date
            checkOutInput.min = this.value;
            
            // If checkout date is before checkin date, reset it
            if (checkOutInput.value && checkOutInput.value < this.value) {
                checkOutInput.value = '';
            }
        });
        
        // Ensure placeholder still shows when using date inputs
        checkInInput.addEventListener('focus', () => {
            if (checkInInput.type === 'date') {
                checkInInput.showPicker();
            }
        });
        
        checkOutInput.addEventListener('focus', () => {
            if (checkOutInput.type === 'date') {
                checkOutInput.showPicker();
            }
        });
    }
    
    // Create results container
    function createResultsContainer() {
        // Check if results section already exists
        if (document.querySelector('.search-results')) {
            resultsContainer = document.querySelector('.search-results');
            return;
        }
        
        // Create new results section
        resultsContainer = document.createElement('section');
        resultsContainer.className = 'search-results';
        resultsContainer.innerHTML = `
            <h2 class="section-title">Search Results</h2>
            <div class="results-info"></div>
            <div class="results-grid"></div>
        `;
        
        // Initially hide results container
        resultsContainer.style.display = 'none';
        
        // Insert after hero section
        const heroSection = document.querySelector('.hero');
        heroSection.parentNode.insertBefore(resultsContainer, heroSection.nextSibling);
    }
    
    // Form submission handler
    function handleSearch(e) {
        e.preventDefault();
        
        // Validate inputs
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        searchBtn.disabled = true;
        
        // Get form data
        const searchData = {
            destination: destinationInput.value.trim(),
            checkIn: checkInInput.value,
            checkOut: checkOutInput.value,
            guests: guestsSelect.value
        };
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Generate mock results
            const results = generateMockResults(searchData);
            
            // Display results
            displayResults(searchData, results);
            
            // Reset button
            searchBtn.innerHTML = 'Search';
            searchBtn.disabled = false;
            
            // Scroll to results
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    }
    
    // Generate mock results for demonstration
    function generateMockResults(searchData) {
        // Mock data - in a real app, this would come from an API
        const mockProperties = [
            {
                name: "Luxury Suite Hotel",
                location: searchData.destination,
                image: "https://cf.bstatic.com/xdata/images/hotel/max500/74529578.jpg?k=a7fcefd47d7271daf44f6ce78a215b9505f9f8e5cac3af093b78b9c489fd8603&o=",
                price: Math.floor(Math.random() * 150) + 100,
                rating: 4.8,
                reviewCount: 124
            },
            {
                name: "Riverside Boutique Hotel",
                location: searchData.destination,
                image: "https://cf.bstatic.com/xdata/images/hotel/max500/40890546.jpg?k=95e71122215c2eef9fd8797c119e85a861ae45b64e9a8e561499a8545218ce90&o=",
                price: Math.floor(Math.random() * 100) + 80,
                rating: 4.5,
                reviewCount: 89
            },
            {
                name: "Central Park Inn",
                location: searchData.destination,
                image: "https://cf.bstatic.com/xdata/images/hotel/max500/103951224.jpg?k=03736dd4e1e89c1132e4957e735e33e7f6b0c9f694ce80cf51aa5307c4df1eda&o=",
                price: Math.floor(Math.random() * 120) + 90,
                rating: 4.3,
                reviewCount: 167
            },
            {
                name: "Ocean View Resort",
                location: searchData.destination,
                image: "https://cf.bstatic.com/xdata/images/hotel/max500/74594395.jpg?k=d5a71c0578774c302d2b8854482beaa8785077c616f5afd21c9db8a6eab6234e&o=",
                price: Math.floor(Math.random() * 200) + 150,
                rating: 4.9,
                reviewCount: 205
            },
            {
                name: "Mountain Retreat Lodge",
                location: searchData.destination,
                image: "https://cf.bstatic.com/xdata/images/hotel/max500/116873385.jpg?k=57c4d36dc0244ef47126147acbabe3e9e9a173acc2325929a4ab85ec93da0c62&o=",
                price: Math.floor(Math.random() * 180) + 130,
                rating: 4.6,
                reviewCount: 142
            },
            {
                name: "Downtown Apartments",
                location: searchData.destination,
                image: "https://cf.bstatic.com/xdata/images/hotel/max500/35675504.jpg?k=da1e4c14062d9092b07ccc9128ad89cbe3adfd98dcd4a6af302b5b572287c9d0&o=",
                price: Math.floor(Math.random() * 90) + 70,
                rating: 4.2,
                reviewCount: 78
            }
        ];
        
        return mockProperties;
    }
    
    // Display results on the page
    function displayResults(searchData, results) {
        // Show results container
        resultsContainer.style.display = 'block';
        
        // Update results info
        const resultsInfo = resultsContainer.querySelector('.results-info');
        
        // Calculate night count
        const checkInDate = new Date(searchData.checkIn);
        const checkOutDate = new Date(searchData.checkOut);
        const nightCount = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        resultsInfo.innerHTML = `
            <p><strong>${results.length} properties found</strong> in ${searchData.destination}</p>
            <p>${formatDate(searchData.checkIn)} - ${formatDate(searchData.checkOut)} · ${nightCount} night${nightCount !== 1 ? 's' : ''} · ${searchData.guests}</p>
        `;
        
        // Generate HTML for results
        const resultsGrid = resultsContainer.querySelector('.results-grid');
        resultsGrid.innerHTML = '';
        
        // Add each property to the results grid
        results.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            
            propertyCard.innerHTML = `
                <div class="property-image">
                    <img src="${property.image}" alt="${property.name}">
                </div>
                <div class="property-content">
                    <h3 class="property-name">${property.name}</h3>
                    <div class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</div>
                    <div class="property-rating">
                        <span class="rating-score">${property.rating.toFixed(1)}</span>
                        <span class="rating-text">${getRatingText(property.rating)}</span>
                        <span class="review-count">${property.reviewCount} reviews</span>
                    </div>
                    <div class="property-price">
                        <span class="price-amount">$${property.price}</span>
                        <span class="price-period">per night</span>
                    </div>
                    <button class="book-btn">View Deal</button>
                </div>
            `;
            
            resultsGrid.appendChild(propertyCard);
        });
    }
    
    // Validate the whole form
    function validateForm() {
        let isValid = true;
        
        // Check destination
        if (!validateDestination()) {
            isValid = false;
        }
        
        // Check dates
        if (!validateDates()) {
            isValid = false;
        }
        
        return isValid;
    }
    
    // Validate destination input
    function validateDestination() {
        const destination = destinationInput.value.trim();
        
        if (!destination) {
            showError(destinationInput, 'Please enter a destination');
            return false;
        }
        
        // Remove error if previously shown
        removeError(destinationInput);
        return true;
    }
    
    // Validate date inputs
    function validateDates() {
        let isValid = true;
        
        // Check if check-in date is selected
        if (!checkInInput.value) {
            showError(checkInInput, 'Please select a check-in date');
            isValid = false;
        } else {
            removeError(checkInInput);
        }
        
        // Check if check-out date is selected
        if (!checkOutInput.value) {
            showError(checkOutInput, 'Please select a check-out date');
            isValid = false;
        } else {
            removeError(checkOutInput);
        }
        
        // Check if check-out date is after check-in date
        if (checkInInput.value && checkOutInput.value) {
            const checkIn = new Date(checkInInput.value);
            const checkOut = new Date(checkOutInput.value);
            
            if (checkOut <= checkIn) {
                showError(checkOutInput, 'Check-out must be after check-in');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Show error message
    function showError(inputElement, message) {
        // Remove any existing error
        removeError(inputElement);
        
        // Find parent container (.search-input or .date-input)
        const parent = inputElement.closest('.search-input') || inputElement.closest('.date-input');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Add error styles
        parent.classList.add('has-error');
        
        // Add error message after input
        inputElement.parentNode.appendChild(errorElement);
    }
    
    // Remove error message
    function removeError(inputElement) {
        // Find parent container
        const parent = inputElement.closest('.search-input') || inputElement.closest('.date-input');
        
        // Remove error class
        if (parent) {
            parent.classList.remove('has-error');
            
            // Remove error message if exists
            const errorMessage = parent.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    }
    
    // Format date from YYYY-MM-DD to more readable format
    function formatDate(dateString) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    // Get text description based on rating
    function getRatingText(rating) {
        if (rating >= 4.8) return 'Exceptional';
        if (rating >= 4.5) return 'Excellent';
        if (rating >= 4.0) return 'Very Good';
        if (rating >= 3.5) return 'Good';
        return 'Average';
    }
    
    // Handle responsive layout
    function handleResize() {
        const isMobile = window.innerWidth < 768;
        
        // Adjust search form layout for mobile
        if (isMobile) {
            searchForm.classList.add('mobile');
            searchBtn.style.width = '100%';
        } else {
            searchForm.classList.remove('mobile');
            searchBtn.style.width = 'auto';
        }
    }
}); 