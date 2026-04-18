// Utility for Fetch API Calls
async function toggleSave(id, btnElement) {
    try {
        const response = await fetch('/api/toggle_save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        const data = await response.json();
        
        if (data.status === 'saved') {
            btnElement.innerHTML = '⭐ Saved!';
            btnElement.classList.remove('btn-secondary');
            btnElement.classList.add('btn-success');
            fireConfetti();
        } else {
            btnElement.innerHTML = '⭐ Save Mission';
            btnElement.classList.remove('btn-success');
            btnElement.classList.add('btn-secondary');
        }
    } catch (e) {
        console.error("Error toggling save", e);
    }
}

async function toggleComplete(id, btnElement) {
    try {
        const response = await fetch('/api/toggle_complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        const data = await response.json();
        
        if (data.status === 'completed') {
            btnElement.innerHTML = '🏆 Completed!';
            btnElement.classList.remove('btn-primary');
            btnElement.classList.add('btn-success');
            fireConfetti();
        } else {
            btnElement.innerHTML = '✔️ Mark Complete';
            btnElement.classList.remove('btn-success');
            btnElement.classList.add('btn-primary');
        }
    } catch (e) {
        console.error("Error toggling complete", e);
    }
}

async function clearData() {
    if (confirm("Are you sure you want to clear all progress?")) {
        await fetch('/api/clear_data', { method: 'POST' });
        window.location.reload();
    }
}

// Confetti Effect
function fireConfetti() {
    for (let i = 0; i < 50; i++) {
        createConfettiParticle();
    }
}

function createConfettiParticle() {
    const particle = document.createElement('div');
    document.body.appendChild(particle);
    
    const size = Math.random() * 10 + 5;
    const colors = ['#FFD166', '#EF476F', '#06D6A0', '#118AB2'];
    
    particle.style.position = 'fixed';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    
    const startX = Math.random() * window.innerWidth;
    const startY = -20;
    
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.zIndex = '9999';
    
    const endX = startX + (Math.random() * 200 - 100);
    const endY = window.innerHeight;
    const fallDuration = Math.random() * 2 + 1;
    
    particle.animate([
        { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate3d(${endX - startX}px, ${endY}px, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
        duration: fallDuration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    setTimeout(() => {
        particle.remove();
    }, fallDuration * 1000);
}
