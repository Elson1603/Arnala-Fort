
// ...existing code...

document.addEventListener('DOMContentLoaded', function() {
    // Chatbot functionality
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-send');

    // Chatbot message handling
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message');
        messageDiv.classList.add(isUser ? 'user' : 'bot');
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Initial bot message
    setTimeout(() => {
        addMessage('Hello! Welcome to Arnala Fort. How can I help you today?');
    }, 1000);

    // Send message handling
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatbotInput.value = '';
            // Simulate bot response
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response);
            }, 1000);
        }
    }

    // Bot responses
    function getBotResponse(message) {
        const responses = {
            'hello': 'Hi there! How can I assist you today?',
            'timings': 'Arnala Fort is open from 6:00 AM to 6:00 PM every day.',
            'tickets': 'Entry to the fort is free. However, boating charges may apply.',
            'location': 'Arnala Fort is located on an island off the coast of Arnala, Virar, Maharashtra.',
            'history': 'Arnala Fort was built in 1516 by the Portuguese and later captured by the Marathas in 1737.',
            'weather': 'The best time to visit is from November to February when the weather is pleasant.',
            'how to reach': 'You can reach Arnala Fort by taking a local train to Virar and then a short boat ride.',
            'activities': 'You can enjoy a guided tour, photography, and exploring the fort\'s ruins.',
            'food': 'There are local eateries nearby offering Maharashtrian cuisine.',

        };

        message = message.toLowerCase();
        for (let key in responses) {
            if (message.includes(key)) {
                return responses[key];
            }
        }
        return "I'm sorry, I don't have specific information about that. Please ask about timings, tickets, location,weather,how to reach,activites,food or history.";
    }

    // Event listeners
    chatbotButton.addEventListener('click', () => {
        chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    chatbotSend.addEventListener('click', sendMessage);

    // Hero section animation
    const heroBtn = document.querySelector('.hero-btn');
    heroBtn.addEventListener('click', () => {
        document.querySelector('#virtual-tour').scrollIntoView({ behavior: 'smooth' });
    });

    // Navigation smooth scroll
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
        });
    });

   

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Add animation classes
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(section);
    });

    // Add this CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Handle window resize for chatbot
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            chatbotWindow.style.width = '100%';
            chatbotWindow.style.right = '0';
            chatbotWindow.style.bottom = '0';
            chatbotWindow.style.height = '400px';
        } else {
            chatbotWindow.style.width = '350px';
            chatbotWindow.style.right = '30px';
            chatbotWindow.style.bottom = '80px';
            chatbotWindow.style.height = '500px';
        }
    });
});

const quizData = [
{
question: "When was Arnala Fort built?",
options: ["1516", "1600", "1737"],
correct: 0
},
{
question: "Who captured the fort in 1737?",
options: ["British Forces", "Maratha Forces", "Portuguese Forces"],
correct: 1
},
{
question: "Which sea is Arnala Fort located on?",
options: ["Bay of Bengal", "Arabian Sea", "Indian Ocean"],
correct: 1
},
{
question: "What was the fort's main purpose?",
options: ["Trading Post", "Coastal Defense", "Royal Palace"],
correct: 1
},
{
question: "Who built the fort initially?",
options: ["Portuguese", "Marathas", "British"],
correct: 0
}
];

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
const questionContainer = document.querySelector('.question-container');
const currentQuizData = quizData[currentQuiz];

questionContainer.innerHTML = `
<div class="question">${currentQuizData.question}</div>
<div class="options">
    ${currentQuizData.options.map((option, index) => `
        <div class="option" data-index="${index}">${option}</div>
    `).join('')}
</div>
`;

// Add click handlers to options
document.querySelectorAll('.option').forEach(option => {
option.addEventListener('click', selectOption);
});

// Update navigation buttons
document.getElementById('prev-btn').disabled = currentQuiz === 0;
document.getElementById('next-btn').textContent = 
currentQuiz === quizData.length - 1 ? 'Finish' : 'Next';
}

function selectOption(e) {
document.querySelectorAll('.option').forEach(opt => {
opt.classList.remove('selected');
});
e.target.classList.add('selected');
}

// Treasure Hunt functionality
const treasureHuntData = [
{
clue: "I stand tall at the entrance, guarding secrets of old...",
answer: "gate",
hint: "It's where you enter the fort"
},
{
clue: "Water surrounds me, yet I stand firm. Ships fear my mighty...",
answer: "cannon",
hint: "A weapon used to defend the fort"
},
{
clue: "From here, guards would watch the seas. High above, this tower sees...",
answer: "watchtower",
hint: "A tall structure used for observation"
},
{
clue: "Sacred ground within these walls, where soldiers prayed before battles call...",
answer: "temple",
hint: "A place of worship"
}
];

let currentClue = 0;
let huntProgress = 0;

function initializeQuizAndHunt() {
// Quiz initialization
loadQuiz();

const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

nextBtn.addEventListener('click', () => {
const selected = document.querySelector('.option.selected');
if (!selected && nextBtn.textContent !== 'Finish') return;

if (selected) {
    if (parseInt(selected.dataset.index) === quizData[currentQuiz].correct) {
        score++;
    }
}

currentQuiz++;

if (currentQuiz < quizData.length) {
    loadQuiz();
} else {
    showResults();
}
});

prevBtn.addEventListener('click', () => {
currentQuiz--;
loadQuiz();
});

// Treasure Hunt initialization
const huntForm = document.querySelector('.answer-form');
const huntInput = document.querySelector('.answer-input');
const huntFeedback = document.querySelector('.hunt-feedback');
const progressBar = document.querySelector('.progress-bar');

huntForm.addEventListener('submit', (e) => {
e.preventDefault();
const answer = huntInput.value.trim().toLowerCase();

if (answer === treasureHuntData[currentClue].answer) {
    currentClue++;
    huntProgress = (currentClue / treasureHuntData.length) * 100;
    progressBar.style.width = `${huntProgress}%`;

    if (currentClue < treasureHuntData.length) {
        document.querySelector('.clue').textContent = treasureHuntData[currentClue].clue;
        huntFeedback.textContent = "Correct! Here's your next clue.";
        huntFeedback.style.color = "green";
    } else {
        showTreasureFound();
    }
} else {
    huntFeedback.textContent = `Try again! Hint: ${treasureHuntData[currentClue].hint}`;
    huntFeedback.style.color = "red";
}

huntInput.value = '';
});
}

function showResults() {
const quizContainer = document.querySelector('.quiz-container');
const percentage = (score / quizData.length) * 100;

quizContainer.innerHTML = `
<div class="results-container" style="display: block;">
    <div class="score-display">Your Score: ${score}/${quizData.length}</div>
    <div class="result-message">
        ${percentage >= 80 ? 'Excellent! You\'re a fort expert!' :
          percentage >= 60 ? 'Good job! You know quite a bit!' :
          'Keep learning! Try again to improve your score.'}
    </div>
   
</div>
`;
}

let currentQuestion = 0;
function resetQuiz() {
    score = 0;
    currentQuestion = 0;
    showQuestion(); // This should render the first question again
}

// Example showQuestion function (simplified)
function showQuestion() {
    const quizContainer = document.querySelector('.quiz-container');
    const question = quizData[currentQuestion];

    quizContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <div class="answers">
            ${question.answers.map((answer, index) =>
                `<button class="answer-btn" onclick="selectAnswer(${index})">${answer}</button>`
            ).join('')}
        </div>
    `;
}

// Example selectAnswer function (simplified)
function selectAnswer(selectedIndex) {
    if (quizData[currentQuestion].correct === selectedIndex) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}


function showTreasureFound() {
const huntContainer = document.querySelector('.hunt-container');
huntContainer.innerHTML = `
<div class="hunt-complete" style="display: block;">
    <h3>Congratulations!</h3>
    <img src="./images/treasure.jpg" alt="Treasure" class="treasure-image">
    <p>You've discovered all the fort's secrets!</p>
    
</div>
`;
}

function resetQuiz() {
currentQuiz = 0;
score = 0;
loadQuiz();
}

function resetHunt() {
currentClue = 0;
huntProgress = 0;
document.querySelector('.progress-bar').style.width = '0%';
document.querySelector('.clue').textContent = treasureHuntData[0].clue;
document.querySelector('.hunt-feedback').textContent = '';
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
initializeQuizAndHunt();
// ... existing DOMContentLoaded code ...
});





const container = document.querySelector('.panorama-container');
const panorama = document.querySelector('.panorama');

let scale = 1;
let originX = 0;
let originY = 0;
let isDragging = false;
let startX, startY;

function updateTransform() {
    panorama.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
}

container.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    scale += e.deltaY > 0 ? -zoomFactor : zoomFactor;
    scale = Math.min(Math.max(0.5, scale), 5); // clamp zoom
    updateTransform();
});

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - originX;
    startY = e.clientY - originY;
    container.style.cursor = 'grabbing';
});

container.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'grab';
});

container.addEventListener('mouseleave', () => {
    isDragging = false;
    container.style.cursor = 'grab';
});

container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    originX = e.clientX - startX;
    originY = e.clientY - startY;
    updateTransform();
});

updateTransform();




