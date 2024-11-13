const numeros = document.querySelectorAll('.calculadora__numeros span');
const sinais = document.querySelectorAll('.calculadora__sinais span');
const extrabtn = document.querySelectorAll('.calculadora__extra span');
const displayNumber = document.querySelector('.caculadora__display span');
numeros.forEach((numeros)=>{
    numeros.addEventListener('click',(event)=>{
        var number = event.target.innerText;
        const currentText = displayNumber.innerText;
        const isLastCharSign = /[+\-*/]/.test(currentText.slice(-1)); // Verifica se o último caractere é um sinal
        if(number == "="){
            try {
                
                // Usa `eval` para avaliar a expressão atual
                const result = eval(currentText);
                displayNumber.innerText = result;
            } catch (error) {
                displayNumber.innerText = "Erro";
                console.error("Erro ao calcular a expressão:", error);
            }
            return
        };
        if (!isLastCharSign && currentText  === "0") {
            displayNumber.innerText = number
        }else{
            displayNumber.innerText += number
        }  
    })
    
})
sinais.forEach((sinal) => {
    sinal.addEventListener('click', (event) => {
        const currentText = displayNumber.innerText;
        const isLastCharSign = /[+\-*/]/.test(currentText.slice(-1)); // Verifica se o último caractere é um sinal
        const hasNumberBefore = /\d/.test(currentText); // Verifica se já tem um número
        switch (event.target.classList[0]) {
            case 'sy_divisao':
            case 'sy_mais':
            case 'sy_menos':
            case 'sy_vezes':
                if (isLastCharSign && hasNumberBefore) {
                    // Se o último caractere é um sinal, substitui pelo novo sinal
                    displayNumber.innerText = currentText.slice(0, -1) + event.target.innerText;
                        //Slice(start,end)
                }else if(!isLastCharSign && hasNumberBefore){
                    // Se o último caractere não é um sinal, adiciona o novo sinal
                    displayNumber.innerText += event.target.innerText;
                    }
                break;
            default:
                break;
        }
    });
});
extrabtn.forEach((extrabtn) => {
    extrabtn.addEventListener('click', (event) => {
        const currentText = displayNumber.innerText;
        const newInput = event.target.innerText;
        const isLastCharSign = /[+\-*/(]/.test(currentText.slice(-1)); // Verifica se o último caractere é um sinal ou parêntese aberto
        const hasNumberBefore = /\d/.test(currentText);
        switch (event.target.classList[0]) {
            case "sy_parentheses_open":
                // Permite abrir parêntese após um operador ou como o primeiro caractere
                if (isLastCharSign || currentText === "0") {
                    console.log(1)
                    if (currentText === "0") 
                        {
                        displayNumber.innerText = "("; // Substitui o 0 inicial
                        console.log(2)
                        }
                    else if(!currentText === "("){
                        displayNumber.innerText += "(";console.log(3)}
                }
                break;
            case "sy_parentheses_close":
                // Permite fechar parêntese se houver algum número antes
                const openCount = (currentText.match(/\(/g) || []).length;
                const closeCount = (currentText.match(/\)/g) || []).length;
                if (hasNumberBefore && openCount > closeCount) {
                    displayNumber.innerText += ")";
                }
                break;
            case 'sy_backspace':
                // Remove o último caractere ou define "0" se esvaziar o display
                if (currentText.length > 1) {
                    displayNumber.innerText = currentText.slice(0, -1);
                } else {
                    displayNumber.innerText = "0";
                }
                break;
            case 'sy_clear':
                // Limpa completamente o display e define para "0"
                displayNumber.innerText = "0";
                break;
            default:
                break;
        }
    });
});
