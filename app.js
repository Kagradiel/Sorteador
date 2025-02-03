const amigos = JSON.parse(localStorage.getItem("amigos")) || [];

function formatarNome(nome) {
  return nome.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function adicionarAmigo() {
  const input = document.getElementById("amigo");
  const nome = input.value.trim();
  if (!nome.match(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/)) {
    alert("Por favor, insira um nome válido (somente letras)!");
    return;
  }
  const nomeFormatado = formatarNome(nome);
  if (nome && !amigos.includes(nomeFormatado)) {
    amigos.push(nomeFormatado);
    input.value = "";
    atualizarLista();
    salvarNoLocalStorage();
  } else {
    alert("Nome inválido ou já adicionado!");
  }
}

function atualizarLista() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";
  amigos.forEach((amigo, index) => {
    const li = document.createElement("li");

    const nameWrapper = document.createElement("div");
    nameWrapper.classList.add("name-wrapper");
    nameWrapper.textContent = amigo;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("button-edit");
    btnEditar.onclick = () => editarAmigo(index);

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("button-remove");
    btnRemover.onclick = () => removerAmigo(index);

    li.appendChild(nameWrapper);
    li.appendChild(btnEditar);
    li.appendChild(btnRemover);
    lista.appendChild(li);
  });
}

function removerAmigo(index) {
  amigos.splice(index, 1);
  atualizarLista();
  salvarNoLocalStorage();
}

function editarAmigo(index) {
  const novoNome = prompt("Edite o nome do amigo:", amigos[index]);
  if (novoNome) {
    const nomeFormatado = formatarNome(novoNome.trim());
    if (!nomeFormatado.match(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/)) {
      alert("Por favor, insira um nome válido (somente letras)!");
      return;
    }
    amigos[index] = nomeFormatado;
    atualizarLista();
    salvarNoLocalStorage();
  }
}

function sortearAmigo() {
  if (amigos.length === 0) {
    alert("Adicione pelo menos um amigo para o sorteio!");
    return;
  }
  const sorteado = amigos[Math.floor(Math.random() * amigos.length)];
  exibirResultado(sorteado);
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

atualizarLista();
