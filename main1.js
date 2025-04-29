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
    
    // Local Pulse elements
    const pulseWidgets = document.querySelectorAll('.pulse-widget');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Initialize the application
    initApp();
    
    // Initialize application
    function initApp() {
        initializeDatePickers();
        setupEventListeners();
        createResultsContainer();
        initializeLocalPulse();
    }
    
    // Setup all event listeners
    function setupEventListeners() {
        searchForm.addEventListener('submit', handleSearch);
        
        // Enable real-time validation
        destinationInput.addEventListener('input', validateDestination);
        checkInInput.addEventListener('change', validateDates);
        checkOutInput.addEventListener('change', validateDates);
        
        // Setup Local Pulse filter buttons
        if (filterButtons) {
            filterButtons.forEach(button => {
                button.addEventListener('click', handleVibeFilter);
            });
        }
        
        // Add responsive behavior for mobile
        window.addEventListener('resize', handleResize);
        
        // Initialize responsive layout
        handleResize();
    }
    
    // Initialize Local Pulse feature
    function initializeLocalPulse() {
        // Load initial data
        fetchLocalPulseData();
        
        // Refresh data every 5 minutes (300000ms)
        setInterval(fetchLocalPulseData, 300000);
    }
    
    // Fetch Local Pulse data from APIs
    function fetchLocalPulseData() {
        // In a real implementation, we would make API calls here
        // For this demo, we'll simulate the API response with mock data
        
        // Simulate API delay with setTimeout
        setTimeout(() => {
            updateWeatherWidget(mockWeatherData);
            updateEventsWidget(mockEventsData);
            updateVibeWidget(mockVibeData);
            updateCrowdWidget(mockCrowdData);
            updateNewsWidget(mockNewsData);
            updateTrendingWidget(mockTrendingData);
            updateTipWidget(mockTipData);
        }, 500);
    }
    
    // Mock data for Local Pulse widgets
    const mockWeatherData = {
        temp: 28,
        condition: 'Sunny with light clouds',
        icon: 'sun',
        impact: 'Perfect day for walking tours and outdoor cafés!'
    };
    
    const mockEventsData = [
        {
            date: 'Today, 8PM',
            name: 'Jazz Festival in Central Park',
            isPopular: true
        },
        {
            date: 'Tomorrow, 2PM',
            name: 'Local Food Market Tour',
            isPopular: false
        },
        {
            date: 'Friday, 7PM',
            name: 'Night Museum Tour',
            isPopular: true
        }
    ];
    
    const mockVibeData = {
        score: 85,
        status: 'positive', // can be positive, neutral, or negative
        summary: 'Locals are excited about the Jazz Festival and perfect summer weather!'
    };
    
    const mockCrowdData = [
        { area: 'Downtown', level: 'high' },
        { area: 'Beach Front', level: 'medium' },
        { area: 'Museum District', level: 'low' }
    ];
    
    const mockNewsData = [
        {
            type: 'alert',
            category: 'Transport',
            headline: 'Subway Line 2 closed for maintenance until 5PM'
        },
        {
            type: 'info',
            category: 'Event',
            headline: 'City Hall square closed for weekend festival preparation'
        }
    ];
    
    const mockTrendingData = {
        music: [
            'Summer Vibes - Local Artist',
            'City Nights - DJ Pulse',
            'Morning Cafe - Jazz Ensemble'
        ],
        videos: [
            '10 Hidden Gems in Downtown',
            'Street Food Tour 2023'
        ]
    };
    
    const mockTipData = {
        tip: 'With the Jazz Festival happening, local cafés around Central Park are offering special "Jazz Menus" with discounts if you have a festival ticket. Try the Blueberry Jazz Smoothie at Cafe Melody!',
        author: 'Maria, Local Guide'
    };
    
    // Update weather widget with data
    function updateWeatherWidget(data) {
        const weatherContent = document.getElementById('weather-content');
        if (!weatherContent) return;
        
        weatherContent.innerHTML = `
            <div class="weather-display">
                <div class="weather-icon"><i class="fas fa-${data.icon}"></i></div>
                <div class="weather-temp">${data.temp}°C</div>
            </div>
            <div class="weather-forecast">${data.condition}</div>
            <div class="weather-impact">${data.impact}</div>
        `;
    }
    
    // Update events widget with data
    function updateEventsWidget(data) {
        const eventsContent = document.getElementById('events-content');
        if (!eventsContent) return;
        
        let eventsHTML = '';
        data.forEach(event => {
            eventsHTML += `
                <div class="event-item">
                    <div class="event-date">${event.date}</div>
                    <div class="event-name">${event.name}</div>
                    <div class="event-tag ${event.isPopular ? 'popular' : 'niche'}">${event.isPopular ? 'Popular' : 'Niche'}</div>
                </div>
            `;
        });
        
        eventsContent.innerHTML = eventsHTML;
    }
    
    // Update vibe widget with data
    function updateVibeWidget(data) {
        const vibeContent = document.getElementById('vibe-content');
        if (!vibeContent) return;
        
        // Determine emoji based on status
        let emoji = '🟢';
        if (data.status === 'neutral') emoji = '🟡';
        if (data.status === 'negative') emoji = '🔴';
        
        // Determine status text
        let statusText = 'Positive';
        if (data.status === 'neutral') statusText = 'Neutral';
        if (data.status === 'negative') statusText = 'Negative';
        
        vibeContent.innerHTML = `
            <div class="vibe-score">
                <div class="vibe-indicator ${data.status}">${emoji} ${statusText}</div>
                <div class="vibe-meter">
                    <div class="meter-fill" style="width: ${data.score}%;"></div>
                </div>
            </div>
            <div class="vibe-summary">"${data.summary}"</div>
        `;
    }
    
    // Update crowd widget with data
    function updateCrowdWidget(data) {
        const crowdContent = document.getElementById('crowd-content');
        if (!crowdContent) return;
        
        let crowdHTML = '<div class="crowd-areas">';
        
        data.forEach(crowd => {
            // Create the density indicators based on level
            let densityHTML = '';
            
            if (crowd.level === 'high') {
                densityHTML = '<i class="fas fa-circle"></i><i class="fas fa-circle"></i><i class="fas fa-circle"></i>';
            } else if (crowd.level === 'medium') {
                densityHTML = '<i class="fas fa-circle"></i><i class="fas fa-circle"></i><i class="far fa-circle"></i>';
            } else {
                densityHTML = '<i class="fas fa-circle"></i><i class="far fa-circle"></i><i class="far fa-circle"></i>';
            }
            
            crowdHTML += `
                <div class="crowd-area">
                    <div class="area-name">${crowd.area}</div>
                    <div class="area-density ${crowd.level}">
                        ${densityHTML}
                    </div>
                </div>
            `;
        });
        
        crowdHTML += '</div>';
        crowdContent.innerHTML = crowdHTML;
    }
    
    // Update news widget with data
    function updateNewsWidget(data) {
        const newsContent = document.getElementById('news-content');
        if (!newsContent) return;
        
        let newsHTML = '';
        
        data.forEach(item => {
            newsHTML += `
                <div class="news-item">
                    <div class="news-tag ${item.type}">${item.category}</div>
                    <div class="news-headline">${item.headline}</div>
                </div>
            `;
        });
        
        newsContent.innerHTML = newsHTML;
    }
    
    // Update trending widget with data
    function updateTrendingWidget(data) {
        const trendingContent = document.getElementById('trending-content');
        if (!trendingContent) return;
        
        let musicHTML = '';
        data.music.forEach(track => {
            musicHTML += `<li>${track}</li>`;
        });
        
        let videosHTML = '';
        data.videos.forEach(video => {
            videosHTML += `<li>${video}</li>`;
        });
        
        trendingContent.innerHTML = `
            <div class="trending-section">
                <h4><i class="fab fa-spotify"></i> Top Music</h4>
                <ol class="trending-list">
                    ${musicHTML}
                </ol>
            </div>
            <div class="trending-section">
                <h4><i class="fab fa-youtube"></i> Popular Videos</h4>
                <ol class="trending-list">
                    ${videosHTML}
                </ol>
            </div>
        `;
    }
    
    // Update tip widget with data
    function updateTipWidget(data) {
        const tipContent = document.getElementById('tip-content');
        if (!tipContent) return;
        
        tipContent.innerHTML = `
            <div class="tip-content">
                <i class="fas fa-quote-left"></i>
                <p>${data.tip}</p>
                <i class="fas fa-quote-right"></i>
            </div>
            <div class="tip-author">- ${data.author}</div>
        `;
    }
    
    // Handle vibe filter button clicks
    function handleVibeFilter(e) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Get vibe type from button text
        const vibeType = e.target.textContent.trim();
        
        // In a real implementation, this would filter destinations by vibe
        console.log(`Filtering destinations by vibe: ${vibeType}`);
        
        // Show a temporary message to indicate filtering
        const pulseDashboard = document.querySelector('.pulse-dashboard');
        const message = document.createElement('div');
        message.className = 'filter-message';
        message.textContent = `Showing ${vibeType} destinations...`;
        message.style.gridColumn = '1 / -1';
        message.style.textAlign = 'center';
        message.style.padding = '1rem';
        message.style.backgroundColor = 'rgba(var(--primary-rgb), 0.1)';
        message.style.borderRadius = '10px';
        message.style.marginTop = '1rem';
        
        // Check if a message already exists and remove it
        const existingMessage = document.querySelector('.filter-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add the message after filters
        pulseDashboard.appendChild(message);
        
        // Remove the message after 3 seconds
        setTimeout(() => {
            message.remove();
        }, 3000);
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
            
            // Update Local Pulse data based on destination
            updateLocalPulseForDestination(searchData.destination);
        }, 1500);
    }
    
    // Update Local Pulse data for the searched destination
    function updateLocalPulseForDestination(destination) {
        // In a real implementation, we would make API calls with the destination parameter
        // For the demo, we'll update the widget headers with the destination name
        
        const widgets = document.querySelectorAll('.widget-header h3');
        widgets.forEach(widget => {
            const originalText = widget.textContent.split(' in ')[0];
            widget.textContent = `${originalText} in ${destination}`;
        });
        
        // Update page title to show we're viewing this destination
        document.querySelector('.pulse-subtitle').textContent = 
            `Real-time insights for ${destination}`;
            
        // Show a notification
        showNotification(`Local Pulse updated for ${destination}`);
    }
    
    // Show a temporary notification message
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'pulse-notification';
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '4px',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
        });
        
        // Add to document
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
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