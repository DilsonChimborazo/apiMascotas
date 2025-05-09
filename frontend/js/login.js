document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            const response = await fetch('http://192.168.101.7:3000/loginDIL', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'mascotasInicio.html'; 
            } else {
                alert('Error: ' + data.msg);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error de conexión con el servidor.');
        }
    });
});
