
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formCadastro");
    const tabela = document.getElementById("tabelaCadastros");
    const mensagem = document.getElementById("mensagem");

    if (!formulario || !tabela) return;

    let registros = JSON.parse(localStorage.getItem("cadastrosLaPizza")) || [];

    function salvar() {
        localStorage.setItem("cadastrosLaPizza", JSON.stringify(registros));
    }

    function mostrarRegistros() {
        tabela.innerHTML = "";

        registros.forEach(function (registro, indice) {
            const linha = document.createElement("tr");

            [registro.assunto, registro.categoria, registro.prioridade].forEach(function (valor) {
                const coluna = document.createElement("td");
                coluna.textContent = valor;
                linha.appendChild(coluna);
            });

            const colunaAcoes = document.createElement("td");
            const botaoExcluir = document.createElement("button");

            botaoExcluir.textContent = "Excluir";
            botaoExcluir.className = "btn btn-danger btn-sm";
            botaoExcluir.type = "button";

            botaoExcluir.addEventListener("click", function () {
                registros.splice(indice, 1);
                salvar();
                mostrarRegistros();
            });

            colunaAcoes.appendChild(botaoExcluir);
            linha.appendChild(colunaAcoes);
            tabela.appendChild(linha);
        });
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const assunto = document.getElementById("assunto").value.trim();
        const categoria = document.getElementById("categoria").value;
        const prioridade = document.getElementById("prioridade").value;

        if (!assunto || !categoria || !prioridade) {
            alert("Preencha todos os campos!");
            return;
        }

        registros.push({ assunto, categoria, prioridade });

        salvar();
        mostrarRegistros();
        formulario.reset();

        if (mensagem) {
            mensagem.textContent = "Cadastro realizado com sucesso!";
            mensagem.className = "alert alert-success mt-3";
        }
    });

    mostrarRegistros();
});
