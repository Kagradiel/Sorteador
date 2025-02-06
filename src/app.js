import ptTranslations from './i18n/pt.json';
import enTranslations from './i18n/en.json';

const amigos = JSON.parse(localStorage.getItem("amigos")) || [];
let translations = {};

async function loadTranslations(lang) {
    let translations;
    if (lang === 'pt') {
        translations = ptTranslations;
    } else if (lang === 'en') {
        translations = enTranslations;
    } else {
        
        console.warn(`No translations found for language: ${lang}, falling back to english`);
        translations = enTranslations; 
    }
    return translations; 
}

async function initialize() {
     const lang = getPreferredLanguage();
     translations = await loadTranslations(lang); 
     updateText();
     atualizarLista();
 }

function translate(key, replacements = {}) {
    let translatedValue = translations[key] || key;

    for (const placeholder in replacements) {
        translatedValue = translatedValue.replace(
            `{${placeholder}}`,
            replacements[placeholder]
        );
    }

    return translatedValue;
}

function updateText() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
        const key = element.getAttribute("data-i18n");
        element.textContent = translate(key);
    });

    const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
    placeholderElements.forEach((element) => {
        const key = element.getAttribute("data-i18n-placeholder");
        element.placeholder = translate(key);
    });
}

function getPreferredLanguage() {

    const storedLanguage = localStorage.getItem("preferredLanguage");
    if (storedLanguage) {
        return storedLanguage;
    }

    return navigator.language.split('-')[0];
}


initialize();

function formatarNome(nome) {
    return nome.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();
    const errorElement = document.getElementById("amigo-error");
    errorElement.textContent = "";

    if (!nome.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)) {  
        errorElement.textContent = translate("errorMessageInvalidName");
        return;
    }

    const nomeFormatado = formatarNome(nome);
    if (!nome) {
        errorElement.textContent = translate("errorMessageEmptyName");
        return;
    }
    if (amigos.includes(nomeFormatado)) {
        errorElement.textContent = translate("errorMessageDuplicateName");
        return;
    }

    amigos.push(nomeFormatado);
    input.value = "";
    atualizarLista();
    salvarNoLocalStorage();
}

function sortearAmigo() {
    const resultadoContainer = document.getElementById("resultado-container");
    const errorElement = document.getElementById("amigo-error");

    if (amigos.length === 0) {
        errorElement.textContent = translate("errorMessageNoParticipants");

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
        btnEditar.textContent = translate("edit");
        btnEditar.classList.add("button-edit");
        btnEditar.onclick = () => editarAmigo(index, li, nameWrapper);

        const btnRemover = document.createElement("button");
        btnRemover.textContent = translate("remove");
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
    li.textContent = translate("friendDrawn", { name: sorteado });
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
    btnSalvar.textContent = translate("save");
    btnSalvar.classList.add("button-save");
    btnSalvar.onclick = () => salvarEdicao(index, nomeEditavel, li);

    const btnCancelar = document.createElement("button");
    btnCancelar.textContent = translate("cancel");
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

    if (!novoNome.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)) {  
        errorElement.textContent = translate("errorMessageInvalidName");
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

function loadAds() {
    const adsConfig = {
        "ad-unit-above-form": import.meta.env.VITE_AD_UNIT_ABOVE_FORM,
        "ad-unit-below-list": import.meta.env.VITE_AD_UNIT_BELOW_LIST,
        "ad-unit-below-button": import.meta.env.VITE_AD_UNIT_BELOW_BUTTON,
    };

    const adClient = import.meta.env.VITE_AD_CLIENT;

    Object.keys(adsConfig).forEach((id) => {
        const adUnit = document.getElementById(id);
        if (adUnit && adsConfig[id]) {
            // Verifica se já existe um anúncio para não inserir múltiplos
            if (!adUnit.querySelector("ins")) {
                adUnit.insertAdjacentHTML("beforeend", `
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="${adClient}"
                        data-ad-slot="${adsConfig[id]}"
                        data-ad-format="auto"></ins>
                `);
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadAds();

    const addFriendForm = document.getElementById("add-friend-form");
    addFriendForm.addEventListener("submit", (event) => {
        event.preventDefault();
        adicionarAmigo();
    });

    const sortearAmigoButton = document.getElementById("sortear-amigo");
    console.log("sortearAmigoButton:", sortearAmigoButton); 
    sortearAmigoButton.addEventListener("click", sortearAmigo);
});