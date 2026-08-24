function irABuscar() {
    window.location.href = 'buscar.html';
}

function irAOfrecer() {
    window.location.href = 'ofrecer.html';
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 30);
});
