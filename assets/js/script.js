// Recoge una foto animada aleatoria de gato de la API.
async function fetchCat() {
    const catImg = document.getElementById('catImg'); //
    catImg.src = 'https://cataas.com/cat/gif?'+ new Date().getTime();
    catImg.alt = "Here's your random cat GIF!";
    catImg.style = "max-height: 300px;"
}

// Recoge una foto normal aleatoria de gato de la API.
async function fetchCatStatic() {
    const catImage = document.getElementById('catImage'); // Recoge el elemento de la imagen donde se mostrará el gato.
    catImage.src = 'https://cataas.com/cat?'+ new Date().getTime(); // La foto del gato, aleatorio por el timestamp de tiempo usado.
    catImage.alt = "Here's your random cat image!"; // Texto alternativo para la imagen, en caso de que no se pueda cargar.
    catImage.style = "height: 300px;" // Limitador de la altura de la imagen, para que no se salga del contenedor.
}

// Función principal de galería de cartas.
document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.getElementById('catGallery');

    // Consigue 10 gatos de una selección de entre 1050 gatos.
    async function fetchCatData(limit = 10) {
      try {
        const response = await fetch('https://cataas.com/api/cats?limit=1050');
        const allCats = await response.json();

        // Mezcla los gatos y selecciona un número limitado de ellos, con la intención de que se muestren gatos diferentes cada vez.
        const shuffled = allCats.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, limit);
      } catch (error) {
        console.error('Error fetching cat data:', error);
        return [];
      } // Manejo de errores en caso de que falle la petición a la API.
    }

    // "Renderizado" / creación de las cartas usando estilizado Bootstrap y los datos previamente recogidos por la función anterior, juntandolo todo para que sea inyectado en la página y que se muestre como es deseado.
    function renderCatCards(cats) {
      gallery.innerHTML = ''; // Elimina el contenido previo de la galería.

      cats.forEach(cat => {
        const names = ["Cat.","Gato.","Catto.","Gatto.", "Kitty", "Kitten", "Kimty", "salad."]; // Lista de nombres aleatorios para los gatos.

        const randomIndex = Math.floor(Math.random() * names.length); // Escoge un indíce correspondiente a un nombre de la lista.

        const chosenName = names[randomIndex]; // Selección final del nombre de la carta del gato.

        const col = document.createElement('div'); // Crea un elemento div para la columna de Bootstrap.

        col.className = 'col-sm-5 col-md-4 col-lg-3'; // Usa clases de Bootstrap para el diseño responsivo.

        const card = document.createElement('div');
        card.className = 'card h-100';
        card.style = "border-width: 20px; border-color: white;" // Definición del estilo de la carta.

        const img = document.createElement('img');
        img.src = `https://cataas.com/cat/${cat.id}`;
        img.className = 'card-img-top img-fluid';
        img.alt = 'An image of a cat.';
        img.style = "height: 200px; object-fit: cover;" // Definición del estilo de la imagen de gato.

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body'; // Crea un elemento div para el cuerpo de la carta.

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = chosenName;
        title.style = "text-align: center; font-weight: bolder;"; // Definición del estilo del título de la carta.

        const tags = document.createElement('p');
        tags.className = 'card-text';
        tags.textContent = cat.tags.length > 0
          ? `Tags: ${cat.tags.join(', ')}`
          : 'No tags available!';

        tags.style = "text-align: center;"; // Definición del estilo de los tags de la carta, junto a una condicional en caso de que no hayan.

        cardBody.appendChild(title);
        cardBody.appendChild(tags);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        gallery.appendChild(col); // Combina todos los elementos creados y los añade a la galería.
      });
    }

    // Inicialización cuando la página es abierta inmediatamente.
    const cats = await fetchCatData();
    renderCatCards(cats);
  });

  // Función usado para mostrar una foto filtrada por tag.
  async function showCat()
  {
    const tag = document.getElementById("tagInput").value.trim() // Lee el valor del input de tag y elimina espacios al principio y al final.
    const img = document.getElementById("caatImg") // Recoge el elemento de la imagen donde se mostrará el gato filtrado.

    if (!tag)
    {
      alert("Cannot search without a tag!")
      return;
    } // Condicional para evitar que se busque un gato sin tag.

    img.src = `https://cataas.com/cat/${tag}?timestamp=${Date.now()}`; // La foto del gato, siempre diferente por el timestamp añadido al final.
  }