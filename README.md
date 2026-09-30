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
