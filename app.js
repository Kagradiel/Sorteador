const amigos = JSON.parse(localStorage.getItem("amigos")) || [];

function formatarNome(nome) {
  return nome.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function adicionarAmigo() {
  const input = document.getElementById("amigo");
  const nome = input.value.trim();
  const errorElement = document.getElementById("amigo-error");
  errorElement.textContent = ""; 

  if (!nome.match(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/)) {
    errorElement.textContent =
      "Por favor, insira um nome válido (somente letras)!";
    return;
  }
  const nomeFormatado = formatarNome(nome);
  if (nome && !amigos.includes(nomeFormatado)) {
    amigos.push(nomeFormatado);
    input.value = "";
    atualizarLista();
    salvarNoLocalStorage();
  } else {
    errorElement.textContent = "Nome inválido ou já adicionado!";
  }
}

function sortearAmigo() {
  const resultadoContainer = document.getElementById("resultado-container");
  const errorElement = document.getElementById("amigo-error"); 

  if (amigos.length === 0) {
    errorElement.textContent =
      "Adicione pelo menos um amigo para o sorteio!"; 

    resultadoContainer.classList.remove("shake"); 
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "";
    return; 
  }

  errorElement.textContent = ""; 
  const sorteado = amigos[Math.floor(Math.random() * amigos.length)];
  exibirResultado(sorteado);

  resultadoContainer.classList.add("shake");

  setTimeout(() => {
    resultadoContainer.classList.remove("shake");
  }, 500);
}

function atualizarLista() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";

  amigos.forEach((amigo, index) => {
    const li = document.createElement("li");

    const nameWrapper = document.createElement("span");
    nameWrapper.textContent = amigo;
    nameWrapper.classList.add("name-text");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("button-edit");
    btnEditar.onclick = () => editarAmigo(index, li, nameWrapper);

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("button-remove");
    btnRemover.onclick = () => removerAmigo(index);

    buttonContainer.appendChild(btnEditar);
    buttonContainer.appendChild(btnRemover);

    li.appendChild(nameWrapper);
    li.appendChild(buttonContainer);
    lista.appendChild(li);
  });
}

function exibirResultado(sorteado) {
  const listaResultado = document.getElementById("resultado");
  listaResultado.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = `Amigo sorteado: ${sorteado}`;
  listaResultado.appendChild(li);
}

function salvarNoLocalStorage() {
  localStorage.setItem("amigos", JSON.stringify(amigos));
}


function editarAmigo(index, li, nameWrapper) {
  
  const nomeEditavel = document.createElement("input");
  nomeEditavel.type = "text";
  nomeEditavel.value = nameWrapper.textContent;
  nomeEditavel.classList.add("input-edit");

  
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  
  const btnSalvar = document.createElement("button");
  btnSalvar.textContent = "Salvar";
  btnSalvar.classList.add("button-save");
  btnSalvar.onclick = () => salvarEdicao(index, nomeEditavel, li);

  
  const btnCancelar = document.createElement("button");
  btnCancelar.textContent = "Cancelar";
  btnCancelar.classList.add("button-cancel");
  btnCancelar.onclick = () => cancelarEdicao(li, nameWrapper);

  
  buttonContainer.appendChild(btnSalvar);
  buttonContainer.appendChild(btnCancelar);

  li.innerHTML = "";
  li.appendChild(nomeEditavel);
  li.appendChild(buttonContainer);

  
  nomeEditavel.focus();
}

function salvarEdicao(index, nomeEditavel, li) {
  const novoNome = nomeEditavel.value.trim();
  const nomeFormatado = formatarNome(novoNome);
   const errorElement = document.getElementById("amigo-error");
    errorElement.textContent = "";

  if (!nomeFormatado.match(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/)) {
    errorElement.textContent = "Por favor, insira um nome válido (somente letras)!";
    nomeEditavel.focus();
    return;
  }

 
  amigos[index] = nomeFormatado;
  salvarNoLocalStorage();
  atualizarLista();
}

function cancelarEdicao(li, nameWrapper) {
  li.innerHTML = "";
  li.appendChild(nameWrapper);
  atualizarLista();
}

function removerAmigo(index) {
  amigos.splice(index, 1);
  atualizarLista();
  salvarNoLocalStorage();
}

atualizarLista();