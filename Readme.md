# Amigo Secreto

Este é um programa simples de **Amigo Secreto**, onde você pode adicionar, editar e remover amigos, além de sortear aleatoriamente um amigo secreto entre os participantes. Os dados da lista de amigos são armazenados no **localStorage**, o que garante que a lista persista entre as sessões do navegador.

## Funcionalidades

- **Adicionar amigos:** Insira o nome de seus amigos para participar do sorteio.
- **Editar amigos:** Modifique o nome de qualquer amigo da lista.
- **Remover amigos:** Exclua amigos da lista de participantes.
- **Sortear amigo secreto:** Realize o sorteio de um amigo secreto de maneira aleatória.
- **Persistência de dados:** Os dados dos amigos são armazenados no `localStorage`, garantindo que a lista de amigos seja preservada entre as sessões do navegador.

## Como usar

1. **Adicionar amigos:** No campo de entrada, digite o nome de um amigo e clique no botão "Adicionar". Apenas nomes válidos (somente letras) serão aceitos.
2. **Editar amigos:** Clique no botão "Editar" ao lado do nome de qualquer amigo da lista para alterá-lo.
3. **Remover amigos:** Clique no botão "Remover" ao lado do nome de qualquer amigo para removê-lo da lista.
4. **Sortear amigo secreto:** Após adicionar amigos, clique no botão "Sortear amigo" para realizar o sorteio. O nome do amigo sorteado será exibido na tela.

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