const btn = document.getElementById('btn-tema');

btn.addEventListener('click', () => {
    const atual = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', atual === 'dark' ? 'light' : 'dark');
    btn.textContent = atual === 'dark' ? '🌙' : '☀️';
});

const form = document.getElementById('formContato');

function mostrarErro(id, mensagem) {
    const campo = document.getElementById(id);
    let erro = campo.nextElementSibling;
    if (!erro || !erro.classList.contains('erro')) {
        erro = document.createElement('span');
        erro.classList.add('erro');
        campo.insertAdjacentElement('afterend', erro);
    }
    erro.textContent = mensagem;
    campo.style.border = '2px solid red';
}

function limpar(id) {
    const campo = document.getElementById(id);
    const erro = campo.nextElementSibling;
    if (erro && erro.classList.contains('erro')) erro.remove();
    campo.style.border = '';
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const radio = document.querySelector('input[name="curiosidade"]:checked');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valido = true;

    if (!nome) {
        mostrarErro('nome', '⚠️ Preencha o nome.');
        valido = false;
    } else {
        limpar('nome');
    }

    if (!email || !regex.test(email)) {
        mostrarErro('email', '⚠️ Digite um e-mail válido.');
        valido = false;
    } else {
        limpar('email');
    }

    if (!radio) {
        const container = document.querySelector('.radios');
        let erro = container.nextElementSibling;
        if (!erro || !erro.classList.contains('erro')) {
            erro = document.createElement('span');
            erro.classList.add('erro');
            container.insertAdjacentElement('afterend', erro);
        }
        erro.textContent = '⚠️ Selecione uma curiosidade.';
        valido = false;
    } else {
        const erroRadio = document.querySelector('.radios + .erro');
        if (erroRadio) erroRadio.remove();
    }

    if (valido) {
        document.getElementById('mensagem-sucesso').style.display = 'block';
        form.reset();
        setTimeout(() => {
            document.getElementById('mensagem-sucesso').style.display = 'none';
        }, 4000);
    }
});