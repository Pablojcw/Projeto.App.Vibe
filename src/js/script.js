let poemaEdicao = null
const viagem = document.getElementById("navegar_page_home");
if (viagem) {
    viagem.addEventListener("click", () => {
        window.location.href = "../pages/info.html";
    });
} else {
    console.warn("Elemento #navegar_page_home não encontrado no DOM");
}

const voltar = document.getElementById("navegar_home");
if (voltar) {
    voltar.addEventListener("click", () => {
        window.location.href = "home.html";
    });
} else {

}

const navegador_poema = document.getElementById("navegador_page_poema");
if (navegador_poema) {
    navegador_poema.addEventListener("click", () => {
        window.location.href = "poemas.html";
    });
} else {
    console.warn("Elemento #navegador_page_poema não encontrado no DOM");   
}


function salvarPoema() {
    const titulo = document.getElementById("poema_titulo")?.value.trim();
    const conteudo = document.getElementById("poema_conteudo")?.value.trim();

    if (!titulo || !conteudo) {
        alert("Por favor, Preencha titulo e conteudo");
        return;
    }

    let poemas = JSON.parse(localStorage.getItem("meus_poemas")) || [];

    if (poemaEdicao){
        poemas = poemas.map(p => {
            if(p.id === poemaEdicao){
                return{
                    ...p,
                    titulo,
                    conteudo,
                };
            }
            return p;
        });

        poemaEdicao = null;
    } else {
        const novoPoema = {
            id: Date.now(),
            titulo,
            conteudo,
            data: new Date().toLocaleDateString("pt-BR")
        };
        poemas.push(novoPoema);

    }

    localStorage.setItem("meus_poemas", JSON.stringify(poemas));

    // AQUI E AONDE VAMOS LIMPAR O FORMULARIO VULGOO POEMA

    document.getElementById("poema_titulo").value = "";
    document.getElementById("poema_conteudo").value = "";
    listarPoemas();
}

function listarPoemas() {
    const listaDiv = document.getElementById("lista_poemas");
    if (!listaDiv) return;

    const poemas = JSON.parse(localStorage.getItem("meus_poemas")) || [];

    if (poemas.length === 0) {
        listaDiv.innerHTML = "<p class='text-gray-500'>Nenhum poema salvo ainda. Voce precisa escrever ele primeiro.</p>";
        return;
    } else {
        listaDiv.innerHTML = poemas.map(poema => `
    <div class="poema-card">
        <h3 class="poema-titulo">${poema.titulo}</h3>
        <p class="poema-data">${poema.data}</p>
        <p class="poema-preview">
            ${poema.conteudo.substring(0, 300)}...
        </p>
        
        <div class="poema-botoes">
            <button 
                onclick="carregarPoema(${poema.id})"
                class="btn-edit">
                Continuar Editando
            </button>

            <button 
                onclick="deletarPoema(${poema.id})"
                class="btn-delete">
                Deletar
            </button>
        </div>
    </div>
`).join("");
    }
}

function carregarPoema(id) {
    let poemas = JSON.parse(localStorage.getItem("meus_poemas")) || [];
    const poema = poemas.find(p => p.id === id);

    if (poema) {
        document.getElementById("poema_titulo").value = poema.titulo;
        document.getElementById("poema_conteudo").value = poema.conteudo;

        poemaEdicao = id;
        document.getElementById("poema_titulo").focus();
    }
}

function deletarPoema(id) {
    if (!confirm(" Tem certeza que quer deletar este poema?")) {
        return;
    }

    let poemas = JSON.parse(localStorage.getItem("meus_poemas")) || [];
    poemas = poemas.filter(p => p.id !== id);
    localStorage.setItem("meus_poemas", JSON.stringify(poemas));
    listarPoemas();
}

const btnSalvar = document.getElementById("btn_salvar_poema");
if (btnSalvar) {
    btnSalvar.addEventListener("click", salvarPoema);
    listarPoemas();
}

