// script.js
const form = document.getElementById('currency-form');
const resultDiv = document.getElementById('result');
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (!amount || amount <= 0) {
        resultDiv.textContent = 'Por favor, insira um valor válido.';
        return;
    }

    resultDiv.textContent = 'Carregando...';

    const apiKey = 'effd8959e2d6cedee6f525ac'; // Substitua pela sua chave da API
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            resultDiv.textContent = 'Erro ao carregar taxas de câmbio.';
            return;
        }

        const rate = data.rates[toCurrency];
        if (!rate) {
            resultDiv.textContent = 'Não foi possível encontrar a taxa de câmbio para a moeda selecionada.';
            return;
        }

        const convertedAmount = (amount * rate).toFixed(2);
        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        resultDiv.textContent = 'Erro ao se conectar à API. Tente novamente mais tarde.';
    }
});
