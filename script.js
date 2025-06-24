// Variáveis globais para controlar as telas e o laudo atual
let currentScreen = 'homeScreen';
let currentLaudo = null;

// Tabela de conversão (conforme o documento)
const conversionTable = {
    'A': 1, 'J': 1, 'S': 1, 'B': 2, 'K': 2, 'T': 2, 'C': 3, 'L': 3, 'U': 3,
    'D': 4, 'M': 4, 'V': 4, 'E': 5, 'N': 5, 'W': 5, 'F': 6, 'O': 6, 'X': 6,
    'G': 7, 'P': 7, 'Y': 7, 'H': 8, 'Q': 8, 'Z': 8, 'I': 9, 'R': 9
};
const vogais = ['A', 'E', 'I', 'O', 'U'];

const flechasData = {
    forca: [
        { nome: "Flecha da Determinação", numeros: [1, 5, 9], url: "flecha_determinacao.html" },
        { nome: "Flecha do Planejamento", numeros: [1, 2, 3], url: "flecha_planejamento.html" },
        { nome: "Flecha da Ação", numeros: [7, 8, 9], url: "flecha_acao.html" },
        { nome: "Flecha do Intelecto", numeros: [3, 6, 9], url: "flecha_intelecto.html" },
        { nome: "Flecha do Equilíbrio Emocional", numeros: [2, 5, 8], url: "flecha_equilibrio_emocional.html" },
        { nome: "Flecha da Praticidade", numeros: [1, 4, 7], url: "flecha_praticidade.html" },
        { nome: "Flecha da Vontade", numeros: [4, 5, 6], url: "flecha_vontade.html" },
        { nome: "Flecha da Espiritualidade", numeros: [3, 5, 7], url: "flecha_espiritualidade.html" }
    ],
    fraqueza: [
        { nome: "Flecha da Incerteza", numeros: [1, 5, 9], url: "flecha_incerteza.html" },
        { nome: "Flecha da Desordem", numeros: [1, 2, 3], url: "flecha_desordem.html" },
        { nome: "Flecha da Procrastinação", numeros: [7, 8, 9], url: "flecha_procrastinacao.html" },
        { nome: "Flecha da Memória Fraca", numeros: [3, 6, 9], url: "flecha_memoria_fraca.html" },
        { nome: "Flecha da Hipersensibilidade", numeros: [2, 5, 8], url: "flecha_hipersensibilidade.html" },
        { nome: "Flecha do Ceticismo", numeros: [1, 4, 7], url: "flecha_ceticismo.html" },
        { nome: "Flecha da Frustração", numeros: [4, 5, 6], url: "flecha_frustracao.html" },
        { nome: "Flecha da Incredulidade", numeros: [3, 5, 7], url: "flecha_incredulidade.html" }
    ]
};

const repeatedNumbersMeanings = {
    '1': { 2: '<strong>Equilíbrio na Expressão:</strong> Você tem a capacidade de ver os dois lados de um argumento, expressando-se de forma equilibrada.', 3: '<strong>O Comunicador:</strong> Você é um excelente conversador, interessante e com uma imaginação vívida, ou um escritor introspectivo que se expressa melhor no papel.', 4: '<strong>Dificuldade de Expressão:</strong> Você pode sentir que é frequentemente mal compreendido e ter dificuldade em expressar verbalmente seus sentimentos mais íntimos.' },
    '2': { 2: '<strong>Intuição Equilibrada:</strong> Você possui uma percepção inata e sensibilidade aguçada. Suas primeiras impressões são quase sempre precisas.', 3: '<strong>Hipersensibilidade:</strong> Sua sensibilidade é tão aguçada que você pode absorver as emoções alheias, o que pode ser emocionalmente desgastante.', 4: '<strong>Sensibilidade Extrema:</strong> Sua intuição pode se tornar pouco confiável devido à impaciência e ao desequilíbrio emocional.' },
    '3': { 2: '<strong>Imaginação Fértil:</strong> Sua mente é muito alerta e sua imaginação é acentuada, com grande potencial para habilidade literária, mas precisa de disciplina.', 3: '<strong>Mundo da Imaginação:</strong> Sua imaginação é tão dominante que você pode ter dificuldade em se concentrar no presente.', 4: '<strong>Mente Inquieta:</strong> Pode haver uma tendência a medos e preocupações intensas, com pouca consideração pelos aspectos práticos da vida.' },
    '4': { 2: '<strong>Foco no Material:</strong> Você tem uma forte inclinação para o mundo prático, mas precisa desenvolver o equilíbrio com os lados mental e espiritual.', 3: '<strong>Trabalho Intenso:</strong> Você pode ser atraído por trabalho manual pesado, correndo o risco de se esgotar. A lição é dominar o trabalho, e não ser escravizado por ele.', 4: '<strong>Atração Extrema pelo Físico:</strong> Uma ocorrência rara que exige cuidado extra em todas as atividades físicas.' },
    '5': { 2: '<strong>Intensidade Emocional:</strong> Você possui uma intensidade avassaladora e um ar de grande confiança, mas precisa cuidar para que isso não se transforme em estresse.', 3: '<strong>Autodisciplina Vital:</strong> A intensidade emocional é um desafio que requer treinamento cuidadoso em autodisciplina desde cedo.', 4: '<strong>Propenso a Acidentes:</strong> Uma ocorrência rara que indica um estado de estresse avançado. É crucial buscar o equilíbrio.' },
    '6': { 2: '<strong>Preocupação e Ansiedade:</strong> O lado negativo pode gerar preocupação e estresse. Canalize a energia para atividades criativas fora do lar.', 3: '<strong>Protetor Excessivo:</strong> A preocupação com o lar e a família pode se tornar tão intensa que você se torna possessivo.', 4: '<strong>Potencial Criativo Excepcional:</strong> Você tem um dom criativo imenso, mas deve lutar contra a tendência à preocupação.' },
    '7': { 2: '<strong>Lições Intensificadas:</strong> A vida lhe apresentará lições importantes através de perdas ou sacrifícios em duas das três áreas: saúde, amor ou dinheiro.', 3: '<strong>Profunda Compreensão Filosófica:</strong> Você tem a capacidade de desenvolver uma profunda compreensão filosófica sobre o propósito por trás dos eventos da vida.', 4: '<strong>Sacrifício Composto:</strong> Uma ocorrência rara que indica lições de vida muito intensas. Requer uma busca consciente por sabedoria.' },
    '8': { 2: '<strong>Poder de Avaliação Aguçado:</strong> Você se destaca em trabalhos que exigem atenção aos detalhes e tem uma capacidade de avaliação muito apurada.', 3: '<strong>Inquietação Aguda:</strong> Se não for bem canalizada, a energia pode levar ao pessimismo. O lado positivo traz grande sabedoria.', 4: '<strong>Hiperatividade:</strong> Você é uma pessoa extremamente inquieta e precisa de atividade constante.' },
    '9': { 2: '<strong>Idealismo Intenso:</strong> Seu zelo e idealismo são muito fortes. É crucial equilibrá-los com praticidade para que suas ideias possam se concretizar.', 3: '<strong>Ambição Desafiadora:</strong> O poder de sua ambição e idealismo pode ser difícil de lidar, podendo levar a desequilíbrios.', 4: '<strong>Extremos do Idealismo:</strong> Pode se manifestar como um sonhador que vive fora da realidade ou como uma pessoa agressiva que critica os outros.' }
};

// --- FUNÇÕES PRINCIPAIS ---

function showScreen(screenId) {
    if (screenId.endsWith('.html')) {
        window.location.href = screenId;
        return;
    }
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;

    if (screenId === 'historyScreen') loadAndDisplayLaudos();
    else if (screenId === 'conversionTableScreen') populateConversionTable();
}

function reduceToSingleDigit(number, allowMasterNumbers = false) {
    while (number > 9) {
        if (allowMasterNumbers && (number === 11 || number === 22 || number === 33)) {
            return number;
        }
        number = String(number).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return number;
}

function calculateNamePartDetails(namePart) {
    let vogalSum = 0;
    let consoanteSum = 0;
    let details = [];
    const cleanName = namePart.toUpperCase().replace(/ /g, '');

    for (const char of cleanName) {
        let value = conversionTable[char] || 'N/A';
        let type = 'ignorado';
        if (value !== 'N/A') {
            if (vogais.includes(char)) {
                vogalSum += value;
                type = 'vogal';
            } else {
                consoanteSum += value;
                type = 'consoante';
            }
        }
        details.push({ char, value, type });
    }
    return { vogais: vogalSum, consoanteSum, details };
}

function calculatePotentialityMap(fullName) {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');

    for (const char of cleanName) {
        const value = conversionTable[char];
        if (value) counts[value]++;
    }

    const absentNumbers = Object.keys(counts).filter(num => counts[num] === 0).map(Number);
    return { counts, absentNumbers };
}

function calculateLaudo(nomeCompleto, dataNascimentoStr, endereco, telefone) {
    const dataNascimento = new Date(dataNascimentoStr + 'T12:00:00');
    const nameParts = nomeCompleto.split(' ').filter(part => part.trim() !== '');
    
    let totalVogaisGlobal = 0, totalConsoantesGlobal = 0, nameCalculationDetails = {};

    nameParts.forEach(part => {
        const partCalculations = calculateNamePartDetails(part);
        totalVogaisGlobal += partCalculations.vogais;
        totalConsoantesGlobal += partCalculations.consoanteSum;
        nameCalculationDetails[part] = {
            letters: partCalculations.details,
            vogaisSumReduced: reduceToSingleDigit(partCalculations.vogais, true),
            consoantesSumReduced: reduceToSingleDigit(partCalculations.consoanteSum, true),
            totalSumReduced: reduceToSingleDigit(partCalculations.vogais + partCalculations.consoanteSum, true)
        };
    });

    const numeroAlma = reduceToSingleDigit(totalVogaisGlobal, true);
    const numeroPersonalidade = reduceToSingleDigit(totalConsoantesGlobal, true);
    const totalResultsGlobal = totalVogaisGlobal + totalConsoantesGlobal;
    const numeroExpressao = reduceToSingleDigit(totalResultsGlobal, true);

    const day = dataNascimento.getDate();
    const month = dataNascimento.getMonth() + 1;
    const year = dataNascimento.getFullYear();
    const destinoSumBruta = reduceToSingleDigit(day, false) + reduceToSingleDigit(month, false) + reduceToSingleDigit(year, false);
    const numeroDestino = reduceToSingleDigit(destinoSumBruta, true);
    const numeroMissao = reduceToSingleDigit(totalResultsGlobal + destinoSumBruta, true);
    
    const currentYear = new Date().getFullYear();
    const anoPessoal = reduceToSingleDigit(reduceToSingleDigit(day) + reduceToSingleDigit(month) + reduceToSingleDigit(currentYear), true);

    return {
        nomeCompleto,
        dataNascimento: dataNascimento.toISOString().split('T')[0],
        endereco: endereco || '',
        telefone: telefone || '',
        numeroAlma, numeroPersonalidade, numeroExpressao, numeroDestino, numeroMissao, anoPessoal,
        numeroEndereco: endereco ? reduceToSingleDigit([...endereco.toUpperCase()].reduce((sum, char) => sum + (conversionTable[char] || parseInt(char) || 0), 0), true) : null,
        numeroTelefone: telefone ? reduceToSingleDigit([...telefone.replace(/\D/g, '')].reduce((sum, digit) => sum + parseInt(digit), 0), true) : null,
        nameCalculationDetails,
        potentialityMap: calculatePotentialityMap(nomeCompleto)
    };
}


/**
 * Cria um card de resultado com título, descrição, valor e um link dinâmico.
 */
function createResultCard(title, description, value) {
    if (value === null || value === undefined) return '';
    return `
        <div class="result-card">
            <h3>${title}</h3>
            <p>${description}</p>
            <p>Valor: <strong>${value}</strong></p>
            <a href="meaning_${value}.html" target="_blank" class="more-info-link">Ver mais...</a>
        </div>
    `;
}

function displayLaudoResult(laudo) {
    const resultContent = document.getElementById('resultContent');

    const nameDetailsHtml = `<h3>Detalhes dos Cálculos do Nome:</h3><details><summary>Ver Tabelas de Conversão do Nome</summary><div class="details-section">${Object.entries(laudo.nameCalculationDetails).map(([partName, data]) => `<h4>Parte do Nome: "${partName}"</h4><table class="name-conversion-detail-table"><tbody><tr class="vogal-line">${data.letters.map(item => `<td>${item.type === 'vogal' && item.value !== 'N/A' ? item.value : ''}</td>`).join('')}<td class="sum-cell">Vogais: ${data.vogaisSumReduced}</td></tr><tr class="name-line">${data.letters.map(item => `<td>${item.char}</td>`).join('')}<td class="sum-cell">Total: ${data.totalSumReduced}</td></tr><tr class="consoante-line">${data.letters.map(item => `<td>${item.type === 'consoante' && item.value !== 'N/A' ? item.value : ''}</td>`).join('')}<td class="sum-cell">Consoantes: ${data.consoantesSumReduced}</td></tr></tbody></table><br>`).join('')}</div></details>`;
    
    const potentialityTableRows = Object.entries(laudo.potentialityMap.counts).map(([number, count]) => `<tr><td>${number}</td><td>${count}</td></tr>`).join('');
    const absentNumbersText = laudo.potentialityMap.absentNumbers.length > 0 ? `Os números ausentes no seu nome são: <strong>${laudo.potentialityMap.absentNumbers.join(', ')}</strong>. Estes podem apontar para lições a serem aprendidas.` : 'Todos os números de 1 a 9 estão presentes em seu nome.';
    const potentialityTableHtml = `<h3>Mapa de Potencialidade (Frequência no Nome)</h3><details open><summary>Frequência dos Números no Nome Completo</summary><div class="details-section"><table class="potentiality-map-table"><thead><tr><th>Número</th><th>Quantidade</th></tr></thead><tbody>${potentialityTableRows}</tbody></table><p class="potentiality-summary">${absentNumbersText}</p></div></details>`;

    const cardsHtml = `
        ${createResultCard('Número de Motivação (Alma)', 'Soma das vogais do nome.', laudo.numeroAlma)}
        ${createResultCard('Número de Impressão (Personalidade)', 'Soma das consoantes do nome.', laudo.numeroPersonalidade)}
        ${createResultCard('Número de Expressão', 'Soma de todas as letras do nome.', laudo.numeroExpressao)}
        ${createResultCard('Número de Destino', 'Soma da data de nascimento.', laudo.numeroDestino)}
        ${createResultCard('Número de Missão', 'Soma da Expressão e do Destino.', laudo.numeroMissao)}
        ${createResultCard('Ano Pessoal', 'Soma do dia e mês de nasc. com o ano vigente.', laudo.anoPessoal)}
        ${createResultCard('Número do Endereço', 'Soma das letras e números do endereço.', laudo.numeroEndereco)}
        ${createResultCard('Número do Telefone', 'Soma de todos os dígitos do telefone.', laudo.numeroTelefone)}
    `;

    resultContent.innerHTML = `
        <p><strong>Nome:</strong> ${laudo.nomeCompleto}</p>
        <p><strong>Data de Nascimento:</strong> ${laudo.dataNascimento}</p>
        ${laudo.endereco ? `<p><strong>Endereço:</strong> ${laudo.endereco}</p>` : ''}
        ${laudo.telefone ? `<p><strong>Telefone:</strong> ${laudo.telefone}</p>` : ''}
        <hr>${cardsHtml}<hr>${nameDetailsHtml}<hr>${potentialityTableHtml}
    `;
    showScreen('laudoResultScreen');
}

// Substitua a sua função analisarFlechas por esta versão mais segura
function analisarFlechas(dataNascimentoStr) {
    if (!dataNascimentoStr) {
        alert("Por favor, insira uma data de nascimento.");
        return;
    }

    const digitos = dataNascimentoStr.replace(/-/g, '');
    const contagemDigitos = {};
    for (const digito of digitos) {
        if (digito !== '0') contagemDigitos[digito] = (contagemDigitos[digito] || 0) + 1;
    }

    // --- 1. Gera a Grade Visual (com verificação) ---
    const gridContainer = document.getElementById('numerologyGrid');
    if (!gridContainer) {
        console.error("ERRO: O elemento com ID 'numerologyGrid' não foi encontrado no seu HTML.");
        return; // Para a função para evitar mais erros
    }
    gridContainer.innerHTML = '';
    const gridLayout = [[3, 6, 9], [2, 5, 8], [1, 4, 7]];
    gridLayout.forEach(row => row.forEach(num => {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        if (contagemDigitos[num]) cell.textContent = String(num).repeat(contagemDigitos[num]);
        gridContainer.appendChild(cell);
    }));

    // --- 2. Analisa e Exibe as Flechas (com verificação) ---
    const arrowsAnalysisContainer = document.getElementById('arrowsAnalysis');
    if (!arrowsAnalysisContainer) {
        console.error("ERRO: O elemento com ID 'arrowsAnalysis' não foi encontrado no seu HTML.");
        return;
    }
    let htmlForcas = '<h4>Flechas de Força:</h4><ul>';
    let htmlFraquezas = '<h4>Flechas de Fraqueza:</h4><ul>';
    let encontrouForca = false, encontrouFraqueza = false;

    flechasData.forca.forEach(flecha => {
        if (flecha.numeros.every(num => contagemDigitos[num])) {
            htmlForcas += `<li><a href="flechas/${flecha.url}" target="_blank">${flecha.nome}</a></li>`;
            encontrouForca = true;
        }
    });
    flechasData.fraqueza.forEach(flecha => {
        if (flecha.numeros.every(num => !contagemDigitos[num])) {
            htmlFraquezas += `<li class="weakness"><a href="flechas/${flecha.url}" target="_blank">${flecha.nome}</a></li>`;
            encontrouFraqueza = true;
        }
    });
    htmlForcas += encontrouForca ? '</ul>' : '<li>Nenhuma flecha de força encontrada.</li></ul>';
    htmlFraquezas += encontrouFraqueza ? '</ul>' : '<li>Nenhuma flecha de fraqueza encontrada.</li></ul>';
    arrowsAnalysisContainer.innerHTML = htmlForcas + htmlFraquezas + `<a href="flechas/arrows_index.html" target="_blank" class="more-info-link" style="margin-top:20px;">Saber mais sobre todas as Flechas</a>`;

    // --- 3. Analisa e Exibe os Números Repetidos (com verificação) ---
    const repeatedNumbersContainer = document.getElementById('repeatedNumbersAnalysis');
    if (!repeatedNumbersContainer) {
        console.error("ERRO: O elemento com ID 'repeatedNumbersAnalysis' não foi encontrado no seu HTML.");
        return;
    }
    let repeatedNumbersHtml = '';
    let hasRepeatedNumbers = false;
    for (const num in contagemDigitos) {
        const count = contagemDigitos[num];
        if (count > 1 && repeatedNumbersMeanings[num] && repeatedNumbersMeanings[num][count]) {
            repeatedNumbersHtml += `<details class="repeated-number-details"><summary>Você tem ${count} números '${num}' em sua data</summary><p>${repeatedNumbersMeanings[num][count]}</p></details>`;
            hasRepeatedNumbers = true;
        }
    }
    if (hasRepeatedNumbers) {
        repeatedNumbersContainer.innerHTML = `<hr><div class="result-section"><h4>Significado dos Números Repetidos na Grade</h4>${repeatedNumbersHtml}</div>`;
    } else {
        repeatedNumbersContainer.innerHTML = '';
    }

    // Exibe a div de resultados completa
    document.getElementById('flechasResult').style.display = 'block';
}


// --- Funções de Histórico e Configuração ---

function saveCurrentLaudo() {
    if (!currentLaudo) {
        alert('Nenhum laudo para salvar. Gere um laudo primeiro.');
        return;
    }
    const savedLaudos = JSON.parse(localStorage.getItem('numerologiaLaudos') || '[]');
    const isDuplicate = savedLaudos.some(l => l.nomeCompleto === currentLaudo.nomeCompleto && l.dataNascimento === currentLaudo.dataNascimento);
    if (!isDuplicate) {
        savedLaudos.push(currentLaudo);
        localStorage.setItem('numerologiaLaudos', JSON.stringify(savedLaudos));
        alert('Laudo salvo com sucesso!');
    } else {
        alert('Este laudo já está salvo!');
    }
}

function loadAndDisplayLaudos() {
    const laudosList = document.getElementById('laudosList');
    laudosList.innerHTML = '';
    const savedLaudos = JSON.parse(localStorage.getItem('numerologiaLaudos') || '[]');

    if (savedLaudos.length === 0) {
        laudosList.innerHTML = '<p>Nenhum laudo salvo ainda.</p>';
        return;
    }

    savedLaudos.forEach((laudo, index) => {
        const laudoItem = document.createElement('div');
        laudoItem.classList.add('laudo-item');
        laudoItem.innerHTML = `<div class="info"><h4>${laudo.nomeCompleto}</h4><p>Nasc: ${laudo.dataNascimento} | Destino: ${laudo.numeroDestino}</p></div><div class="actions"><button onclick="viewSavedLaudo(${index})">Ver</button><button class="delete-button" onclick="deleteSavedLaudo(${index})">Excluir</button></div>`;
        laudosList.appendChild(laudoItem);
    });
}

function viewSavedLaudo(index) {
    const savedLaudos = JSON.parse(localStorage.getItem('numerologiaLaudos') || '[]');
    if (index >= 0 && index < savedLaudos.length) {
        currentLaudo = savedLaudos[index];
        displayLaudoResult(currentLaudo);
    }
}

function deleteSavedLaudo(index) {
    if (confirm('Tem certeza que deseja excluir este laudo?')) {
        let savedLaudos = JSON.parse(localStorage.getItem('numerologiaLaudos') || '[]');
        savedLaudos.splice(index, 1);
        localStorage.setItem('numerologiaLaudos', JSON.stringify(savedLaudos));
        loadAndDisplayLaudos();
        alert('Laudo excluído!');
    }
}

function populateConversionTable() {
    const tableBody = document.querySelector('#conversionTable tbody');
    tableBody.innerHTML = '';
    const groupedByNumber = {};
    for (const letter in conversionTable) {
        const value = conversionTable[letter];
        if (!groupedByNumber[value]) groupedByNumber[value] = [];
        groupedByNumber[value].push(letter);
    }
    for (let i = 1; i <= 9; i++) {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = i;
        row.insertCell(1).textContent = (groupedByNumber[i] || []).sort().join(', ');
    }
}

function setupButton(buttonId, screenIdOrFunction) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', typeof screenIdOrFunction === 'function' ? screenIdOrFunction : () => showScreen(screenIdOrFunction));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupButton('btnNewLaudo', 'laudoInputScreen');
    setupButton('btnMyLaudos', 'historyScreen');
    setupButton('btnFlechas', 'flechasScreen');
    setupButton('btnConversionTable', 'conversionTableScreen');
    setupButton('btnInterpretations', 'numbers_index.html');
    setupButton('btnAbout', 'aboutScreen');
    setupButton('btnInputBackToHome', 'homeScreen');
    setupButton('btnResultBackToHome', 'homeScreen');
    setupButton('btnHistoryBackToHome', 'homeScreen');
    setupButton('btnTableBackToHome', 'homeScreen');
    setupButton('btnAboutBackToHome', 'homeScreen');
    setupButton('btnFlechasBackToHome', 'homeScreen');
    setupButton('btnSaveLaudo', saveCurrentLaudo);
    setupButton('btnNewCalculation', () => {
        document.getElementById('laudoForm').reset();
        showScreen('laudoInputScreen');
    });

    document.getElementById('laudoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
        const dataNascimento = document.getElementById('dataNascimento').value;
        if (!nomeCompleto || !dataNascimento) {
            alert('Por favor, preencha o nome completo e a data de nascimento.');
            return;
        }
        currentLaudo = calculateLaudo(
            nomeCompleto,
            dataNascimento,
            document.getElementById('endereco').value.trim(),
            document.getElementById('telefone').value.trim()
        );
        displayLaudoResult(currentLaudo);
    });

    document.getElementById('flechasForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const dataNascimento = document.getElementById('flechasDataNascimento').value;
        analisarFlechas(dataNascimento);
    });

    showScreen('homeScreen');
});
