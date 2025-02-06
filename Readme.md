# Sorteador

Este é um programa simples de **Sorteio**, onde você pode adicionar, editar e remover nomes, além de sortear aleatoriamente um nome secreto entre os participantes. Os dados da lista de nomes são armazenados no **localStorage**, o que garante que a lista persista entre as sessões do navegador.

## Funcionalidades

- **Adicionar nomes:** Insira o nome de seus nomes para participar do sorteio.
- **Editar nomes:** Modifique o nome de qualquer amigo da lista.
- **Remover nomes:** Exclua nomes da lista de participantes.
- **Sortear nomes secreto:** Realize o sorteio de um nomes secreto de maneira aleatória.
- **Persistência de dados:** Os dados dos nomes são armazenados no `localStorage`, garantindo que a lista de nomes seja preservada entre as sessões do navegador.

## Como usar

1. **Adicionar nomes:** No campo de entrada, digite o nome de um amigo e clique no botão "Adicionar". Apenas nomes válidos (somente letras) serão aceitos.
2. **Editar nomes:** Clique no botão "Editar" ao lado do nome de qualquer amigo da lista para alterá-lo.
3. **Remover nomes:** Clique no botão "Remover" ao lado do nome de qualquer amigo para removê-lo da lista.
4. **Sortear nomes secreto:** Após adicionar nomes, clique no botão "Sortear nomes" para realizar o sorteio. O nome do amigo sorteado será exibido na tela.

## Tecnologias utilizadas

- **HTML**: Para estruturar o conteúdo da página.
- **CSS**: Para estilizar a página e criar o layout.
- **JavaScript**: Para adicionar funcionalidades dinâmicas e interatividade, como o sorteio e a persistência dos dados no `localStorage`.

## Estrutura do projeto

```bash
/amigo-secreto
├── index.html        # Estrutura HTML da página
├── style.css         # Estilos da página
├── app.js            # Lógica JavaScript para funcionalidades
├── assets/           # Imagens e ícones usados na página
```
### Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/amigo-secreto.git

2. Abra o arquivo <b>index.html</b> em seu navegador para usar a aplicação localmente.