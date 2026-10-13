let cart = [];

// 1. CONTROL DE CANTIDAD Y BOTÓN AGREGAR
document.querySelectorAll(".card").forEach(card => {
    const minus = card.querySelector(".minus");
    const plus = card.querySelector(".plus");
    const count = card.querySelector(".count");
    const addBtn = card.querySelector(".add");

    let quantity = 1;

    // Botón +
    plus.addEventListener("click", () => {
        quantity++;
        count.textContent = quantity;
    });

    // Botón -
    minus.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            count.textContent = quantity;
        }
    });

    // Acción de agregar al carrito
    addBtn.addEventListener("click", () => {
        const name = card.querySelector(".title").textContent;
        const price = card.querySelector(".price").textContent;

        // Buscamor si el producto ya existe en el carrito para sumar la cantidad
        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }

        alert(`¡Añadido! ${quantity} par(es) de ${name}`);
        renderCart();
        
        // Reiniciar contador visual a 1
        quantity = 1;
        count.textContent = quantity;
    });
});

// 2. MOSTRAR U OCULTAR PANEL DEL CARRITO
const cartIcon = document.querySelector(".cart");
const cartPanel = document.getElementById("cartPanel");

if(cartIcon) {
    cartIcon.addEventListener("click", (e) => {
        e.stopPropagation(); 
        const isVisible = cartPanel.style.display === "block";
        cartPanel.style.display = isVisible ? "none" : "block";
    });
}

// Cerrar carrito si se hace clic fuera de él
document.addEventListener("click", (event) => {
    if (!cartPanel.contains(event.target) && event.target !== cartIcon) {
        cartPanel.style.display = "none";
    }
});

// 3. RENDERIZAR EL CARRITO
function renderCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<li style='justify-content:center; color:#aaa;'>Tu carrito está vacío 🎀</li>";
        return;
    }

    cart.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <span class="prod-info">${product.name}</span><br>
                <small>Cantidad: ${product.quantity}</small>
            </div>
            <span class="prod-price">${product.price}</span>
        `;
        cartItems.appendChild(li);
    });
}

// 4. CAPTURA DEL FORMULARIO 
const formulario = document.getElementById("miFormulario");

if (formulario) {
    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); 

        // Capturar los datos usando FormData
        const formData = new FormData(formulario);
        
        // Crear un objeto con los valores
        const datosUsuario = {
            nombre: formData.get("nombre"),
            correo: formData.get("correo"),
            telefono: formData.get("telefono"),
            fechaInteres: formData.get("fecha"),
            motivo: formData.get("motivo"),
            comentario: formData.get("comentario"),
            terminos: formData.get("terminos") === "on" ? true : false,
            origen: formData.get("origen"),
            presupuesto: formData.get("presupuesto"),
            // Lcheckboxes múltiples 
            estilos: formData.getAll("estilo") 
        };
        localStorage.setItem("datosRegistrados", JSON.stringify(datosUsuario));

        //  Resultado en la consola
        console.log("¡Datos capturados con éxito!", datosUsuario);

        // Feedback visual al usuario
        alert(`¡Gracias ${datosUsuario.nombre}! Hemos recibido tu mensaje sobre: "${datosUsuario.motivo}". Nos comunicaremos a ${datosUsuario.correo}.`);
        
        // Limpiar el formulario
        formulario.reset();
    });
}

// 5. CONSUMO DE API 
const contenedorTestimonios = document.getElementById("contenedor-testimonios");

if (contenedorTestimonios) {
    obtenerTestimonios();
}

function obtenerTestimonios() {
    // Llamada a la API externa de usuarios aleatorios
    fetch("https://randomuser.me/api/?results=3&gender=female")
        .then(response => response.json())
        .then(data => {
            // Limpiamos el texto provisional de "Cargando..."
            contenedorTestimonios.innerHTML = "";

            // Textos predefinidos para simular las opiniones de la tienda
            const comentariosModa = [
                "¡Los tacones de aguja que compré son un sueño! Cómodos y super estilizados. Volveré a comprar sin duda.",
                "La plataforma tiene una estabilidad increíble. Me pasé toda la fiesta bailando y ni los sentí. ¡10/10!",
                "Excelente atención al cliente por correo y el empaque es hermoso. Los tacones de gatito son perfectos para la oficina."
            ];

            // Recorrer los 3 resultados devueltos por la API
            data.results.forEach((usuario, indice) => {
                const nombreCompleto = `${usuario.name.first} ${usuario.name.last}`;
                const fotoPerfil = usuario.picture.large;
                const pais = usuario.location.country;
                const comentario = comentariosModa[indice];

                // Contenedor de la tarjeta individual
                const tarjetaTestimonio = document.createElement("div");
                tarjetaTestimonio.classList.add("tarjeta-api-cliente");

                // Estructurar el contenido HTML interno
                tarjetaTestimonio.innerHTML = `
                    <img src="${fotoPerfil}" alt="${nombreCompleto}" class="foto-api-cliente">
                    <p class="nombre-api-cliente">${nombreCompleto}</p>
                    <small class="pais-api-cliente">📍 ${pais}</small>
                    <p class="texto-api-cliente">"${comentario}"</p>
                    <div class="estrellas-api-cliente">⭐⭐⭐⭐⭐</div>
                `;

                // Agregar las tarjetas dento del contenedor principal
                contenedorTestimonios.appendChild(tarjetaTestimonio);
            });
        })
      

        .catch(error => {
            console.error("Error al traer datos de la API:", error);
            contenedorTestimonios.innerHTML = "<p>No pudimos cargar las reseñas en este momento</p>";
        });
}
    