/*
=================================================================
ARQUIVO JAVASCRIPT DOCUMENTADO

Fluxo da aplicação:
1. Configurações
2. Produtos
3. Renderização
4. Carrinho
5. Eventos
6. Finalização do pedido

Adicione novas funções mantendo este padrão.
=================================================================
*/

/* ============================================================
   PIU DOCES | SCRIPT.JS
   Organização:
   01. Dados dos produtos
   02. Estado da aplicação
   03. Seletores do DOM
   04. Produtos / filtros
   05. Carrinho
   06. Painéis
   07. Finalização
   08. Inicialização

   IMPORTANTE:
   Depois vamos trocar o array local pelo Firestore.
   ============================================================ */


/* ============================================================
   01. DADOS DOS PRODUTOS
   ============================================================ */

const products = [
  {
    id: 1,
    name: "Brigadeiro Gourmet",
    category: "Brigadeiros",
    price: 4.50,
    description: "Brigadeiro cremoso com chocolate de qualidade.",
    emoji: "🍫",
    customizable: true
  },
  {
    id: 2,
    name: "Beijinho",
    category: "Brigadeiros",
    price: 4.50,
    description: "Docinho de coco delicado e cremoso.",
    emoji: "🥥",
    customizable: true
  },
  {
    id: 3,
    name: "Morango do Amor",
    category: "Doces",
    price: 12.00,
    description: "Morango envolvido em uma deliciosa cobertura.",
    emoji: "🍓"
  },
  {
    id: 4,
    name: "Brownie Gourmet",
    category: "Doces",
    price: 10.00,
    description: "Brownie macio, intenso e cheio de chocolate.",
    emoji: "🍫"
  },
  {
    id: 5,
    name: "Bolo de Pote",
    category: "Bolos",
    price: 14.00,
    description: "Camadas de bolo e recheio preparados na hora.",
    emoji: "🍰"
  },
  {
    id: 6,
    name: "Mini Bolo",
    category: "Bolos",
    price: 28.00,
    description: "Bolo delicado perfeito para presentear.",
    emoji: "🎂"
  },
  {
    id: 7,
    name: "Kit Festa",
    category: "Kits",
    price: 49.90,
    description: "Seleção especial de doces para sua comemoração.",
    emoji: "🎁"
  },
  {
    id: 8,
    name: "Caixa Especial",
    category: "Kits",
    price: 59.90,
    description: "Uma caixa linda com nossos doces favoritos.",
    emoji: "💝"
  }
];


/* ============================================================
   02. ESTADO DA APLICAÇÃO
   ============================================================ */

let cartItemsState = [];
let selectedCategory = "Todos";

let customizationState = { product: null, quantity: 1 };


/* ============================================================
   03. SELETORES DO DOM
   ============================================================ */

const elements = {
  products: document.getElementById("products"),
  searchInput: document.getElementById("searchInput"),
  resultCount: document.getElementById("resultCount"),

  cart: document.getElementById("cart"),
  overlay: document.getElementById("overlay"),
  cartItems: document.getElementById("cartItems"),
  cartCount: document.getElementById("cartCount"),
  cartTotal: document.getElementById("cartTotal"),
  checkoutButton: document.getElementById("checkout"),

  checkoutModal: document.getElementById("checkoutModal"),

  customizationModal: document.getElementById("customizationModal"),
  customProductEmoji: document.getElementById("customProductEmoji"),
  customProductName: document.getElementById("customProductName"),
  customProductDescription: document.getElementById("customProductDescription"),
  customFlavor: document.getElementById("customFlavor"),
  customFilling: document.getElementById("customFilling"),
  customTopping: document.getElementById("customTopping"),
  customQuantity: document.getElementById("customQuantity"),
  customQuantityMinus: document.getElementById("customQuantityMinus"),
  customQuantityPlus: document.getElementById("customQuantityPlus"),
  confirmCustomization: document.getElementById("confirmCustomization"),
  skipCustomization: document.getElementById("skipCustomization"),

  payment: document.getElementById("payment"),
  cashChangeBox: document.getElementById("cashChangeBox"),
  changeFor: document.getElementById("changeFor"),
  changePreview: document.getElementById("changePreview")
};


/* ============================================================
   04. PRODUTOS / FILTROS
   ============================================================ */

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


function getFilteredProducts() {
  const search = elements.searchInput.value
    .toLowerCase()
    .trim();

  return products.filter((product) => {

    const matchesCategory =
      selectedCategory === "Todos" ||
      product.category === selectedCategory;

    const searchableText = `
      ${product.name}
      ${product.category}
      ${product.description}
    `.toLowerCase();

    const matchesSearch =
      searchableText.includes(search);

    return matchesCategory && matchesSearch;
  });
}


function renderProducts() {
  const filteredProducts = getFilteredProducts();

  elements.resultCount.textContent =
    `${filteredProducts.length} produto${filteredProducts.length === 1 ? "" : "s"}`;

  if (!filteredProducts.length) {
    elements.products.innerHTML = `
      <p class="no-results">
        Nenhum produto encontrado. ♡
      </p>
    `;

    return;
  }

  elements.products.innerHTML = filteredProducts
    .map(createProductCard)
    .join("");
}


function createProductCard(product) {
  const customizationLabel = product.customizable
    ? `<small class="customizable-label">♡ Monte do seu jeito</small>`
    : "";

  return `
    <article class="product-card">

      <div class="product-image">
        ${product.emoji}
      </div>

      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>

        <h3>
          ${product.name}
        </h3>

        <p>
          ${product.description}
        </p>

        ${customizationLabel}

        <div class="product-bottom">

          <span class="product-price">
            ${formatCurrency(product.price)}
          </span>

          <button
            class="add-product"
            type="button"
            onclick="handleProductSelection(${product.id})"
            aria-label="Adicionar ${product.name}"
          >
            +
          </button>

        </div>

      </div>

    </article>
  `;
}


/* ============================================================
   05. CARRINHO
   ============================================================ */

function handleProductSelection(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  if (!product.customizable) {
    addToCart(product, 1, {});
    return;
  }
  openCustomization(product);
}

function openCustomization(product) {
  customizationState = { product, quantity: 1 };
  elements.customProductEmoji.textContent = product.emoji;
  elements.customProductName.textContent = product.name;
  elements.customProductDescription.textContent = "Monte do seu jeito. Todas as opções são opcionais.";
  elements.customFlavor.value = "";
  elements.customFilling.value = "";
  elements.customTopping.value = "";
  updateCustomizationQuantity();
  elements.customizationModal.classList.add("show");
}

function updateCustomizationQuantity() {
  elements.customQuantity.textContent = customizationState.quantity;
}

function getCustomizationData() {
  return {
    flavor: elements.customFlavor.value,
    filling: elements.customFilling.value,
    topping: elements.customTopping.value
  };
}

function getCustomizationLabel(customization) {
  const parts = [];
  if (customization.flavor) parts.push(`Sabor: ${customization.flavor}`);
  if (customization.filling) parts.push(`Recheio: ${customization.filling}`);
  if (customization.topping) parts.push(`Finalização: ${customization.topping}`);
  return parts.join(" • ");
}

function closeCustomization() {
  elements.customizationModal.classList.remove("show");
  customizationState = { product: null, quantity: 1 };
}

function confirmProductCustomization() {
  if (!customizationState.product) return;
  addToCart(customizationState.product, customizationState.quantity, getCustomizationData());
  closeCustomization();
}

function addCustomizedProductWithoutOptions() {
  if (!customizationState.product) return;
  addToCart(customizationState.product, 1, {});
  closeCustomization();
}

function createCartId(productId, customization) {
  return `${productId}-${JSON.stringify(customization)}`;
}

function addToCart(product, quantity = 1, customization = {}) {
  const cartId = createCartId(product.id, customization);
  const existingItem = cartItemsState.find((item) => item.cartId === cartId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItemsState.push({
      cartId, productId: product.id, name: product.name, category: product.category,
      price: product.price, emoji: product.emoji, quantity, customization
    });
  }
  renderCart();
  // O carrinho NÃO abre automaticamente. O cliente continua no cardápio.
}

function changeQuantity(cartId, amount) {
  const item = cartItemsState.find(
    (cartItem) => cartItem.cartId === cartId
  );

  if (!item) {
    return;
  }

  item.quantity += amount;

  if (item.quantity <= 0) {
    cartItemsState = cartItemsState.filter(
      (cartItem) => cartItem.cartId !== cartId
    );
  }

  renderCart();
}


function calculateCartTotal() {
  return cartItemsState.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );
}


function calculateCartQuantity() {
  return cartItemsState.reduce(
    (total, item) => total + item.quantity,
    0
  );
}


function renderCart() {
  const totalQuantity = calculateCartQuantity();
  const totalPrice = calculateCartTotal();

  elements.cartCount.textContent = totalQuantity;
  elements.cartTotal.textContent = formatCurrency(totalPrice);

  elements.checkoutButton.disabled =
    cartItemsState.length === 0;


  if (!cartItemsState.length) {
    elements.cartItems.innerHTML = `
      <div class="empty-cart">

        <div class="empty-icon">
          🧁
        </div>

        <h3>
          Seu carrinho está vazio
        </h3>

        <p>
          Adicione um docinho para começar.
        </p>

      </div>
    `;

    return;
  }


  elements.cartItems.innerHTML =
    cartItemsState
      .map(createCartItem)
      .join("");
}


function createCartItem(item) {
  const customizationLabel = getCustomizationLabel(item.customization);
  return `
    <div class="cart-item">
      <div class="cart-item-image">${item.emoji}</div>
      <div>
        <h4>${item.name}</h4>
        <p>${formatCurrency(item.price)} cada</p>
        ${customizationLabel ? `<p class="cart-customization">${customizationLabel}</p>` : ""}
        <div class="quantity-controls">
          <button type="button" onclick="changeQuantity('${item.cartId}', -1)">−</button>
          <strong>${item.quantity}</strong>
          <button type="button" onclick="changeQuantity('${item.cartId}', 1)">+</button>
        </div>
      </div>
      <strong>${formatCurrency(item.price * item.quantity)}</strong>
    </div>
  `;
}


/* ============================================================
   06. PAINÉIS
   ============================================================ */

function openCart() {
  elements.cart.classList.add("open");
  elements.overlay.classList.add("show");
}


function closeCart() {
  elements.cart.classList.remove("open");
  elements.overlay.classList.remove("show");
}


function openCheckoutModal() {
  if (!cartItemsState.length) {
    return;
  }

  elements.checkoutModal.classList.add("show");
}


function closeCheckoutModal() {
  elements.checkoutModal.classList.remove("show");
}


/* ============================================================
   PAGAMENTO / TROCO
   ============================================================ */

function updatePaymentFields() {
  const isCash = elements.payment.value === "Dinheiro";
  elements.cashChangeBox.hidden = !isCash;
  if (!isCash) {
    elements.changeFor.value = "";
    elements.changePreview.textContent = "Informe o valor que você vai entregar.";
    elements.changePreview.className = "change-preview";
  } else {
    updateChangePreview();
  }
}

function updateChangePreview() {
  if (elements.payment.value !== "Dinheiro") return;
  const amount = Number(elements.changeFor.value);
  const total = calculateCartTotal();
  if (!amount) {
    elements.changePreview.textContent = "Informe o valor que você vai entregar.";
    elements.changePreview.className = "change-preview";
    return;
  }
  if (amount < total) {
    elements.changePreview.textContent = `O valor precisa ser igual ou maior que ${formatCurrency(total)}.`;
    elements.changePreview.className = "change-preview invalid";
    return;
  }
  elements.changePreview.textContent = `Troco: ${formatCurrency(amount - total)}`;
  elements.changePreview.className = "change-preview valid";
}

function getChangeForValue() {
  if (elements.payment.value !== "Dinheiro") return null;
  const amount = Number(elements.changeFor.value);
  return amount && amount >= calculateCartTotal() ? amount : null;
}

/* ============================================================
   07. FINALIZAÇÃO / WHATSAPP
   ============================================================ */

function sendOrderToWhatsApp() {
  const name =
    document.getElementById("customerName").value.trim();

  const payment =
    document.getElementById("payment").value;

  const address =
    document.getElementById("address").value.trim();


  if (!name || !address) {
    alert("Preencha seu nome e endereço/observação.");
    return;
  }


  /*
    ATENÇÃO:
    Na próxima etapa coloque aqui o WhatsApp real da loja.

    Exemplo:
    const whatsappNumber = "5522999999999";
  */

    const whatsappNumber = PRII_CONTACTS.whatsapp || "5522999609681";


  const orderItems = cartItemsState
    .map((item) => {
      return `• ${item.quantity}x ${item.name} — ${formatCurrency(item.price * item.quantity)}`;
    })
    .join("\n");


  const message = `
🍰 *NOVO PEDIDO — PRII DOCES*

👤 Nome: ${name}

🧁 *Pedido:*
${orderItems}

💰 *Total:* ${formatCurrency(calculateCartTotal())}

💳 *Pagamento:* ${payment}

📍 *Endereço / observação:*
${address}
  `.trim();


  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
}


/* ============================================================
   EVENTOS DA PERSONALIZAÇÃO
   ============================================================ */

/*
   Na V3 o modal abria, mas os botões internos não tinham
   seus eventos conectados. Aqui fazemos essa ligação.
*/

elements.closeCustomization =
  document.getElementById("closeCustomization");

elements.closeCustomization.addEventListener(
  "click",
  closeCustomization
);


elements.customizationModal.addEventListener(
  "click",
  (event) => {
    if (event.target === elements.customizationModal) {
      closeCustomization();
    }
  }
);


elements.confirmCustomization.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    confirmProductCustomization();
  }
);

elements.skipCustomization.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    addCustomizedProductWithoutOptions();
  }
);

elements.customQuantityMinus.addEventListener(
  "click",
  () => {
    customizationState.quantity =
      Math.max(1, customizationState.quantity - 1);

    updateCustomizationQuantity();
  }
);

elements.customQuantityPlus.addEventListener(
  "click",
  () => {
    customizationState.quantity += 1;
    updateCustomizationQuantity();
  }
);


/* ============================================================
   08. EVENTOS
   ============================================================ */

document
  .getElementById("openCart")
  .addEventListener("click", openCart);


document
  .getElementById("closeCart")
  .addEventListener("click", closeCart);


elements.overlay.addEventListener(
  "click",
  closeCart
);


elements.searchInput.addEventListener(
  "input",
  renderProducts
);


document
  .getElementById("categories")
  .addEventListener("click", (event) => {

    if (!event.target.matches(".category-button")) {
      return;
    }

    document
      .querySelectorAll(".category-button")
      .forEach((button) => {
        button.classList.remove("active");
      });


    event.target.classList.add("active");

    selectedCategory =
      event.target.dataset.category;


    renderProducts();
  });


elements.checkoutButton.addEventListener(
  "click",
  openCheckoutModal
);


document
  .getElementById("closeCheckout")
  .addEventListener("click", closeCheckoutModal);


document
  .getElementById("whatsappOrder")
  .addEventListener("click", sendOrderToWhatsApp);


/* ============================================================
   09. INICIALIZAÇÃO
   ============================================================ */

renderProducts();
renderCart();


/* ================= PRII DOCES | LINKS DA CAPA ================= */
const PRII_CONTACTS = {
  // Coloque o número com DDI + DDD, somente números. Ex.: 5522999999999
  whatsapp: "",
  // Ex.: https://www.instagram.com/seuusuario/
  instagram: ""
};

function setupWelcomeLinks() {
  const whatsappButton = document.getElementById("welcomeWhatsApp");
  const instagramButton = document.getElementById("welcomeInstagram");

  if (whatsappButton) {
    whatsappButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (!PRII_CONTACTS.whatsapp) {
        alert("O WhatsApp ainda não foi configurado. Me passe o número da loja para eu colocar o link.");
        return;
      }
      window.open(`https://wa.me/${PRII_CONTACTS.whatsapp}`, "_blank");
    });
  }

  if (instagramButton) {
    instagramButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (!PRII_CONTACTS.instagram) {
        alert("O Instagram ainda não foi configurado. Me passe o @ da loja para eu colocar o link.");
        return;
      }
      window.open(PRII_CONTACTS.instagram, "_blank");
    });
  }
}

setupWelcomeLinks();

/* ================= PRII DOCES V5 ================= */
const carouselItems=[
 {productId:1,name:"Brigadeiro Gourmet",category:"Brigadeiros",image:"assets/carousel/brigadeiro.jpg",emoji:"🍫"},
 {productId:2,name:"Beijinho",category:"Brigadeiros",image:"assets/carousel/beijinho.jpg",emoji:"🥥"},
 {productId:3,name:"Morango do Amor",category:"Doces",image:"assets/carousel/morango-do-amor.jpg",emoji:"🍓"},
 {productId:5,name:"Bolo de Pote",category:"Bolos",image:"assets/carousel/bolo-de-pote.jpg",emoji:"🍰"},
 {productId:7,name:"Kit Festa",category:"Kits",image:"assets/carousel/kit-festa.jpg",emoji:"🎁"}
];
let carouselIndex=0,carouselTimer=null;
function renderCarousel(){
 const t=document.getElementById("carouselTrack"),d=document.getElementById("carouselDots");
 if(!t||!d)return;
 t.innerHTML=carouselItems.map(x=>`<article class="carousel-card" tabindex="0" data-product-id="${x.productId}"><img src="${x.image}" alt="${x.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="carousel-placeholder" style="display:none">${x.emoji}</div><div class="carousel-card-info"><small>${x.category}</small><strong>${x.name}</strong></div></article>`).join("");
 d.innerHTML=carouselItems.map((_,i)=>`<button class="carousel-dot ${i===0?"active":""}" data-carousel-index="${i}" type="button"></button>`).join("");
}
function updateCarousel(){
 const t=document.getElementById("carouselTrack"),v=document.getElementById("carouselWindow"),c=t?.querySelector(".carousel-card");
 if(!t||!v||!c)return;
 const w=c.getBoundingClientRect().width,g=parseFloat(getComputedStyle(t).gap)||0;
 const off=Math.min(carouselIndex*(w+g),Math.max(0,t.scrollWidth-v.clientWidth));
 t.style.transform=`translate3d(${-off}px,0,0)`;
 document.querySelectorAll(".carousel-dot").forEach((d,i)=>d.classList.toggle("active",i===carouselIndex));
}
function goCarousel(i){carouselIndex=(i+carouselItems.length)%carouselItems.length;updateCarousel()}
function startCarousel(){clearInterval(carouselTimer);carouselTimer=setInterval(()=>goCarousel(carouselIndex+1),5200)}
function setupCarousel(){
 const t=document.getElementById("carouselTrack"),v=document.getElementById("carouselWindow");
 if(!t||!v)return;
 document.getElementById("carouselPrev").onclick=()=>{goCarousel(carouselIndex-1);startCarousel()};
 document.getElementById("carouselNext").onclick=()=>{goCarousel(carouselIndex+1);startCarousel()};
 t.onclick=e=>{const c=e.target.closest(".carousel-card");if(!c)return;const p=products.find(x=>x.id===Number(c.dataset.productId));if(!p)return;selectedCategory=p.category;elements.searchInput.value="";renderProducts();setTimeout(()=>{const target=document.querySelector(`.product-card[data-product-id="${p.id}"]`);target?.scrollIntoView({behavior:"smooth",block:"center"});target?.classList.add("product-highlight");setTimeout(()=>target?.classList.remove("product-highlight"),1800)},80)};
 document.getElementById("carouselDots").onclick=e=>{const d=e.target.closest(".carousel-dot");if(d){goCarousel(Number(d.dataset.carouselIndex));startCarousel()}};
 v.onmouseenter=()=>clearInterval(carouselTimer);v.onmouseleave=startCarousel;
}
function updatePaymentFieldsV5(){
 const cash=elements.payment.value==="Dinheiro";
 elements.cashChangeBox.hidden=!cash;
 if(!cash)elements.changeFor.value="";
 updateChangePreviewV5();
}
function updateChangePreviewV5(){
 if(elements.payment.value!=="Dinheiro")return;
 const amount=Number(elements.changeFor.value.replace(",",".")),total=calculateCartTotal();
 if(!elements.changeFor.value||!Number.isFinite(amount)||amount<=0){elements.changePreview.textContent="Digite quanto o cliente vai entregar.";elements.changePreview.className="change-preview";return}
 if(amount<total){elements.changePreview.textContent=`Valor insuficiente. Faltam ${formatCurrency(total-amount)}.`;elements.changePreview.className="change-preview invalid";return}
 elements.changePreview.textContent=`Troco: ${formatCurrency(amount-total)}`;elements.changePreview.className="change-preview valid";
}
function initV5(){
 renderCarousel();setupCarousel();updatePaymentFieldsV5();updateCarousel();startCarousel();
 elements.payment.addEventListener("change",updatePaymentFieldsV5);
 elements.changeFor.addEventListener("input",updateChangePreviewV5);
 document.querySelectorAll(".product-card").forEach(c=>{if(c.dataset.productId)return});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initV5);else initV5();

const _priiObserver=new MutationObserver(()=>{
 const cards=document.querySelectorAll(".product-card");
 cards.forEach(card=>{
   if(card.dataset.productId)return;
   const buttons=card.querySelectorAll("button");
   const add=buttons[buttons.length-1];
   const txt=card.textContent||"";
   const p=products.find(x=>txt.includes(x.name));
   if(p)card.dataset.productId=p.id;
 });
});
_priiObserver.observe(document.body,{childList:true,subtree:true});
