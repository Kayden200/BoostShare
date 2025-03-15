const API_BASE = "https://your-render-app.onrender.com/api";

async function submitForm(event) {
    event.preventDefault();

    const result = document.getElementById('result');
    const button = document.getElementById('submit-button');

    result.style.display = 'block';
    button.style.display = 'none';

    try {
        const response = await fetch(`${API_BASE}/submit`, {
            method: 'POST',
            body: JSON.stringify({
                cookie: document.getElementById('cookies').value,
                url: document.getElementById('urls').value,
                amount: document.getElementById('amounts').value,
                interval: document.getElementById('intervals').value
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        result.innerHTML = data.status === 200 ? "Submitted successfully!" : "Error: " + data.error;
        button.style.display = 'block';
    } catch (e) {
        console.error(e);
    }
}
