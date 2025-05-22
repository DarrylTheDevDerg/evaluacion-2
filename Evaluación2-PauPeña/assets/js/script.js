// Recoge una foto animada aleatoria de gato de la API.
async function fetchCat() {
    const catImg = document.getElementById('catImg');
    catImg.src = 'https://cataas.com/cat/gif?'+ new Date().getTime();
    catImg.alt = "Here's your random cat GIF!";
    catImg.style = "max-height: 300px;"
}

// Recoge una foto normal aleatoria de gato de la API.
async function fetchCatStatic() {
    const catImage = document.getElementById('catImage');
    catImage.src = 'https://cataas.com/cat?'+ new Date().getTime();
    catImage.alt = "Here's your random cat image!";
    catImage.style = "height: 300px;"
}

// Función principal de galería de cartas.
document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.getElementById('catGallery');

    

    // Consigue 10 gatos de una selección de entre 1050 gatos.
    async function fetchCatData(limit = 10) {
      try {
        const response = await fetch('https://cataas.com/api/cats?limit=1050');
        const allCats = await response.json();

        // Shuffle and select `limit` cats
        const shuffled = allCats.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, limit);
      } catch (error) {
        console.error('Error fetching cat data:', error);
        return [];
      }
    }

    // "Renderizado" / creación de las cartas usando estilizado Bootstrap y los datos previamente recogidos por la función anterior.
    function renderCatCards(cats) {
      gallery.innerHTML = ''; // Clear existing cards if any

      cats.forEach(cat => {
        const names = ["Cat.","Gato.","Catto.","Gatto."];

        const randomIndex = Math.floor(Math.random() * names.length);

        const chosenName = names[randomIndex];

        const col = document.createElement('div');

        col.className = 'col-sm-5 col-md-4 col-lg-3';

        const card = document.createElement('div');
        card.className = 'card h-100';
        card.style = "border-width: 20px; border-color: white;"

        const img = document.createElement('img');
        img.src = `https://cataas.com/cat/${cat.id}`;
        img.className = 'card-img-top img-fluid';
        img.alt = 'An image of a cat.';
        img.style = "height: 200px; object-fit: cover;"

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = chosenName;
        title.style = "text-align: center; font-weight: bolder;";

        const tags = document.createElement('p');
        tags.className = 'card-text';
        tags.textContent = cat.tags.length > 0
          ? `Tags: ${cat.tags.join(', ')}`
          : 'No tags available!';

        tags.style = "text-align: center;";

        cardBody.appendChild(title);
        cardBody.appendChild(tags);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        gallery.appendChild(col);
      });
    }

    // Inicialización cuando la página es abierta inmediatamente.
    const cats = await fetchCatData();
    renderCatCards(cats);
  });

  // Función usado para mostrar una foto filtrada por tag.
  async function showCat()
  {
    const tag = document.getElementById("tagInput").value.trim()
    const img = document.getElementById("caatImg")

    if (!tag)
    {
      alert("Cannot search without a tag!")
      return;
    }

    img.src = `https://cataas.com/cat/${tag}?timestamp=${Date.now()}`;
  }