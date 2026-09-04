
let salas = [];
let salasFiltradas = [];

let availabilityChart = null;
let levelChart = null;
let buildingChart = null;

document.addEventListener("DOMContentLoaded", iniciarDashboard);

async function iniciarDashboard() {
    try {
        const response = await fetch("data/salas.json");

        if (!response.ok) {
            throw new Error("Não foi possível carregar o arquivo salas.json.");
        }

        salas = await response.json();
        salasFiltradas = [...salas];

        preencherFiltros();
        configurarFiltros();
        configurarFormulario();
        atualizarDashboard();
    } catch (error) {
        console.error("Erro ao carregar o dashboard:", error);

        document.querySelector("#roomsList").innerHTML = `
            <p class="empty-message">
                Não foi possível carregar as salas.
            </p>
        `;

        document.querySelector("#unavailableRoomsList").innerHTML = `
            <p class="empty-message">
                Não foi possível carregar as salas.
            </p>
        `;
    }
}

function atualizarDashboard() {
    atualizarCards();
    renderizarSalas();
    renderizarSalasIndisponiveis();
    atualizarGraficoDisponibilidade();
    atualizarGraficoNiveis();
    atualizarGraficoPredios();
}

function preencherFiltros() {
    const predioFilter = document.querySelector("#predioFilter");
    const nivelFilter = document.querySelector("#nivelFilter");

    const predios = [...new Set(salas.map(sala => sala.predio))];
    const niveis = [...new Set(salas.map(sala => sala.nivel))];

    predios.sort();
    niveis.sort((a, b) => {
        return obterNumero(a) - obterNumero(b);
    });

    predios.forEach(predio => {
        const option = document.createElement("option");

        option.value = predio;
        option.textContent = predio;

        predioFilter.appendChild(option);
    });

    niveis.forEach(nivel => {
        const option = document.createElement("option");

        option.value = nivel;
        option.textContent = nivel;

        nivelFilter.appendChild(option);
    });
}

function configurarFiltros() {
    const predioFilter = document.querySelector("#predioFilter");
    const nivelFilter = document.querySelector("#nivelFilter");

    predioFilter.addEventListener("change", aplicarFiltros);
    nivelFilter.addEventListener("change", aplicarFiltros);
}

function aplicarFiltros() {
    const predioSelecionado =
        document.querySelector("#predioFilter").value;

    const nivelSelecionado =
        document.querySelector("#nivelFilter").value;

    salasFiltradas = salas.filter(sala => {
        const correspondePredio =
            predioSelecionado === "todos" ||
            sala.predio === predioSelecionado;

        const correspondeNivel =
            nivelSelecionado === "todos" ||
            sala.nivel === nivelSelecionado;

        return correspondePredio && correspondeNivel;
    });

    atualizarDashboard();
}

function atualizarCards() {
    const total = salasFiltradas.length;

    const disponiveis = salasFiltradas.filter(
        sala => sala.status === "Disponível"
    ).length;

    const indisponiveis = salasFiltradas.filter(
        sala => sala.status === "Indisponível"
    ).length;

    const percentualDisponiveis =
        total > 0
            ? Math.round((disponiveis / total) * 100)
            : 0;

    document.querySelector("#totalSalas").textContent = total;

    document.querySelector("#salasDisponiveis").textContent =
        disponiveis;

    document.querySelector("#salasIndisponiveis").textContent =
        indisponiveis;

    document.querySelector("#percentualDisponiveis").textContent =
        `${percentualDisponiveis}% das salas`;

    document.querySelector("#availabilityPercentage").textContent =
        `${percentualDisponiveis}%`;

    document.querySelector("#legendAvailable").textContent =
        disponiveis;

    document.querySelector("#legendUnavailable").textContent =
        indisponiveis;
}

function renderizarSalas() {
    const container = document.querySelector("#roomsList");

    if (salasFiltradas.length === 0) {
        container.innerHTML = `
            <p class="empty-message">
                Nenhuma sala encontrada.
            </p>
        `;

        return;
    }

    container.innerHTML = salasFiltradas
        .map(sala => criarSalaHTML(sala))
        .join("");
}

function renderizarSalasIndisponiveis() {
    const container =
        document.querySelector("#unavailableRoomsList");

    const indisponiveis = salasFiltradas.filter(
        sala => sala.status === "Indisponível"
    );

    if (indisponiveis.length === 0) {
        container.innerHTML = `
            <p class="empty-message">
                Nenhuma sala indisponível.
            </p>
        `;

        return;
    }

    container.innerHTML = indisponiveis
        .map(sala => criarSalaHTML(sala))
        .join("");
}

function criarSalaHTML(sala) {
    const classeStatus =
        sala.status === "Disponível"
            ? "disponivel"
            : "indisponivel";

    return `
        <div class="room-item">

            <div class="room-icon">
                ${obterNumeroSala(sala.nome)}
            </div>

            <div class="room-info">
                <strong>${sala.nome}</strong>
                <span>${sala.predio} · ${sala.nivel}</span>
            </div>

            <span class="room-status-indicator ${classeStatus}">
                ${sala.status}
            </span>

            <button
                class="edit-room-button"
                type="button"
                onclick="abrirEdicaoSala(${sala.id})"
                aria-label="Editar ${sala.nome}"
            >
                <i class="fa-solid fa-pen"></i>
            </button>

        </div>
    `;
}

function obterNumeroSala(nome) {
    const numero = nome.match(/\d+/);

    return numero ? numero[0] : "—";
}

function obterNumero(valor) {
    const numero = valor.match(/\d+/);

    return numero ? Number(numero[0]) : 0;
}

function atualizarGraficoDisponibilidade() {
    const disponiveis = salasFiltradas.filter(
        sala => sala.status === "Disponível"
    ).length;

    const indisponiveis = salasFiltradas.filter(
        sala => sala.status === "Indisponível"
    ).length;

    const canvas =
        document.querySelector("#availabilityChart");

    if (availabilityChart) {
        availabilityChart.destroy();
    }

    availabilityChart = new Chart(canvas, {
        type: "doughnut",

        data: {
            labels: [
                "Disponíveis",
                "Indisponíveis"
            ],

            datasets: [
                {
                    data: [
                        disponiveis,
                        indisponiveis
                    ],

                    backgroundColor: [
                        "#2e9c65",
                        "#e74c3c"
                    ],

                    borderWidth: 0
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "75%",

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label(context) {
                            return `${context.label}: ${context.raw}`;
                        }
                    }
                }
            }
        }
    });
}

function atualizarGraficoNiveis() {
    const quantidadePorNivel = {};

    salasFiltradas.forEach(sala => {
        quantidadePorNivel[sala.nivel] =
            (quantidadePorNivel[sala.nivel] || 0) + 1;
    });

    const niveis = Object.keys(quantidadePorNivel).sort(
        (a, b) => obterNumero(a) - obterNumero(b)
    );

    const valores = niveis.map(
        nivel => quantidadePorNivel[nivel]
    );

    const canvas = document.querySelector("#levelChart");

    if (levelChart) {
        levelChart.destroy();
    }

    levelChart = new Chart(canvas, {
        type: "bar",

        data: {
            labels: niveis,

            datasets: [
                {
                    label: "Salas",
                    data: valores,
                    borderRadius: 8,
                    backgroundColor: "#7857ff"
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },

                y: {
                    beginAtZero: true,

                    ticks: {
                        stepSize: 1,
                        precision: 0
                    }
                }
            }
        }
    });
}

function atualizarGraficoPredios() {
    const quantidadePorPredio = {};

    salasFiltradas.forEach(sala => {
        quantidadePorPredio[sala.predio] =
            (quantidadePorPredio[sala.predio] || 0) + 1;
    });

    const predios = Object.keys(quantidadePorPredio);

    const valores = predios.map(
        predio => quantidadePorPredio[predio]
    );

    const canvas =
        document.querySelector("#buildingChart");

    if (buildingChart) {
        buildingChart.destroy();
    }

    buildingChart = new Chart(canvas, {
        type: "bar",

        data: {
            labels: predios,

            datasets: [
                {
                    label: "Salas",
                    data: valores,
                    borderRadius: 8,
                    backgroundColor: "#4169e1"
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },

                y: {
                    beginAtZero: true,

                    ticks: {
                        stepSize: 1,
                        precision: 0
                    }
                }
            }
        }
    });
}

function abrirEdicaoSala(id) {
    const sala = salas.find(
        sala => sala.id === id
    );

    if (!sala) {
        return;
    }

    document.querySelector("#editRoomId").value =
        sala.id;

    document.querySelector("#editRoomName").value =
        sala.nome;

    document.querySelector("#editRoomLevel").value =
        sala.nivel;

    document.querySelector("#editRoomBuilding").value =
        sala.predio;

    document.querySelector("#editRoomStatus").value =
        sala.status;

    document
        .querySelector("#editRoomModal")
        .classList.add("active");
}

function fecharEdicaoSala() {
    document
        .querySelector("#editRoomModal")
        .classList.remove("active");
}

function configurarFormulario() {
    const formulario =
        document.querySelector("#editRoomForm");

    formulario.addEventListener("submit", salvarEdicaoSala);

    document
        .querySelector("#editRoomModal")
        .addEventListener("click", event => {

            if (event.target.id === "editRoomModal") {
                fecharEdicaoSala();
            }
        });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            fecharEdicaoSala();
        }
    });
}

function salvarEdicaoSala(event) {
    event.preventDefault();

    const id = Number(
        document.querySelector("#editRoomId").value
    );

    const sala = salas.find(
        sala => sala.id === id
    );

    if (!sala) {
        return;
    }

    sala.nome =
        document.querySelector("#editRoomName")
            .value
            .trim();

    sala.nivel =
        document.querySelector("#editRoomLevel")
            .value
            .trim();

    sala.predio =
        document.querySelector("#editRoomBuilding")
            .value
            .trim();

    sala.status =
        document.querySelector("#editRoomStatus")
            .value;

    fecharEdicaoSala();

    reconstruirFiltros();
    aplicarFiltros();
}

function reconstruirFiltros() {
    const predioFilter =
        document.querySelector("#predioFilter");

    const nivelFilter =
        document.querySelector("#nivelFilter");

    const predioAtual = predioFilter.value;
    const nivelAtual = nivelFilter.value;

    predioFilter.innerHTML = `
        <option value="todos">
            Todos os prédios
        </option>
    `;

    nivelFilter.innerHTML = `
        <option value="todos">
            Todos os níveis
        </option>
    `;

    preencherFiltros();

    const predioExiste = [...predioFilter.options]
        .some(option => option.value === predioAtual);

    const nivelExiste = [...nivelFilter.options]
        .some(option => option.value === nivelAtual);

    predioFilter.value =
        predioExiste
            ? predioAtual
            : "todos";

    nivelFilter.value =
        nivelExiste
            ? nivelAtual
            : "todos";
}

