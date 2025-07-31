// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollToTop();
    initTestimonialSlider();
    initMenuTabs();
    initOrderTabs();
    initQuantityControls();
    initCartFunctionality();
    initCheckoutModal();
    initFaqAccordion();
    initFormValidation();
});

// Navbar functionality
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Change header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Set active nav link based on current page
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== '/') {
            link.classList.add('active');
        } else if (currentLocation === '/' && linkPath === '/') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('index.html') && linkPath === '/') {
            link.classList.add('active');
        }
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    
    if (scrollBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('active');
            } else {
                scrollBtn.classList.remove('active');
            }
        });
        
        // Scroll to top when button is clicked
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Testimonial slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        // Function to show a specific slide
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }
        
        // Initialize first slide
        showSlide(0);
        
        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Auto slide change
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
}

// Menu tabs functionality
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (menuTabs.length > 0) {
        // Function to show a specific category
        function showCategory(categoryId) {
            menuCategories.forEach(category => category.classList.remove('active'));
            document.getElementById(categoryId).classList.add('active');
            
            menuTabs.forEach(tab => tab.classList.remove('active'));
            document.querySelector(`[data-target="${categoryId}"]`).classList.add('active');
        }
        
        // Add click event to tabs
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                showCategory(target);
            });
        });
        
        // Initialize first tab
        if (menuTabs[0]) {
            const firstTarget = menuTabs[0].getAttribute('data-target');
            showCategory(firstTarget);
        }
    }
}

// Order tabs functionality
function initOrderTabs() {
    const orderTabs = document.querySelectorAll('.order-tab');
    const orderCategories = document.querySelectorAll('.order-category');
    
    if (orderTabs.length > 0) {
        // Function to show a specific category
        function showCategory(categoryId) {
            orderCategories.forEach(category => category.classList.remove('active'));
            document.getElementById(categoryId).classList.add('active');
            
            orderTabs.forEach(tab => tab.classList.remove('active'));
            document.querySelector(`[data-target="${categoryId}"]`).classList.add('active');
        }
        
        // Add click event to tabs
        orderTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                showCategory(target);
            });
        });
        
        // Initialize first tab
        if (orderTabs[0]) {
            const firstTarget = orderTabs[0].getAttribute('data-target');
            showCategory(firstTarget);
        }
    }
}

// Quantity controls for order items
function initQuantityControls() {
    const quantityControls = document.querySelectorAll('.quantity-control');
    
    if (quantityControls.length > 0) {
        quantityControls.forEach(control => {
            const minusBtn = control.querySelector('.minus-btn');
            const plusBtn = control.querySelector('.plus-btn');
            const input = control.querySelector('.quantity-input');
            
            minusBtn.addEventListener('click', function() {
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                    updateItemTotal(control);
                }
            });
            
            plusBtn.addEventListener('click', function() {
                let value = parseInt(input.value);
                input.value = value + 1;
                updateItemTotal(control);
            });
            
            input.addEventListener('change', function() {
                let value = parseInt(input.value);
                if (value < 1 || isNaN(value)) {
                    input.value = 1;
                }
                updateItemTotal(control);
            });
        });
    }
}

// Update item total price based on quantity
function updateItemTotal(control) {
    const itemRow = control.closest('.order-item');
    if (itemRow) {
        const priceElement = itemRow.querySelector('.item-price');
        const quantityInput = control.querySelector('.quantity-input');
        const totalElement = itemRow.querySelector('.item-total');
        
        if (priceElement && quantityInput && totalElement) {
            const price = parseFloat(priceElement.getAttribute('data-price'));
            const quantity = parseInt(quantityInput.value);
            const total = price * quantity;
            
            totalElement.textContent = '₹' + total.toFixed(2);
        }
    }
}

// Cart functionality
function initCartFunctionality() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const emptyCart = document.querySelector('.empty-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Cart data
    let cart = [];
    
    // Add to cart
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemContainer = this.closest('.menu-item, .order-item');
                const itemId = itemContainer.getAttribute('data-id');
                const itemName = itemContainer.querySelector('h3, h4').textContent;
                const itemPrice = parseFloat(itemContainer.querySelector('.price, .item-price').getAttribute('data-price'));
                const itemImage = itemContainer.querySelector('img').getAttribute('src');
                
                // Check if item already in cart
                const existingItem = cart.find(item => item.id === itemId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: itemId,
                        name: itemName,
                        price: itemPrice,
                        image: itemImage,
                        quantity: 1
                    });
                }
                
                updateCart();
                showMiniCart();
            });
        });
    }
    
    // Update cart display
    function updateCart() {
        if (cartItems) {
            // Clear cart display
            cartItems.innerHTML = '';
            
            // Calculate total
            let total = 0;
            
            // Add items to cart display
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItemHTML = `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">
                                <span>₹${item.price.toFixed(2)}</span>
                                <span class="cart-item-quantity">x${item.quantity}</span>
                            </div>
                            <button class="remove-item" data-id="${item.id}">Remove</button>
                        </div>
                    </div>
                `;
                
                cartItems.innerHTML += cartItemHTML;
            });
            
            // Update total
            if (cartTotal) {
                cartTotal.textContent = '₹' + total.toFixed(2);
            }
            
            // Show/hide empty cart message and checkout button
            if (cart.length === 0) {
                if (emptyCart) emptyCart.classList.remove('hidden');
                if (checkoutBtn) checkoutBtn.disabled = true;
            } else {
                if (emptyCart) emptyCart.classList.add('hidden');
                if (checkoutBtn) checkoutBtn.disabled = false;
            }
            
            // Add remove item event listeners
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-id');
                    removeFromCart(itemId);
                });
            });
        }
    }
    
    // Remove item from cart
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCart();
    }
    
    // Show mini cart animation
    function showMiniCart() {
        const miniCart = document.querySelector('.cart-container');
        if (miniCart) {
            miniCart.classList.add('highlight');
            setTimeout(() => {
                miniCart.classList.remove('highlight');
            }, 300);
        }
    }
    
    // Apply coupon
    const couponForm = document.querySelector('.coupon-section');
    const discountElement = document.querySelector('.discount-value');
    
    if (couponForm) {
        couponForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const couponInput = this.querySelector('input');
            const couponCode = couponInput.value.trim();
            
            // Simulate coupon validation
            if (couponCode === 'SPICE20') {
                if (discountElement) {
                    // Calculate 20% discount
                    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
                    const discount = subtotal * 0.2;
                    discountElement.textContent = '-₹' + discount.toFixed(2);
                    document.querySelector('.discount').classList.remove('hidden');
                    
                    // Update total
                    if (cartTotal) {
                        const newTotal = subtotal - discount;
                        cartTotal.textContent = '₹' + newTotal.toFixed(2);
                    }
                }
                
                // Show success message
                alert('Coupon applied successfully!');
            } else {
                alert('Invalid coupon code.');
            }
        });
    }
    
    // Delivery option toggle
    const deliveryOptions = document.querySelectorAll('.toggle-option input');
    
    if (deliveryOptions.length > 0) {
        deliveryOptions.forEach(option => {
            option.addEventListener('change', function() {
                const deliveryFee = document.querySelector('.delivery-fee');
                const deliveryRow = document.querySelector('.delivery-row');
                
                if (this.value === 'delivery' && deliveryFee && deliveryRow) {
                    deliveryRow.classList.remove('hidden');
                    deliveryFee.textContent = '₹30.00';
                    
                    // Update total
                    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
                    const discount = document.querySelector('.discount').classList.contains('hidden') ? 0 : subtotal * 0.2;
                    const newTotal = subtotal - discount + 30;
                    
                    if (cartTotal) {
                        cartTotal.textContent = '₹' + newTotal.toFixed(2);
                    }
                } else if (this.value === 'pickup' && deliveryFee && deliveryRow) {
                    deliveryRow.classList.add('hidden');
                    
                    // Update total
                    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
                    const discount = document.querySelector('.discount').classList.contains('hidden') ? 0 : subtotal * 0.2;
                    const newTotal = subtotal - discount;
                    
                    if (cartTotal) {
                        cartTotal.textContent = '₹' + newTotal.toFixed(2);
                    }
                }
            });
        });
    }
    
    // Initialize cart
    updateCart();
}

// Checkout modal functionality
function initCheckoutModal() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    const modal = document.querySelector('.checkout-modal');
    const closeModal = document.querySelector('.close-modal');
    const checkoutForm = document.querySelector('.checkout-form');
    const formSections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const confirmationSection = document.querySelector('.confirmation-section');
    
    if (checkoutBtn && modal) {
        // Open modal
        checkoutBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                resetCheckoutForm();
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                resetCheckoutForm();
            }
        });
        
        // Multi-step form navigation
        if (nextButtons.length > 0) {
            nextButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const currentSection = this.closest('.form-section');
                    const nextSection = currentSection.nextElementSibling;
                    
                    // Validate current section
                    if (validateSection(currentSection)) {
                        currentSection.style.display = 'none';
                        nextSection.style.display = 'block';
                    }
                });
            });
        }
        
        if (prevButtons.length > 0) {
            prevButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const currentSection = this.closest('.form-section');
                    const prevSection = currentSection.previousElementSibling;
                    
                    currentSection.style.display = 'none';
                    prevSection.style.display = 'block';
                });
            });
        }
        
        // Form submission
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate final section
                const finalSection = document.querySelector('.form-section:last-of-type');
                if (validateSection(finalSection)) {
                    // Hide all sections
                    formSections.forEach(section => {
                        section.style.display = 'none';
                    });
                    
                    // Show confirmation
                    if (confirmationSection) {
                        confirmationSection.style.display = 'block';
                        
                        // Generate random order number
                        const orderNumber = Math.floor(Math.random() * 10000) + 1000;
                        document.querySelector('.order-number').textContent = orderNumber;
                        
                        // Set estimated delivery time (30-45 minutes from now)
                        const now = new Date();
                        const deliveryTime = new Date(now.getTime() + 45 * 60000);
                        const timeString = deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        document.querySelector('.delivery-time').textContent = timeString;
                    }
                }
            });
        }
    }
    
    // Validate form section
    function validateSection(section) {
        const inputs = section.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            const errorMessage = input.nextElementSibling;
            
            // Clear previous error
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.style.display = 'none';
            }
            
            // Check if empty
            if (!input.value.trim()) {
                isValid = false;
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                }
            }
            
            // Validate specific fields
            if (input.id === 'phone' && input.value.trim()) {
                const phonePattern = /^\d{10}$/;
                if (!phonePattern.test(input.value)) {
                    isValid = false;
                    if (errorMessage) {
                        errorMessage.style.display = 'block';
                    }
                }
            }
            
            if (input.id === 'email' && input.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    isValid = false;
                    if (errorMessage) {
                        errorMessage.style.display = 'block';
                    }
                }
            }
        });
        
        return isValid;
    }
    
    // Reset checkout form
    function resetCheckoutForm() {
        if (checkoutForm) {
            checkoutForm.reset();
            
            // Hide all sections except first
            formSections.forEach((section, index) => {
                if (index === 0) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            
            // Hide confirmation
            if (confirmationSection) {
                confirmationSection.style.display = 'none';
            }
            
            // Clear error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });
        }
    }
}

// FAQ accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
}

// Form validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name (only letters)
            const nameInput = document.getElementById('name');
            if (nameInput) {
                const namePattern = /^[A-Za-z\s]+$/;
                if (!namePattern.test(nameInput.value)) {
                    isValid = false;
                    showError(nameInput, 'Please enter a valid name (letters only)');
                } else {
                    hideError(nameInput);
                }
            }
            
            // Validate phone (exactly 10 digits)
            const phoneInput = document.getElementById('phone');
            if (phoneInput) {
                const phonePattern = /^\d{10}$/;
                if (!phonePattern.test(phoneInput.value)) {
                    isValid = false;
                    showError(phoneInput, 'Please enter a valid 10-digit phone number');
                } else {
                    hideError(phoneInput);
                }
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            if (emailInput) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    isValid = false;
                    showError(emailInput, 'Please enter a valid email address');
                } else {
                    hideError(emailInput);
                }
            }
            
            // If form is valid, show success message
            if (isValid) {
                // Show success modal or message
                const successModal = document.querySelector('.success-modal');
                if (successModal) {
                    successModal.style.display = 'block';
                    
                    // Close modal after 3 seconds
                    setTimeout(() => {
                        successModal.style.display = 'none';
                        contactForm.reset();
                    }, 3000);
                } else {
                    alert('Form submitted successfully!');
                    contactForm.reset();
                }
            }
        });
    }
    
    // Show error message
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Hide error message
    function hideError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.style.display = 'none';
        }
    }
    
    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailPattern.test(emailInput.value)) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Function to download menu PDF
function downloadMenu() {
    // In a real implementation, this would link to an actual PDF file
    alert('Menu PDF download started!');
}

// Function to open Google Maps
function openMap() {
    // In a real implementation, this would open Google Maps with the restaurant location
    window.open('https://maps.google.com/?q=SpiceLeaf+Restaurant', '_blank');
}