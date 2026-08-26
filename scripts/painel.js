const painel = document.querySelector('#painel');
const contagem = document.querySelector('#resultado-contagem');

/*
 * As salas ficam disponíveis globalmente para o filtros.js.
 */
window.salas = [];

/*
 * Remove acentos e converte o texto para minúsculo.
 * Usado para criar as classes dos status.
 */
function normalizarStatus(texto = '') {
    return texto
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-');
}

/*
 * Atualiza o painel com a lista recebida.
 */
window.renderizarSalas = function (lista) {
    if (!painel) {
        return;
    }

    if (contagem) {
        contagem.textContent =
            `${lista.length} ${
                lista.length === 1
                    ? 'sala encontrada'
                    : 'salas encontradas'
            }`;
    }

    if (lista.length === 0) {
        painel.innerHTML = `
            <div class="empty">
                <i class="fa-regular fa-folder-open"></i>
                <p>Nenhuma sala corresponde aos filtros.</p>
            </div>
        `;

        return;
    }

    painel.innerHTML = lista
        .map(sala => {
            const statusClasse = normalizarStatus(
                sala.status
            );

            return `
                <button
                    class="room-card"
                    type="button"
                    data-id="${sala.id}"
                    aria-label="Abrir ${sala.nome}"
                >
                    <span class="room-top">
                        <span class="room-icon">
                            <i class="fa-solid fa-door-open"></i>
                        </span>

                        <span class="status ${statusClasse}">
                            ${sala.status}
                        </span>
                    </span>

                    <h2>${sala.nome}</h2>

                    <span class="room-meta">
                        <span>
                            <i class="fa-solid fa-layer-group"></i>
                            ${sala.nivel}
                        </span>

                        <span>
                            <i class="fa-regular fa-building"></i>
                            ${sala.predio}
                        </span>
                    </span>
                </button>
            `;
        })
        .join('');
};

/*
 * Carrega as salas do arquivo JSON.
 */
async function carregarSalas() {
    try {
        const resposta = await fetch('data/salas.json');

        if (!resposta.ok) {
            throw new Error(
                `Não foi possível carregar salas.json. Código: ${resposta.status}`
            );
        }

        const dados = await resposta.json();

        if (!Array.isArray(dados)) {
            throw new Error(
                'O arquivo salas.json precisa conter uma lista.'
            );
        }

        window.salas = dados;

        window.renderizarSalas(window.salas);

        /*
         * Avisa ao filtros.js que as salas foram carregadas.
         */
        document.dispatchEvent(
            new CustomEvent('salasCarregadas', {
                detail: {
                    salas: window.salas
                }
            })
        );
    } catch (erro) {
        console.error(
            'Erro ao carregar as salas:',
            erro
        );

        if (contagem) {
            contagem.textContent =
                'Erro no carregamento';
        }

        if (painel) {
            painel.innerHTML = `
                <div class="error">
                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <p>${erro.message}</p>

                    <small>
                        Verifique se o arquivo está em
                        <strong>data/salas.json</strong>
                        e execute o projeto por um servidor local.
                    </small>
                </div>
            `;
        }
    }
}

/*
 * Evento de clique nos cartões.
 */
painel?.addEventListener('click', evento => {
    const cartao = evento.target.closest(
        '.room-card'
    );

    if (!cartao) {
        return;
    }

    const idSala = Number(cartao.dataset.id);

    const salaSelecionada = window.salas.find(
        sala => Number(sala.id) === idSala
    );

    if (!salaSelecionada) {
        return;
    }

    console.log(
        'Sala selecionada:',
        salaSelecionada
    );

    /*
     * Você pode abrir um modal ou redirecionar aqui.
     *
     * Exemplo:
     * window.location.href = `sala.html?id=${idSala}`;
     */
});

carregarSalas();