// =============================================
// MODO CLARO / ESCURO
// =============================================

const toggleBtn = document.getElementById('btn-tema');

function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('tema', tema);
    toggleBtn.textContent = tema === 'dark' ? '☀️' : '🌙';
    toggleBtn.setAttribute('aria-label', tema === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
}

const temaSalvo = localStorage.getItem('tema');
const temaInicial = temaSalvo || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
aplicarTema(temaInicial);

toggleBtn.addEventListener('click', () => {
    const temaAtual = document.documentElement.getAttribute('data-theme');
    aplicarTema(temaAtual === 'dark' ? 'light' : 'dark');
});

// VALIDAÇÃO DE FORMULÁRIO

const form = document.getElementById('formContato');

function mostrarErro(input, mensagem) {
    limparErro(input);
    input.classList.add('campo-invalido');
    const erro = document.createElement('span');
    erro.classList.add('mensagem-erro');
    erro.textContent = mensagem;
    input.insertAdjacentElement('afterend', erro);
}

function mostrarSucesso(input) {
    limparErro(input);
    input.classList.add('campo-valido');
}

function limparErro(input) {
    input.classList.remove('campo-invalido', 'campo-valido');
    const erroAnterior = input.nextElementSibling;
    if (erroAnterior && erroAnterior.classList.contains('mensagem-erro')) {
        erroAnterior.remove();
    }
}

function validarNome() {
    const nome = document.getElementById('nome');
    const valor = nome.value.trim();
    if (!valor) {
        mostrarErro(nome, '⚠️ O nome é obrigatório.');
        return false;
    }
    if (valor.length < 2) {
        mostrarErro(nome, '⚠️ O nome precisa ter pelo menos 2 caracteres.');
        return false;
    }
    mostrarSucesso(nome);
    return true;
}

function validarEmail() {
    const email = document.getElementById('email');
    const valor = email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!valor) {
        mostrarErro(email, '⚠️ O e-mail é obrigatório.');
        return false;
    }
    if (!regex.test(valor)) {
        mostrarErro(email, '⚠️ Digite um e-mail válido. Ex: nome@email.com');
        return false;
    }
    mostrarSucesso(email);
    return true;
}

function validarSugestoes() {
    const sugestoes = document.getElementById('sugestoes');
    const valor = sugestoes.value.trim();
    if (!valor) {
        mostrarErro(sugestoes, '⚠️ Escreva sua sugestão antes de enviar.');
        return false;
    }
    if (valor.length < 10) {
        mostrarErro(sugestoes, '⚠️ A sugestão precisa ter pelo menos 10 caracteres.');
        return false;
    }
    mostrarSucesso(sugestoes);
    return true;
}

function validarRadio() {
    const radios = document.querySelectorAll('input[name="curiosidade"]');
    const container = document.querySelector('.radios');
    const marcado = [...radios].some(r => r.checked);

    const erroAnterior = container.nextElementSibling;
    if (erroAnterior && erroAnterior.classList.contains('mensagem-erro')) {
        erroAnterior.remove();
    }
    container.classList.remove('radios-invalido');

    if (!marcado) {
        container.classList.add('radios-invalido');
        const erro = document.createElement('span');
        erro.classList.add('mensagem-erro');
        erro.textContent = '⚠️ Selecione uma curiosidade favorita.';
        container.insertAdjacentElement('afterend', erro);
        return false;
    }
    return true;
}

// Validação em tempo real (enquanto o usuário digita)
document.getElementById('nome').addEventListener('blur', validarNome);
document.getElementById('email').addEventListener('blur', validarEmail);
document.getElementById('sugestoes').addEventListener('blur', validarSugestoes);

document.querySelectorAll('input[name="curiosidade"]').forEach(radio => {
    radio.addEventListener('change', validarRadio);
});

// Envio do formulário
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nomeOk = validarNome();
    const emailOk = validarEmail();
    const sugestoesOk = validarSugestoes();
    const radioOk = validarRadio();

    if (nomeOk && emailOk && sugestoesOk && radioOk) {
        const mensagemSucesso = document.getElementById('mensagem-sucesso');
        mensagemSucesso.style.display = 'block';
        form.reset();

        document.querySelectorAll('.campo-valido').forEach(el => el.classList.remove('campo-valido'));
        document.querySelector('.radios').classList.remove('radios-invalido');

        setTimeout(() => {
            mensagemSucesso.style.display = 'none';
        }, 5000);
    }
});
