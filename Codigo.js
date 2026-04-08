document.getElementById("formAdocao").addEventListener("submit", function (e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let cpf = document.getElementById("cpf").value;
    let idade = document.getElementById("idade").value;
    let cidade = document.getElementById("cidade").value;
    let moradia = document.getElementById("moradia").value;
    let quintal = document.querySelector('input[name="quintal"]:checked');
    let pets = document.querySelector('input[name="pets"]:checked');
    let tempo = document.getElementById("tempo").value;
    let motivo = document.getElementById("motivo").value;
    let termo = document.getElementById("termo").checked;

    let permite = document.querySelector('input[name="permite"]:checked');
    let seguro = document.querySelector('input[name="seguro"]:checked');
    let financeiro = document.querySelector('input[name="financeiro"]:checked');
    let decisao = document.getElementById("decisao").value;

    
    
    if (idade < 18) {
        alert("Precisa ter 18 anos");
        return;
    }

    if (telefone.length < 8) {
        alert("Telefone inválido");
        return;
    }

    if (cpf === "") {
        alert("CPF obrigatório");
        return;
    }

    if (cpfsCadastrados.includes(cpf)) {
        alert("CPF já cadastrado");
        return;
    }

    if (!termo) {
        alert("Aceite o termo");
        return;
    }

    
    if (moradia === "apartamento" && !permite) {
        alert("Informe se o local permite animais");
        return;
    }

    if (moradia === "casa" && !seguro) {
        alert("Informe se o quintal é seguro");
        return;
    }

    if (moradia === "apartamento" && quintal && quintal.value === "sim") {
        alert("Apartamento não pode ter quintal");
        return;
    }

   
    if (tempo > 8) {
        alert("Animal ficará muito tempo sozinho! Justifique melhor.");
        return;
    }

    
    if (pets && pets.value === "nao") {
        alert("A ONG poderá acompanhar sua adaptação com o pet");
    }


    if (motivo === "quero" || motivo === "porque sim") {
        alert("Motivo inválido");
        return;
    }

    
    if (financeiro && financeiro.value === "nao") {
        alert("Sem condições financeiras para adoção");
        return;
    }

    if (decisao === "hoje") {
        alert("Cuidado com decisão impulsiva!");
    }


    document.getElementById("resultado").innerHTML =
        "Formulário enviado com sucesso!";
});