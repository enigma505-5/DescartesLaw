fetch('/.netlify/functions/tr', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        page: window.location.pathname
    })
});