const busca = document.querySelector(
    '#filtro-busca'
);

const nivel = document.querySelector(
    '#filtro-nivel'
);

const predio = document.querySelector(
    '#filtro-predio'
);

const status = document.querySelector(
    '#filtro-status'
);

const formulario = document.querySelector(
    '#filter-form'
);

/*
 * Remove acentos, espaços extras e converte
 * o texto para minúsculo.
 */
function normalizar(texto = '') {
    return texto
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();
}

/*
 * Adiciona valores aos selects sem repetir.
 */
function preencherSelect(select, valores) {
    if (!select) {
        return;
    }

    /*
     * Remove opções antigas, preservando "Todos".
     */
    select.innerHTML = `
        <option value="">Todos</option>
    `;

    const valoresValidos = valores.filter(
        valor => valor !== undefined &&
                 valor !== null &&
                 valor !== ''
    );

    const valoresUnicos = [
        ...new Set(valoresValidos)
    ];

    valoresUnicos
        .sort((a, b) => {
            return a.localeCompare(
                b,
                'pt-BR',
                {
                    numeric: true
                }
            );
        })
        .forEach(valor => {
            select.add(
                new Option(valor, valor)
            );
        });
}

/*
 * Preenche os filtros usando as salas
 * carregadas pelo painel.js.
 */
function prepararFiltros(salas) {
    preencherSelect(
        nivel,
        salas.map(sala => sala.nivel)
    );

    preencherSelect(
        predio,
        salas.map(sala => sala.predio)
    );

    preencherSelect(
        status,
        salas.map(sala => sala.status)
    );
}

/*
 * Filtra as salas.
 */
function filtrarSalas() {
    if (
        !Array.isArray(window.salas) ||
        typeof window.renderizarSalas !== 'function'
    ) {
        return;
    }

    const termoBusca = normalizar(
        busca?.value
    );

    const nivelSelecionado =
        nivel?.value || '';

    const predioSelecionado =
        predio?.value || '';

    const statusSelecionado =
        status?.value || '';

    const salasFiltradas = window.salas.filter(
        sala => {
            /*
             * A pesquisa considera nome e ID/número.
             */
            const textoSala = normalizar(
                `${sala.nome} ${sala.id}`
            );

            const correspondeBusca =
                textoSala.includes(termoBusca);

            const correspondeNivel =
                !nivelSelecionado ||
                sala.nivel === nivelSelecionado;

            const correspondePredio =
                !predioSelecionado ||
                sala.predio === predioSelecionado;

            const correspondeStatus =
                !statusSelecionado ||
                sala.status === statusSelecionado;

            return (
                correspondeBusca &&
                correspondeNivel &&
                correspondePredio &&
                correspondeStatus
            );
        }
    );

    window.renderizarSalas(
        salasFiltradas
    );
}

/*
 * Escuta o carregamento feito pelo painel.js.
 */
document.addEventListener(
    'salasCarregadas',
    evento => {
        prepararFiltros(
            evento.detail.salas
        );
    }
);

/*
 * Eventos dos campos.
 */
[busca, nivel, predio, status].forEach(
    campo => {
        if (campo) {
            campo.addEventListener(
                'input',
                filtrarSalas
            );
        }
    }
);

/*
 * Limpa os campos e mostra todas as salas.
 */
if (formulario) {
    formulario.addEventListener(
        'reset',
        () => {
            /*
             * Aguarda o navegador limpar os campos.
             */
            setTimeout(
                filtrarSalas,
                0
            );
        }
    );
}