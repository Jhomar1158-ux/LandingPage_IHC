// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    initializeSidebar();
    initializeModals();
    initializeVoiceAnalysis();
    initializeCharts();
    initializeNotifications();
    initializePsychologists();
    initializeProfile();
    initializeLogout();
});

// Initialize dashboard
function initializeDashboard() {
    // Get user data from localStorage (simulated)
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'Usuario',
        email: 'usuario@ejemplo.com'
    };
    
    // Update user display
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileEmail').textContent = userData.email;
    
    // Show motivational notifications
    showMotivationalNotification();
}

// Sidebar navigation
function initializeSidebar() {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            
            // Update active menu item
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            
            // Update active content section
            contentSections.forEach(cs => cs.classList.remove('active'));
            document.getElementById(section).classList.add('active');
        });
    });
}

// Modal functionality
function initializeModals() {
    // SOS Modal
    const sosBtn = document.getElementById('sosBtn');
    const sosModal = document.getElementById('sosModal');
    const sosClose = document.getElementById('sosClose');
    
    sosBtn.addEventListener('click', () => {
        sosModal.style.display = 'block';
    });
    
    sosClose.addEventListener('click', () => {
        sosModal.style.display = 'none';
    });
    
    // Notifications Modal
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationsModal = document.getElementById('notificationsModal');
    const notificationsClose = document.getElementById('notificationsClose');
    
    notificationBtn.addEventListener('click', () => {
        notificationsModal.style.display = 'block';
        // Mark notifications as read
        document.querySelector('.notification-count').textContent = '0';
    });
    
    notificationsClose.addEventListener('click', () => {
        notificationsModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === sosModal) {
            sosModal.style.display = 'none';
        }
        if (e.target === notificationsModal) {
            notificationsModal.style.display = 'none';
        }
    });
    
    // Emergency buttons
    const emergencyBtns = document.querySelectorAll('.btn-emergency');
    emergencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('En una situación real, esto abriría la aplicación de llamadas con el número correspondiente.');
        });
    });
}

// Voice Analysis functionality
function initializeVoiceAnalysis() {
    const startRecordingBtn = document.getElementById('startRecording');
    const recordingCircle = document.getElementById('recordingCircle');
    const recordingStatus = document.getElementById('recordingStatus');
    const analysisResults = document.getElementById('analysisResults');
    
    let isRecording = false;
    let recordingTimer;
    let recordingDuration = 0;
    
    startRecordingBtn.addEventListener('click', () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    });
    
    function startRecording() {
        isRecording = true;
        recordingDuration = 0;
        
        // Update UI
        startRecordingBtn.textContent = 'Detener Análisis';
        recordingCircle.classList.add('recording');
        updateRecordingStatus();
        
        // Simulate recording
        recordingTimer = setInterval(() => {
            recordingDuration++;
            updateRecordingStatus();
            
            // Auto-stop after 30 seconds
            if (recordingDuration >= 30) {
                stopRecording();
            }
        }, 1000);
    }
    
    function stopRecording() {
        isRecording = false;
        clearInterval(recordingTimer);
        
        // Update UI
        startRecordingBtn.textContent = 'Iniciar Análisis';
        recordingCircle.classList.remove('recording');
        recordingStatus.querySelector('.status-text').textContent = 'Procesando análisis...';
        
        // Simulate analysis processing
        setTimeout(() => {
            showAnalysisResults();
        }, 2000);
    }
    
    function updateRecordingStatus() {
        const statusText = recordingStatus.querySelector('.status-text');
        if (isRecording) {
            statusText.textContent = `Grabando... ${recordingDuration}s / 30s`;
        } else {
            statusText.textContent = 'Listo para grabar';
        }
    }
    
    function showAnalysisResults() {
        // Simulate analysis results
        const results = generateAnalysisResults();
        
        document.getElementById('emotionalState').textContent = results.emotionalState;
        document.getElementById('stressLevel').textContent = results.stressLevel;
        document.getElementById('confidence').textContent = results.confidence;
        document.getElementById('recommendation').textContent = results.recommendation;
        
        analysisResults.style.display = 'block';
        recordingStatus.querySelector('.status-text').textContent = 'Análisis completado';
        
        // Update dashboard emotional state
        updateDashboardEmotionalState(results.emotionalState);
        
        // Add to history
        addToEmotionalHistory(results);
    }
    
    function generateAnalysisResults() {
        const emotions = ['Estable', 'Feliz', 'Ansioso', 'Triste', 'Estresado'];
        const stressLevels = ['Bajo', 'Moderado', 'Alto'];
        const recommendations = [
            'Mantén tus hábitos actuales',
            'Considera técnicas de relajación',
            'Practica ejercicios de respiración',
            'Busca apoyo profesional',
            'Dedica tiempo al autocuidado'
        ];
        
        return {
            emotionalState: emotions[Math.floor(Math.random() * emotions.length)],
            stressLevel: stressLevels[Math.floor(Math.random() * stressLevels.length)],
            confidence: Math.floor(Math.random() * 20 + 80) + '%',
            recommendation: recommendations[Math.floor(Math.random() * recommendations.length)]
        };
    }
}

// Chart functionality (simulated)
function initializeCharts() {
    const progressChart = document.getElementById('progressChart');
    const emotionalChart = document.getElementById('emotionalChart');
    
    // Simulate chart rendering
    if (progressChart) {
        progressChart.style.background = 'linear-gradient(45deg, #6C63FF, #4CAF50)';
        progressChart.style.borderRadius = '8px';
        progressChart.style.display = 'flex';
        progressChart.style.alignItems = 'center';
        progressChart.style.justifyContent = 'center';
        progressChart.style.color = 'white';
        progressChart.style.fontWeight = 'bold';
        progressChart.textContent = 'Gráfico de Progreso Semanal';
    }
    
    if (emotionalChart) {
        emotionalChart.style.background = 'linear-gradient(45deg, #FF5252, #FFC107, #4CAF50)';
        emotionalChart.style.borderRadius = '8px';
        emotionalChart.style.display = 'flex';
        emotionalChart.style.alignItems = 'center';
        emotionalChart.style.justifyContent = 'center';
        emotionalChart.style.color = 'white';
        emotionalChart.style.fontWeight = 'bold';
        emotionalChart.textContent = 'Gráfico de Historial Emocional';
    }
    
    // History filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(fb => fb.classList.remove('active'));
            btn.classList.add('active');
            
            // Simulate chart update
            const period = btn.dataset.period;
            updateEmotionalChart(period);
        });
    });
}

// Notifications functionality
function initializeNotifications() {
    // Simulate periodic motivational notifications
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every check
            showMotivationalNotification();
        }
    }, 60000); // Check every minute
}

function showMotivationalNotification() {
    const messages = [
        'Recuerda: cada día es una nueva oportunidad para cuidar tu bienestar.',
        'Has hecho un gran trabajo monitoreando tu salud emocional.',
        'Tómate un momento para respirar profundamente.',
        'Tu bienestar mental es tan importante como tu salud física.',
        'Celebra los pequeños logros del día de hoy.'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'toast-notification';
    notification.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-heart"></i>
            <span>${randomMessage}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: linear-gradient(135deg, #6C63FF, #4CAF50);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1001;
        animation: slideInRight 0.5s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Psychologists functionality
function initializePsychologists() {
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');
    const appointmentBtns = document.querySelectorAll('.psychologist-card .btn-primary');
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterPsychologists(searchTerm, filterSelect.value);
    });
    
    // Filter functionality
    filterSelect.addEventListener('change', (e) => {
        const filterValue = e.target.value;
        filterPsychologists(searchInput.value.toLowerCase(), filterValue);
    });
    
    // Appointment booking
    appointmentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const psychologistName = btn.closest('.psychologist-card').querySelector('h3').textContent;
            bookAppointment(psychologistName);
        });
    });
}

function filterPsychologists(searchTerm, specialtyFilter) {
    const psychologistCards = document.querySelectorAll('.psychologist-card');
    
    psychologistCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const specialty = card.querySelector('.specialty').textContent.toLowerCase();
        
        const matchesSearch = name.includes(searchTerm) || specialty.includes(searchTerm);
        const matchesFilter = !specialtyFilter || specialty.includes(specialtyFilter);
        
        if (matchesSearch && matchesFilter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function bookAppointment(psychologistName) {
    // Simulate appointment booking
    const appointmentModal = document.createElement('div');
    appointmentModal.className = 'modal';
    appointmentModal.style.display = 'block';
    
    appointmentModal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Agendar Cita</h2>
            <p>Solicitando cita con <strong>${psychologistName}</strong></p>
            <div style="margin: 2rem 0;">
                <label>Fecha preferida:</label>
                <input type="date" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <label>Horario preferido:</label>
                <select style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                </select>
                <textarea placeholder="Motivo de la consulta (opcional)" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px; resize: vertical; height: 80px;"></textarea>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button class="btn-secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
                <button class="btn-primary" onclick="confirmAppointment('${psychologistName}')">Confirmar Cita</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(appointmentModal);
    
    // Close functionality
    appointmentModal.querySelector('.close').onclick = () => {
        appointmentModal.remove();
    };
    
    appointmentModal.onclick = (e) => {
        if (e.target === appointmentModal) {
            appointmentModal.remove();
        }
    };
}

function confirmAppointment(psychologistName) {
    // Simulate appointment confirmation
    alert(`¡Cita agendada exitosamente con ${psychologistName}! Recibirás una confirmación por email.`);
    document.querySelector('.modal').remove();
    
    // Update dashboard appointment info
    const appointmentCard = document.querySelector('.dashboard-card .appointment');
    if (appointmentCard) {
        appointmentCard.innerHTML = `
            <p><strong>${psychologistName}</strong></p>
            <p>Próximamente - Pendiente de confirmación</p>
            <button class="btn-small">Ver detalles</button>
        `;
    }
}

// Profile functionality
function initializeProfile() {
    const profileLogoutBtn = document.querySelector('.profile-actions .btn-secondary');
    const saveBtn = document.querySelector('.profile-actions .btn-primary');
    
    if (profileLogoutBtn) {
        profileLogoutBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                localStorage.removeItem('userData');
                window.location.href = 'index.html';
            }
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert('Configuración guardada exitosamente.');
        });
    }
}

// Header logout functionality
function initializeLogout() {
    const headerLogoutBtn = document.getElementById('logoutBtn');
    
    if (headerLogoutBtn) {
        headerLogoutBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                // Clear user data
                localStorage.removeItem('userData');
                // Show goodbye message
                alert('¡Hasta luego! Tu sesión ha sido cerrada exitosamente.');
                // Redirect to landing page
                window.location.href = 'index.html';
            }
        });
    }
}

// Utility functions
function updateDashboardEmotionalState(emotionalState) {
    const emotionCircle = document.querySelector('.emotion-circle');
    const emotionText = emotionCircle.querySelector('span');
    
    emotionText.textContent = emotionalState;
    
    // Update color based on emotion
    emotionCircle.className = 'emotion-circle';
    switch(emotionalState.toLowerCase()) {
        case 'feliz':
            emotionCircle.classList.add('happy');
            break;
        case 'ansioso':
        case 'estresado':
            emotionCircle.classList.add('anxious');
            break;
        default:
            emotionCircle.classList.add('stable');
    }
}

function addToEmotionalHistory(results) {
    const entryList = document.querySelector('.entry-list');
    if (!entryList) return;
    
    const newEntry = document.createElement('div');
    newEntry.className = 'history-entry';
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    newEntry.innerHTML = `
        <div class="entry-date">Hoy, ${timeStr}</div>
        <div class="entry-emotion ${results.emotionalState.toLowerCase()}">${results.emotionalState}</div>
        <div class="entry-note">Análisis de voz completado</div>
    `;
    
    entryList.insertBefore(newEntry, entryList.firstChild);
    
    // Remove oldest entry if more than 10
    if (entryList.children.length > 10) {
        entryList.removeChild(entryList.lastChild);
    }
}

function updateEmotionalChart(period) {
    const chart = document.getElementById('emotionalChart');
    if (!chart) return;
    
    const periodText = {
        'week': 'Última Semana',
        'month': 'Último Mes',
        'year': 'Último Año'
    };
    
    chart.textContent = `Historial Emocional - ${periodText[period]}`;
}

// Add CSS for toast notifications
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .toast-notification {
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .toast-notification:hover {
        transform: translateX(-5px);
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .toast-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(toastStyles);

// Initialize periodic updates
setInterval(() => {
    // Update stats
    updateDashboardStats();
}, 300000); // Every 5 minutes

function updateDashboardStats() {
    const weekStat = document.querySelector('.stat-number');
    const monthStat = document.querySelectorAll('.stat-number')[1];
    
    if (weekStat) {
        const currentWeek = parseInt(weekStat.textContent);
        weekStat.textContent = currentWeek + Math.floor(Math.random() * 2);
    }
    
    if (monthStat) {
        const currentMonth = parseInt(monthStat.textContent);
        monthStat.textContent = currentMonth + Math.floor(Math.random() * 3);
    }
} 