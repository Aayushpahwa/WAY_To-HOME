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
    
    // Destination data organized by vibes
    const destinationsByVibe = {
        party: [
            {
                name: "Goa, India",
                image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3",
                description: "Beach parties and vibrant nightlife",
                tags: ["Beaches", "Clubs", "Nightlife"]
            },
            {
                name: "Bangkok, Thailand",
                image: "https://images.unsplash.com/photo-1583405794327-4c8c9b8a2e89",
                description: "Energetic city with amazing nightlife",
                tags: ["Street Food", "Markets", "Nightlife"]
            },
            {
                name: "Ibiza, Spain",
                image: "https://images.unsplash.com/photo-1531846802986-4942a5c3dd08",
                description: "World-famous party destination",
                tags: ["Beach Clubs", "DJs", "Parties"]
            }
        ],
        relax: [
            {
                name: "Kerala, India",
                image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
                description: "Serene backwaters and ayurvedic retreats",
                tags: ["Backwaters", "Spa", "Nature"]
            },
            {
                name: "Maldives",
                image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
                description: "Pristine beaches and luxury resorts",
                tags: ["Beach", "Luxury", "Peace"]
            },
            {
                name: "Bali, Indonesia",
                image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
                description: "Tropical paradise with spiritual retreats",
                tags: ["Temples", "Yoga", "Nature"]
            }
        ],
        romantic: [
            {
                name: "Udaipur, India",
                image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66",
                description: "City of lakes and palaces",
                tags: ["Lakes", "Palaces", "Culture"]
            },
            {
                name: "Paris, France",
                image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
                description: "The city of love",
                tags: ["Architecture", "Food", "Art"]
            },
            {
                name: "Venice, Italy",
                image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0",
                description: "Romantic canals and history",
                tags: ["Canals", "History", "Romance"]
            }
        ],
        adventure: [
            {
                name: "Rishikesh, India",
                image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b",
                description: "Adventure sports capital of India",
                tags: ["Rafting", "Yoga", "Mountains"]
            },
            {
                name: "New Zealand",
                image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
                description: "Ultimate adventure destination",
                tags: ["Bungee", "Hiking", "Nature"]
            },
            {
                name: "Costa Rica",
                image: "https://images.unsplash.com/photo-1590098563176-d6c9e96fb00f",
                description: "Tropical adventures",
                tags: ["Jungle", "Wildlife", "Surfing"]
            }
        ],
        cultural: [
            {
                name: "Varanasi, India",
                image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc",
                description: "Spiritual capital of India",
                tags: ["Temples", "Ghats", "History"]
            },
            {
                name: "Kyoto, Japan",
                image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
                description: "Traditional Japanese culture",
                tags: ["Temples", "Gardens", "Tea"]
            },
            {
                name: "Rome, Italy",
                image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
                description: "Ancient history and art",
                tags: ["History", "Art", "Food"]
            }
        ]
    };
    
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
        const vibeType = e.target.dataset.vibe;
        if (!vibeType) return;

        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Show destinations for the selected vibe
        showDestinations(vibeType);
    }

    // Function to display destinations for selected vibe
    function showDestinations(vibe) {
        const container = document.querySelector('.vibe-destinations');
        if (!container) return;
        
        const destinations = destinationsByVibe[vibe.toLowerCase()];
        if (!destinations) return;
        
        // Clear previous destinations
        container.innerHTML = '';
        
        // Create and append destination cards
        destinations.forEach(dest => {
            const card = document.createElement('div');
            card.className = 'vibe-destination-card';
            card.innerHTML = `
                <img src="${dest.image}" alt="${dest.name}">
                <div class="vibe-destination-info">
                    <h3 class="vibe-destination-name">${dest.name}</h3>
                    <p class="vibe-destination-desc">${dest.description}</p>
                    <div class="vibe-destination-tags">
                        ${dest.tags.map(tag => `<span class="vibe-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Add styles if not already present
        const style = document.createElement('style');
        style.textContent = `
            .vibe-destinations {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                padding: 2rem;
                margin-top: 2rem;
            }
            .vibe-destination-card {
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                transition: transform 0.3s ease;
            }
            .vibe-destination-card:hover {
                transform: translateY(-5px);
            }
            .vibe-destination-card img {
                width: 100%;
                height: 200px;
                object-fit: cover;
            }
            .vibe-destination-info {
                padding: 1.5rem;
            }
            .vibe-destination-name {
                font-size: 1.25rem;
                margin-bottom: 0.5rem;
            }
            .vibe-destination-desc {
                color: #666;
                margin-bottom: 1rem;
            }
            .vibe-destination-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            .vibe-tag {
                background: #f0f0f0;
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.875rem;
                color: #444;
            }
        `;
        if (!document.querySelector('style')) {
            document.head.appendChild(style);
        }
    }

    // Function to scroll destinations horizontally
    function scrollDestinations(direction) {
        const container = document.querySelector('.vibe-destinations');
        const scrollAmount = 300; // Width of one card
        container.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    // Initialize vibe filters
    document.addEventListener('DOMContentLoaded', () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        // Show party destinations by default
        showDestinations('party');
        
        // Add click event listeners to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', handleVibeFilter);
        });
    });
    
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