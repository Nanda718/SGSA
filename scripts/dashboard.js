

/* ==================================================
   CONFIGURAÇÃO GLOBAL DO CHART.JS
================================================== */

Chart.defaults.font.family =
    "Inter, system-ui, sans-serif";

Chart.defaults.font.size = 11;


const colors = getChartColors();


/* ==================================================
   GRÁFICO — SAÚDE DAS SALAS
================================================== */

const healthCanvas =
    document.getElementById("healthChart");


const healthChart =
    new Chart(healthCanvas, {

        type: "doughnut",

        data: {

            labels: [
                "Operacionais",
                "Em atenção",
                "Críticas"
            ],

            datasets: [
                {
                    data: [
                        39,
                        6,
                        3
                    ],

                    backgroundColor: [
                        colors.blue,
                        colors.pink,
                        colors.danger
                    ],

                    borderWidth: 0,

                    hoverOffset: 5
                }
            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "76%",

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {
                    padding: 11
                }

            }

        }

    });


/* ==================================================
   GRÁFICO — CHAMADOS POR CATEGORIA
================================================== */

const categoryCanvas =
    document.getElementById("categoryChart");


const categoryChart =
    new Chart(categoryCanvas, {

        type: "bar",

        data: {

            labels: [
                "Projetor",
                "Computador",
                "Internet",
                "Áudio",
                "Outros"
            ],

            datasets: [
                {
                    label: "Chamados",

                    data: [
                        18,
                        14,
                        10,
                        7,
                        5
                    ],

                    backgroundColor: [
                        colors.purple,
                        colors.blue,
                        colors.pink,
                        colors.danger,
                        "#7f879c"
                    ],

                    borderRadius: 7,

                    borderSkipped: false,

                    maxBarThickness: 30
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
                    },

                    ticks: {
                        color: colors.text
                    },

                    border: {
                        display: false
                    }

                },

                y: {

                    beginAtZero: true,

                    suggestedMax: 20,

                    ticks: {
                        stepSize: 5,
                        color: colors.text
                    },

                    grid: {
                        color: colors.grid
                    },

                    border: {
                        display: false
                    }

                }

            }

        }

    });


/* ==================================================
   GRÁFICO — VOLUME DE CHAMADOS
================================================== */

const ticketsCanvas =
    document.getElementById("ticketsChart");

const ticketsContext =
    ticketsCanvas.getContext("2d");


const gradient =
    ticketsContext.createLinearGradient(
        0,
        0,
        0,
        250
    );


gradient.addColorStop(
    0,
    "rgba(121, 86, 216, 0.28)"
);

gradient.addColorStop(
    1,
    "rgba(121, 86, 216, 0)"
);


const ticketsChart =
    new Chart(ticketsCanvas, {

        type: "line",

        data: {

            labels: [
                "Seg",
                "Ter",
                "Qua",
                "Qui",
                "Sex",
                "Sáb",
                "Dom"
            ],

            datasets: [
                {
                    label: "Chamados",

                    data: [
                        7,
                        11,
                        8,
                        15,
                        13,
                        4,
                        6
                    ],

                    borderColor: colors.purple,

                    backgroundColor: gradient,

                    borderWidth: 2.5,

                    pointRadius: 4,

                    pointHoverRadius: 6,

                    pointBackgroundColor:
                        colors.purple,

                    pointBorderColor:
                        colors.purple,

                    tension: 0.38,

                    fill: true
                }
            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: "index"
            },

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {
                        color: colors.text
                    },

                    border: {
                        display: false
                    }

                },

                y: {

                    beginAtZero: true,

                    suggestedMax: 20,

                    ticks: {
                        stepSize: 5,
                        color: colors.text
                    },

                    grid: {
                        color: colors.grid
                    },

                    border: {
                        display: false
                    }

                }

            }

        }

    });