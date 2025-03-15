async function submitForm(event) {
    event.preventDefault();

    const result = document.getElementById('result');
    const button = document.getElementById('submit-button');

    result.style.display = 'block';
    button.style.display = 'none';

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify({
                cookie: document.getElementById('cookies').value,
                url: document.getElementById('urls').value,
                amount: document.getElementById('amounts').value,
                interval: document.getElementById('intervals').value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.status === 200) {
            result.style.backgroundColor = '#32f0dc';
            result.style.color = '#222';
            result.innerHTML = 'Submitted successfully!';
            button.style.display = 'block';
        } else {
            result.style.backgroundColor = '#3D1619';
            result.style.color = '#FF6265';
            result.innerHTML = 'Error: ' + data.error;
            button.style.display = 'block';
        }
    } catch (e) {
        console.error(e);
    }
}

async function linkOfProcessing() {
    try {
        const container = document.getElementById('processing');
        const processContainer = document.getElementById('process-container');

        const initialResponse = await fetch('/api/total');

        if (!initialResponse.ok) {
            throw new Error(`Failed to fetch: ${initialResponse.status} - ${initialResponse.statusText}`);
        }

        processContainer.style.display = 'none';

        const initialData = await initialResponse.json();

        if (!initialData || initialData.length === 0) return;

        initialData.forEach((link, index) => {
            let { url, count, id, target, session } = link;
            let processCard = document.createElement('div');
            processCard.classList.add('current-online');

            const text = document.createElement('h4');
            text.classList.add('count-text');
            text.innerHTML = `${index + 1}. ID: ${id} | ${count}/${target}`;

            processCard.appendChild(text);
            container.appendChild(processCard);

            const intervalId = setInterval(async () => {
                const updateResponse = await fetch('/api/total');

                if (!updateResponse.ok) {
                    console.error(`Failed to fetch update: ${updateResponse.status} - ${updateResponse.statusText}`);
                    return;
                }

                const updateData = await updateResponse.json();
                const updatedLink = updateData.find(l => l.session === session);

                if (updatedLink) {
                    let { count } = updatedLink;
                    update(processCard, count, id, index, target);
                }
            }, 1000);
        });
    } catch (e) {
        console.error(e);
    }
}

function update(processCard, count, id, index, target) {
    processCard.querySelector('.count-text').innerHTML = `${index + 1}. ID: ${id} | ${count}/${target}`;
}
