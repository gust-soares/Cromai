const os = require('os');
const disk = require('diskusage');
const http = require('http');

// Configurações do servidor de monitoramento (ajuste conforme necessário)
const servidorMonitoramentoURL = 'http://localhost:5000/execute_command';
const intervaloDeColeta = 1000; // coleta em 1s

// Função para coletar dados de uso de CPU, disco e memória
function coletarDados() {
    const usoCPU = os.loadavg()[0]; // Uso da CPU média nos últimos 1 minuto
    const memoriaLivre = os.freemem() / os.totalmem() * 100; // Porcentagem de memória livre
    const discoInfo = disk.checkSync('/'); // Informações sobre o uso do disco (ajuste o caminho conforme necessário)

    return {
        usoCPU,
        usoMemoria: 100 - memoriaLivre, // Porcentagem de uso de memória
        usoDisco: discoInfo.percent,
    };
}

// Função para enviar os dados coletados para o servidor de monitoramento
function enviarDadosParaServidor(dados) {
    const dadosJSON = JSON.stringify(dados);

    const options = {
        hostname: servidorMonitoramentoURL,
        port: 80,
        path: '/execute_command', // Endpoint do servidor de monitoramento
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(dadosJSON),
        },
    };

    const req = http.request(options, (res) => {
        if (res.statusCode === 200) {
            console.log('Dados enviados com sucesso para o servidor de monitoramento.');
        } else {
            console.error('Falha ao enviar dados para o servidor de monitoramento. Código de status:', res.statusCode);
        }
    });

    req.on('error', (error) => {
        console.error('Erro ao enviar dados para o servidor de monitoramento:', error);
    });

    req.write(dadosJSON);
    req.end();
}
/*
// Loop principal para coleta e envio de dados
setInterval(() => {
    const dados = coletarDados();
    enviarDadosParaServidor(dados);
}, intervaloDeColeta);


document.addEventListener('DOMContentLoaded', function () {
    // Função para buscar os dados do servidor Flask e atualizar a tabela
    function atualizarTabela() {
        fetch('/dados') // Rota do servidor Flask para buscar os dados
            .then(response => response.json())
            .then(data => {
                const tabela = document.getElementById('dados-body');
                tabela.innerHTML = '';

                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        //<td>${item.id}</td>
                        <td>${item.uso_cpu.toFixed(2)}</td>
                        <td>${item.uso_memoria.toFixed(2)}</td>
                        <td>${item.uso_disco.toFixed(2)}</td>
                        <td>${item.timestamp}</td>
                    `;
                    tabela.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar dados do servidor:', error);
            });
    }

    // Chamar a função de atualização da tabela a cada 1 segundo
    setInterval(atualizarTabela, 1000);

    // Atualizar a tabela assim que a página for carregada
    atualizarTabela();
});

*/