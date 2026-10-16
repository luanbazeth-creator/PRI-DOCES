# PRII DOCES — Site organizado

Este projeto foi separado para ficar fácil de editar no futuro.
O **site inicial** e o **cardápio** continuam sendo páginas diferentes, mas fazem parte do mesmo site.

## 📁 Estrutura do projeto

```text
PRII-DOCES/
│
├── index.html                  ← Página inicial / capa
├── cardapio.html               ← Página do cardápio
│
├── css/
│   ├── index.css               ← SOMENTE visual do index.html
│   └── cardapio.css            ← SOMENTE visual do cardapio.html
│
├── js/
│   └── cardapio.js              ← Carrinho, produtos, checkout e carrossel
│
├── assets/
│   ├── logo-prii-doces.png
│   ├── perfil.jpg
│   ├── selo-piu-doces.png
│   └── carousel/                ← Fotos usadas no carrossel
│
└── README.md                    ← Este guia
```

## 🎨 Onde mexer no visual

### Página inicial
Edite:
`css/index.css`

É aqui que estão as cores rosas, hero, botões, logo, seções e versão para celular do **index**.

### Cardápio
Edite:
`css/cardapio.css`

É aqui que estão as cores, produtos, categorias, carrossel, carrinho, modais e responsividade do **cardápio**.

## 🧠 Onde mexer nas funções

Edite:
`js/cardapio.js`

- Produtos → procure `const products`
- Contatos → procure `PRII_CONTACTS`
- Carrossel → procure `carouselItems`
- Carrinho → seção `CARRINHO`
- Checkout → seção `FINALIZAÇÃO / WHATSAPP`

## 🍰 Como adicionar foto ao carrossel

Coloque a foto em:
`assets/carousel/`

Depois abra `js/cardapio.js` e altere/adicione um item em `carouselItems`, por exemplo:

```js
{
  productId: 3,
  name: "Morango do Amor",
  category: "Doces",
  image: "assets/carousel/morango-do-amor.jpg",
  emoji: "🍓"
}
```

O `productId` precisa ser o mesmo `id` do produto dentro de `products`.

## 🔗 Como funciona a navegação

- `index.html` → página inicial
- Botão **Ver cardápio** → `cardapio.html`
- Botão **Início** no cardápio → `index.html`
- Clique em um item do carrossel → encontra o produto correspondente e leva até ele

## ⚠️ Regra para não bagunçar o projeto

Não coloque CSS dentro do HTML.
Não coloque JavaScript dentro do HTML.

Se for mudar o visual do index, use `css/index.css`.
Se for mudar o visual do cardápio, use `css/cardapio.css`.
Se for mudar uma função, use `js/cardapio.js`.

Assim o projeto fica muito mais fácil de manter e alterar.


## 🩷 Página inicial no estilo link-na-bio

A primeira tela agora é uma página compacta de links, inspirada em páginas de bio, com identidade rosa da PRII DOCES.

- `index.html`: textos, botões, categorias e informações de entrega/retirada.
- `css/index.css`: cores, tamanhos, fundo transparente decorativo e responsividade.
- `assets/perfil.jpg`: foto circular do perfil.
- `assets/logo-prii-doces.png`: logo transparente usada como marca d'água e assinatura.

### Links e informações para configurar

- No `index.html`, procure `https://www.instagram.com/` e substitua pelo link real do Instagram da PRII DOCES.
- Na seção `Pedido mínimo para entrega`, atualize o texto quando definir o valor mínimo exato.
- Ajuste as informações de frete e retirada no bloco `Entrega ou retirada?`.

### Categorias

Os atalhos da página inicial abrem o `cardapio.html` com a categoria selecionada pela URL. As categorias novas já aparecem no filtro do cardápio. Produtos que ainda não existem no cadastro não foram inventados; para adicioná-los, edite o array `products` em `js/cardapio.js` e use a categoria correspondente.
