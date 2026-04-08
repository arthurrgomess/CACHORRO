// Simulação de banco de dados para CPFs já cadastrados
const cpfsExistentes = ["12345678901", "11122233344"];

const form = document.getElementById('formAdocao');
const tipoMoradia = document.getElementById('tipoMoradia');
const sessaoCasa = document.getElementById('sessaoCasa');
const sessaoApto = document.getElementById('sessaoApto');

// Lógica para mostrar campos baseados na moradia
tipoMoradia.addEventListener('change', (e) => {
    sessaoCasa.classList.add('hidden');
    sessaoApto.classList.add('hidden');

    if (e.target.value === 'casa') {
        sessaoCasa.classList.remove('hidden');
    } else if (e.target.value === 'apartamento') {
        sessaoApto.classList.remove('hidden');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura de valores
    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        cpf: document.getElementById('cpf').value,
        idade: parseInt(document.getElementById('idade').value),
        tipoMoradia: document.getElementById('tipoMoradia').value,
        possuiQuintal: document.getElementById('possuiQuintal').value,
        horasSozinho: parseInt(document.getElementById('horasSozinho').value),
        jaTevePet: document.getElementById('jaTevePet').value,
        motivo: document.getElementById('motivo').value.toLowerCase(),
        financeiro: document.getElementById('condicaoFinanceira').value
    };

    // --- REGRAS DE NEGÓCIO ---

    // 1. Validação de Idade
    if (dados.idade < 18) {
        alert("Adoção negada: O candidato deve ser maior de 18 anos.");
        return;
    }

    // 2. CPF Duplicado
    if (cpfsExistentes.includes(dados.cpf)) {
        alert("Erro: Este CPF já possui uma solicitação em análise.");
        return;
    }

    // 3. Coerência Moradia vs Quintal
    if (dados.tipoMoradia === 'apartamento' && dados.possuiQuintal === 'sim') {
        alert("Incoerência: Apartamentos não podem ser marcados como possuindo quintal neste formulário.");
        return;
    }

    // 4. Regras de Segurança por Moradia
    if (dados.tipoMoradia === 'apartamento' && document.getElementById('permiteAnimais').value === 'nao') {
        alert("Bloqueio: Não é possível adotar se o condomínio não permite animais.");
        return;
    }

    // 5. Horas Sozinho
    if (dados.horasSozinho > 8) {
        const justificativa = prompt("O animal ficará mais de 8 horas sozinho. Por favor, informe quem poderá visitá-lo ou se haverá dog walker:");
        if (!justificativa) {
            alert("Adoção pausada: É necessário uma justificativa para o tempo de ausência.");
            return;
        }
        dados.justificativaTempo = justificativa;
    }

    // 6. Motivos Genéricos
    const proibidos = ["quero", "porque sim", "legal", "bonito", "dar de presente"];
    if (proibidos.some(palavra => dados.motivo.includes(palavra)) && dados.motivo.length < 15) {
        alert("Por favor, descreva com mais detalhes o seu motivo para adotar. Evite frases genéricas.");
        return;
    }

    // 7. Condição Financeira
    if (dados.financeiro === 'nao') {
        alert("Alerta: A ONG exige comprovação de meios para manutenção da saúde do pet. Seu cadastro será marcado para entrevista presencial.");
    }

    // 8. Primeiro Pet
    if (dados.jaTevePet === 'nao') {
        alert("Bem-vindo! Por ser seu primeiro pet, nossa equipe agendará uma mentoria gratuita sobre cuidados básicos.");
    }

    // SUCESSO: Exibir dados
    exibirSucesso(dados);
});

function exibirSucesso(dados) {
    const display = document.getElementById('displayDados');
    const result = document.getElementById('jsonResult');
    
    display.classList.remove('hidden');
    result.textContent = JSON.stringify(dados, null, 4);
    
    alert("Solicitação enviada com sucesso! Analisaremos seu perfil.");
    form.reset();
    sessaoCasa.classList.add('hidden');
    sessaoApto.classList.add('hidden');
}