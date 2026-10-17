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


## Atualização desta versão

- A página inicial usa fundo marrom escuro e as fotos reais `assets/estacao-acai.jpeg` e `assets/estacao-fondue.jpeg`.
- Para trocar as fotos das estações, substitua esses arquivos mantendo os mesmos nomes.
- Na finalização do pedido, o cliente escolhe **Entrega com frete** ou **Retirada no local**.
- O frete de entrega não é somado ao subtotal porque o valor depende da região; a mensagem do pedido informa que será confirmado pelo atendimento.
- Para retirada, não há taxa de entrega e o endereço fica opcional.
- O valor do frete pode ser definido no futuro quando a loja decidir uma taxa fixa ou uma regra por bairro.


## Atualização: taxa de entrega e fotos

- A terceira foto da estação está em `assets/estacao-fondue-experiencia.jpeg`.
- A taxa fixa de entrega está configurada em `js/cardapio.js`, na constante `DELIVERY_FEE` (R$ 3,00).
- No checkout, o resumo mostra subtotal dos produtos, taxa de entrega e total final.
- A retirada no local não cobra taxa.
- O total enviado no pedido pelo WhatsApp usa a mesma regra do checkout.


## Atualização: quantidade no card e fotos clicáveis

- Em `js/cardapio.js`, a função `getProductQuantity()` soma a quantidade de cada produto que já foi adicionada ao carrinho.
- O número aparece imediatamente antes do botão `+` em cada produto e é sincronizado sempre que o carrinho muda.
- Em `index.html`, as três fotos das estações ficam lado a lado. Cada uma abre o WhatsApp com uma mensagem educada já preenchida perguntando sobre disponibilidade do açaí ou do fondue.
- Os links das fotos usam `https://wa.me/?text=...`, então o WhatsApp abre com a mensagem pronta e permite escolher o contato. Para abrir diretamente a conversa da loja, substitua `wa.me/?text=` por `wa.me/SEUNUMERO?text=` em cada foto, usando o número oficial com DDI e DDD, somente números.


## Contatos oficiais configurados

- Instagram: https://www.instagram.com/priicardosodoces
- WhatsApp: +55 22 99960-9681 (link em formato internacional: `5522999609681`).

## Quantidade de doces personalizados

No modal de personalização, os botões `−` e `+` permitem escolher a quantidade antes de adicionar ao carrinho. Você pode adicionar a mesma combinação mais de uma vez (as quantidades são somadas) ou escolher combinações diferentes de sabor, recheio e finalização; cada combinação fica registrada separadamente no carrinho. Mesmo usando “Continuar sem personalizar”, a quantidade selecionada é respeitada.
