
let cart = [];
let total = 0;

// Scroll to Menu logic
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView();
}

// Horizontal Swipe Logic
function scrollMenu(amount) {
    const wrapper = document.getElementById('menuWrapper');
    wrapper.scrollLeft += amount;
}

// Cart Logic (Module 4: Variables & Arrays)
function addToCart(name, price) {
    cart.push({name, price});
    total += price;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items-list');
    
    if (cart.length > 0) {
        list.innerHTML = cart.map(item => 
            `<div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span>${item.name}</span> <span>₹${item.price}</span>
            </div>`
        ).join('');
    }
    document.getElementById('cart-total').innerText = "Total: ₹" + total;
}

function toggleCart(show) {
    document.getElementById('cart-modal').style.display = show ? 'flex' : 'none';
}

// Form Handling (Module 5: Control Values & Regex)
document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault();
    const phone = document.getElementById('phone').value;
    
    // Validation using Regex
    if(!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit number!");
        return;
    }

    if(cart.length === 0) {
        alert("Add some food first!");
        return;
    }

    alert("Order Placed! Total: ₹" + total);
    cart = [];
    total = 0;
    updateDisplay();
    toggleCart(false);
    this.reset();
};

// Canvas Interaction (Module 5: Event Listeners)
const canvas = document.getElementById('offerCanvas');
const ctx = canvas.getContext('2d');

function initCanvas() {
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#333";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("HOVER TO REVEAL CODE", canvas.width/2, 65);
}

canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Reveal bar
    ctx.fillStyle = "#ff4757";
    ctx.fillRect(0, 0, x, canvas.height);
    
    ctx.fillStyle = x > 300 ? "white" : "#333";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("CODE: QUICK50", canvas.width/2, 70);
});

initCanvas();
