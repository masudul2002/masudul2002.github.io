// অ্যানিমেটেড বাবল ব্যাকগ্রাউন্ডের জন্য JavaScript
// index.html এ .bubbles div এর মধ্যে ডাইনামিকভাবে বাবল তৈরি করা হবে।

const bubblesContainer = document.querySelector('.bubbles');

function createBubble() {
    const bubble = document.createElement('div');
    const size = Math.random() * 60 + 20; // Size between 20px and 80px
    const left = Math.random() * 100; // Position left
    const duration = Math.random() * 15 + 10; // Duration between 10s and 25s
    const delay = Math.random() * 5; // Animation delay

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;

    bubblesContainer.appendChild(bubble);
}

// মোট 15টি বাবল তৈরি করা হলো
for (let i = 0; i < 15; i++) {
    createBubble();
}