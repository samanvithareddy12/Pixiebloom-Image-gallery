const categories = {
  "Flowers": [
    ["Rose Garden", "photo-1490750967868-88aa4486c946"],
    ["Pink Blossoms", "photo-1494972308805-463bc619d34e"],
    ["Spring Flowers", "photo-1499002238440-d264edd596ec"],
    ["Flower Field", "photo-1462275646964-a0e3386b89fa"],
    ["Purple Petals", "photo-1468327768560-75b778cbb551"]
  ],
  "Floral Designs": [
    ["Floral Art", "photo-1490750967868-88aa4486c946"],
    ["Garden Patterns", "photo-1499002238440-d264edd596ec"],
    ["Botanical Beauty", "photo-1468327768560-75b778cbb551"],
    ["Bloom Collection", "photo-1462275646964-a0e3386b89fa"],
    ["Petal Inspiration", "photo-1494972308805-463bc619d34e"]
  ],
  "Travel": [
    ["Mountain Escape", "photo-1464822759023-fed622ff2c3b"],
    ["Coastal Journey", "photo-1519046904884-53103b34b206"],
    ["Road Trip", "photo-1469854523086-cc02fe5d8800"],
    ["Adventure Time", "photo-1472396961693-142e6e269027"],
    ["Wander Often", "photo-1500530855697-b586d89ba3ee"]
  ],
  "Tourism": [
    ["Tropical Escape", "photo-1510414842594-a61c69b5ae57"],
    ["Island Holiday", "photo-1500375592092-40eb2168fd21"],
    ["City Discovery", "photo-1519501025264-65ba15a82390"],
    ["Scenic Views", "photo-1470770841072-f978cf4d019e"],
    ["Nature Retreat", "photo-1441974231531-c6227db76b6e"]
  ],
  "Hotels": [
    ["Luxury Stay", "photo-1566073771259-6a8506099945"],
    ["Poolside Escape", "photo-1571896349842-33c89424de2d"],
    ["Modern Suite", "photo-1611892440504-42a792e24d32"],
    ["Coastal Resort", "photo-1542314831-068cd1dbfeeb"],
    ["Dream Destination", "photo-1564501049412-61c2a3083791"]
  ],
  "Food": [
    ["Delicious Pasta", "photo-1473093295043-cdd812d0e601"],
    ["Fresh Breakfast", "photo-1490645935967-10de6ba17061"],
    ["Sweet Treats", "photo-1488477181946-6428a0291777"],
    ["Pizza Night", "photo-1513104890138-7c749659a591"],
    ["Healthy Bowl", "photo-1512621776951-a57141f2eefd"]
  ],
  "Beautiful Places": [
    ["Lake Serenity", "photo-1470770841072-f978cf4d019e"],
    ["Mountain Dreams", "photo-1464822759023-fed622ff2c3b"],
    ["Golden Sunset", "photo-1470252649378-9c29740c9fa8"],
    ["Forest Calm", "photo-1441974231531-c6227db76b6e"],
    ["Ocean Blue", "photo-1500375592092-40eb2168fd21"]
  ],
  "Countries": [
    ["Japan Inspiration", "photo-1493976040374-85c8e12f0c0e"],
    ["Italian Streets", "photo-1516483638261-f4dbaf036963"],
    ["Paris Memories", "photo-1502602898657-3e91760cbb34"],
    ["Swiss Mountains", "photo-1531366936337-7c912a4589a7"],
    ["Greek Islands", "photo-1533105079780-92b9be482077"]
  ],
  "Cosmetics": [
    ["Beauty Essentials", "photo-1596462502278-27bfdc403348"],
    ["Makeup Collection", "photo-1522335789203-aabd1fc54bc9"],
    ["Skincare Ritual", "photo-1608248543803-ba4f8c70ae0b"],
    ["Beauty Products", "photo-1571781926291-c477ebfd024b"],
    ["Glow Routine", "photo-1556229010-6c3f2c9ca5f8"]
  ],
  "Footwear": [
    ["Classic Sneakers", "photo-1542291026-7eec264c27ff"],
    ["Street Style", "photo-1543163521-1bf539c55dd2"],
    ["Everyday Shoes", "photo-1549298916-b41d501d3772"],
    ["Fashion Steps", "photo-1515347619252-60a4bf4fff4f"],
    ["Sneaker Culture", "photo-1460353581641-37baddab0fa2"]
  ],
  "Fashion": [
    ["Elegant Style", "photo-1483985988355-763728e1935b"],
    ["Modern Outfit", "photo-1490481651871-ab68de25d43d"],
    ["Fashion Mood", "photo-1485230895905-ec40ba36b9bc"],
    ["Chic Wardrobe", "photo-1434389677669-e08b4cac3105"],
    ["Street Fashion", "photo-1529139574466-a303027c1d8b"]
  ],
  "Nature": [
    ["Green Forest", "photo-1441974231531-c6227db76b6e"],
    ["Wildlife World", "photo-1472396961693-142e6e269027"],
    ["Peaceful Lake", "photo-1470770841072-f978cf4d019e"],
    ["Sunlit Trees", "photo-1448375240586-882707db888b"],
    ["Wild Horizons", "photo-1500530855697-b586d89ba3ee"]
  ],
  "Architecture": [
    ["Modern Lines", "photo-1487958449943-2429e8be8625"],
    ["City Structures", "photo-1486406146926-c627a92ad1ab"],
    ["Historic Beauty", "photo-1511818966892-d7d671e672a2"],
    ["Urban Design", "photo-1511818966892-d7d671e672a2"],
    ["Minimal Spaces", "photo-1600210492486-724fe5c67fb0"]
  ]
};

const galleryGrid = document.getElementById("galleryGrid");
const searchInput = document.getElementById("searchInput");
const imageCount = document.getElementById("imageCount");
const sectionTitle = document.getElementById("sectionTitle");
const emptyMessage = document.getElementById("emptyMessage");
const toast = document.getElementById("toast");

let selectedCategory = "All";
let showFavourites = false;
let favourites = new Set();
let savedImages = new Set();
let toastTimer;

const images = Object.entries(categories).flatMap(([category, items]) =>
  items.map(([title, photo], index) => ({
    id: `${category}-${index}`,
    category,
    title,
    url: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=800&q=85`
  }))
);

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function safeName(value) {
  return value.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeButton(symbol, label, active, callback) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `action-btn${active ? " favorited" : ""}`;
  button.textContent = symbol;
  button.title = label;
  button.setAttribute("aria-label", label);
  button.addEventListener("click", callback);
  return button;
}

function renderGallery() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = images.filter(image => {
    const categoryMatch =
      selectedCategory === "All" ||
      image.category === selectedCategory;

    const searchMatch =
      `${image.title} ${image.category}`.toLowerCase().includes(query);

    const favouriteMatch =
      !showFavourites || favourites.has(image.id);

    return categoryMatch && searchMatch && favouriteMatch;
  });

  galleryGrid.innerHTML = "";

  sectionTitle.textContent = showFavourites
    ? "Your Favourites"
    : selectedCategory === "All"
      ? "Explore the Gallery"
      : selectedCategory;

  imageCount.textContent = `${filtered.length} images`;
  emptyMessage.hidden = filtered.length !== 0;

  filtered.forEach(image => {
    const card = document.createElement("article");
    card.className = "image-card";

    const wrap = document.createElement("div");
    wrap.className = "image-wrap";

    const img = document.createElement("img");
    img.src = image.url;
    img.alt = image.title;
    img.loading = "lazy";

    img.onerror = () => {
      img.onerror = null;
      img.src =
        "https://placehold.co/800x600/24221e/d8b68a?text=PixieBloom";
      img.alt = `${image.title} image unavailable`;
    };

    const actions = document.createElement("div");
    actions.className = "image-actions";

    const favButton = makeButton(
      favourites.has(image.id) ? "♥" : "♡",
      favourites.has(image.id)
        ? "Remove from favourites"
        : "Add to favourites",
      favourites.has(image.id),
      () => {
        if (favourites.has(image.id)) {
          favourites.delete(image.id);
          notify("Removed from favourites");
        } else {
          favourites.add(image.id);
          notify("Added to favourites ♥");
        }
        renderGallery();
      }
    );

    const saveButton = makeButton(
      savedImages.has(image.id) ? "✓" : "▣",
      "Save image details",
      savedImages.has(image.id),
      () => {
        savedImages.add(image.id);

        const saved = {
          website: "PixieBloom",
          title: image.title,
          category: image.category,
          imageUrl: image.url
        };

        const blob = new Blob(
          [JSON.stringify(saved, null, 2)],
          { type: "application/json" }
        );

        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = `${safeName(image.title)}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(objectUrl);

        renderGallery();
        notify("Image details saved!");
      }
    );

    const downloadButton = makeButton(
      "↓",
      "Download image",
      false,
      async () => {
        try {
          const response = await fetch(image.url);
          if (!response.ok) throw new Error("Download failed");

          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");

          link.href = objectUrl;
          link.download = `${safeName(image.title)}.jpg`;
          document.body.appendChild(link);
          link.click();
          link.remove();

          setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
          notify("Download started!");
        } catch {
          window.open(image.url, "_blank", "noopener");
          notify("Image opened in a new tab.");
        }
      }
    );

    const shareButton = makeButton(
      "↗",
      "Share image",
      false,
      async () => {
        try {
          if (navigator.share) {
            await navigator.share({
              title: image.title,
              text: `Discover ${image.title} on PixieBloom`,
              url: image.url
            });
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(image.url);
            notify("Image link copied!");
          } else {
            window.prompt("Copy this image link:", image.url);
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            notify("Sharing is unavailable in this browser.");
          }
        }
      }
    );

    actions.append(
      favButton,
      saveButton,
      downloadButton,
      shareButton
    );

    wrap.append(img, actions);

    const info = document.createElement("div");
    info.className = "image-info";

    const title = document.createElement("h3");
    title.textContent = image.title;

    const description = document.createElement("p");
    description.textContent =
      "A little inspiration for your collection";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = image.category.toUpperCase();

    info.append(title, description, tag);
    card.append(wrap, info);
    galleryGrid.appendChild(card);
  });
}

document.getElementById("categories").addEventListener("click", event => {
  const button = event.target.closest(".category");
  if (!button) return;

  selectedCategory = button.dataset.category;
  showFavourites = false;

  document.getElementById("favBtn").classList.remove("active");

  document.querySelectorAll(".category").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  renderGallery();
});

searchInput.addEventListener("input", renderGallery);
document.getElementById("searchBtn").addEventListener("click", renderGallery);

document.getElementById("favBtn").addEventListener("click", () => {
  showFavourites = !showFavourites;

  document.getElementById("favBtn").classList.toggle(
    "active",
    showFavourites
  );

  document.querySelectorAll(".category").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === selectedCategory && !showFavourites
    );
  });

  renderGallery();
  document.getElementById("gallery").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("homeBtn").addEventListener("click", () => {
  showFavourites = false;
  selectedCategory = "All";
  searchInput.value = "";

  document.getElementById("favBtn").classList.remove("active");

  document.querySelectorAll(".category").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === "All"
    );
  });

  renderGallery();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("exploreBtn").addEventListener("click", () => {
  document.getElementById("gallery").scrollIntoView({
    behavior: "smooth"
  });
});

renderGallery();