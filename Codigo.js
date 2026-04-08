const cpfsCadastrados = ["12345678900", "98765432100"];

function ajustarCampos() {
    const tipo = document.getElementById('tipoMoradia').value;
    const campoApto = document.getElementById('campoApto');
    const campoCasa = document.getElementById('campoCasa');

    campoApto.classList.add('hidden');
    campoCasa.classList.add('hidden');

    if (tipo === 'apartamento') campoApto.classList.remove('hidden');
    if (tipo === 'casa') campoCasa.classList.remove('hidden');
}

document.getElementById('formAdocao').onsubmit = function(event) {
    event.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value.replace(/\D/g, ''), 
        idade: parseInt(document.getElementById('idade').value),
        moradia: document.getElementById('tipoMoradia').value,
        quintal: document.getElementById('possuiQuintal').value,
        horas: parseInt(document.getElementById('horasSozinho').value),
        tevePet: document.getElementById('jaTevePet').value,
        motivo: document.getElementById('motivo').value.trim().toLowerCase(),
        termo: document.getElementById('termo').checked
    };

    
    if (dados.idade < 18) {
        alert("Erro: Você precisa ter 18 anos ou mais para adotar.");
        return;
    }
o
    if (cpfsCadastrados.includes(dados.cpf)) {
        alert("Erro: Este CPF já possui um cadastro de interesse.");
        return;
    }

    if (dados.moradia === 'apartamento' && dados.quintal === 'sim') {
        alert("Incoerência: Apartamentos não possuem quintal externo. Verifique as opções.");
        return;
    }

    if (dados.moradia === 'apartamento') {
        const permite = document.getElementById('permiteAnimais').value;
        if (permite === 'nao') {
            alert("Adoção bloqueada: O condomínio deve permitir animais.");
            return;
        }
    }

    if (dados.horas > 8) {
        const justificativa = prompt("O animal ficará mais de 8h sozinho. Por favor, insira uma justificativa adicional:");
        if (!justificativa || justificativa.length < 5) {
            alert("Justificativa necessária para animais que ficam muito tempo sozinhos.");
            return;
        }
    }

    const motivosFracos = ["quero", "porque sim", "acho legal", "presente"];
    if (motivosFracos.includes(dados.motivo)) {
        alert("Por favor, descreva com mais detalhes por que deseja adotar.");
        return;
    }

    if (dados.tevePet === 'nao') {
        alert("Aviso: Como este é seu primeiro pet, a ONG entrará em contato para um acompanhamento especial.");
    }

    const resultado = document.getElementById('resultado');
    resultado.classList.remove('hidden');
    resultado.innerHTML = `
        <strong>Formulário enviado com sucesso!</strong><br>
        Obrigado, ${dados.nome}. Analisaremos sua proposta para a cidade de ${document.getElementById('cidade').value}.
    `;
    
    this.reset(); 
    ajustarCampos(); 
};