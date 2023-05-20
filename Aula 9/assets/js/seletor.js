 seletor = document.querySelector('#color'); // ler pelo id
 saida = document.querySelector('#saida')

 let colorInput = document.querySelector('#color');
 let saidaInput = document.querySelector('#saida');
 colorInput.addEventListener('input', () =>{
     let color = colorInput.value;
     saidaInput.value = color;
     document.body.style.backgroundColor = color;
     
});