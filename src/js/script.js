
const frases = [
    "Aprender é a melhor aventura!",
    "Hoje é um ótimo dia para criar algo novo!",
    "Código limpo = mente limpa 😎",
    "Nunca pare de praticar!"
];


const mensagemBtn = document.getElementById("mensagem");
if (mensagemBtn) {
    mensagemBtn.addEventListener("click", () => {
        const index = Math.floor(Math.random() * frases.length);
        const resultado = document.getElementById("resultado");
        if (resultado) resultado.textContent = frases[index];
    });
} else {
    // não está na página atual, tudo bem
}

// botão de navegação para outra página (home.html)
const viagem = document.getElementById("navegar_page_home");
if (viagem) {
    viagem.addEventListener("click", () => {
        window.location.href = "../pages/info.html";
    });
} else {
    console.warn("Elemento #navegar_page_home não encontrado no DOM");
}
// botão de retorno de Untitled-1 para home
const voltar = document.getElementById("navegar_home");
if (voltar) {
    voltar.addEventListener("click", () => {
        window.location.href = "home.html";
    });
} else {
    // não está na página atual
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

    const poema = {
        id: Date.now(),
        titulo: titulo,
        conteudo: conteudo,
        data: new Date().toLocaleDateString("pt-BR")
    };

    const poemas = JSON.parse(localStorage.getItem("meus_poemas")) || [];
    poemas.push(poema);
    localStorage.setItem("meus_poemas", JSON.stringify(poemas));

    // AQUI E AONDE VAMOS LIMPAR O FORMULARIO VULGOO POEMA

    document.getElementById("poema_titulo").value = "";
    document.getElementById("poema_conteudo").value = "";
    alert("Poema salvo com sucesso");
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

    alert(" Poema deletado!");
    listarPoemas();
}

// Inicializar lista ao carregar página de poemas
const btnSalvar = document.getElementById("btn_salvar_poema");
if (btnSalvar) {
    btnSalvar.addEventListener("click", salvarPoema);
    // Listar poemas ao carregar
    listarPoemas();
}

