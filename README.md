# PIU DOCES — SITE

## Estrutura do projeto

```text
piu-doces-site/
│
├── index.html          # Estrutura da página
├── style.css           # Visual e responsividade
├── script.js           # Produtos, filtros e carrinho
│
└── assets/
    ├── perfil.jpg      # Foto da dona
    └── selo-piu-doces.png
```

## Como abrir no Visual Studio

1. Extraia o ZIP.
2. Abra a pasta `piu-doces-site` no Visual Studio/VS Code.
3. Abra `index.html` no navegador.

## Onde mexer

### Produtos
Abra `script.js` e procure:

`01. DADOS DOS PRODUTOS`

Ali estão nome, categoria, preço, descrição e emoji de cada produto.

### Visual
Abra `style.css`.

O arquivo está dividido em seções numeradas para facilitar a localização.

### Estrutura da página
Abra `index.html`.

Também está dividido em seções com comentários.

## Categorias atuais

- Todos
- Brigadeiros
- Bolos
- Doces
- Kits

Os botões filtram os produtos sem recarregar a página.

## Próxima etapa

Este projeto ainda usa produtos locais no JavaScript.

Depois vamos conectar:

- Firebase Authentication
- Firestore
- Painel ADM
- Alteração de preço
- Produtos disponíveis/indisponíveis
- Horário de abertura e fechamento
- Upload de fotos
- Pedidos
- PWA do ADM


## V3
- Personalização opcional para brigadeiros e beijinho.
- Quantidade escolhida antes de adicionar.
- Adicionar ao carrinho não abre o painel automaticamente.
- Contador no topo mostra a quantidade total.
- Dinheiro mostra campo de troco e calcula o valor.
- Personalização e troco entram na mensagem do WhatsApp.


## V4 — Correção da personalização

- Corrigido o botão `Adicionar ao carrinho` da janela de personalização.
- Agora o item é realmente adicionado ao carrinho e a janela de personalização fecha.
- O carrinho não abre automaticamente.
- O contador no topo é atualizado.
- O botão secundário agora se chama `Continuar sem personalizar`.
- O botão secundário recebeu uma cor rosa suave, diferente do botão principal, mas dentro da identidade visual da loja.
- Também é possível fechar a personalização clicando fora da janela.

## V5
- Marca: PRII DOCES.
- Carrossel com avanço lento de 5,2 segundos.
- Clique em cada foto leva ao produto correspondente.
- Fotos fáceis de substituir em assets/carousel/.
- Pagamento em dinheiro mostra o campo "Troco para quanto?" e calcula o troco em tempo real.


### V6 — Nova tela de entrada
- Nova capa de abertura antes do site, inspirada na referência enviada.
- Fundo em rosa mais marcado que o cardápio, sem ficar igual à paleta da área de produtos.
- Logo enviada pela cliente aplicada no centro da capa.
- Três ações: Cardápio, WhatsApp e Instagram.
- Links de WhatsApp e Instagram ficam centralizados no objeto `PRII_CONTACTS` em `script.js`, para trocar facilmente quando a cliente enviar os dados reais.
- Logo tratada em PNG transparente em `assets/logo-prii-doces.png`.
