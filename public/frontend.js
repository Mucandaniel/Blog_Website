// dictionary popup

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('dictionaryPopup');
  const icon = document.getElementById('dictionaryIcon');
  const closeBtn = document.getElementById('popupClose');
  const input = document.getElementById('dictInput');
  const searchBtn = document.getElementById('dictSearch');
  const meaningDiv = document.getElementById('dictMeaning');
  const header = document.getElementById('popupHeader');

  // Close button: minimize to icon
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    icon.style.display = 'flex';
  });

  // Click icon: restore popup
  icon.addEventListener('click', () => {
    popup.style.display = 'block';
    icon.style.display = 'none';
  });

  // Search function (static dictionary)
  searchBtn.addEventListener('click', async () => {
    const word = input.value.trim();
    if (!word) return;

    try {
        const response = await fetch("/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });

      const data = await response.json();
      meaningDiv.textContent = data.definition;
      meaningDiv.style.display = "block";

    } catch (err) {
      console.error(err);
      meaningDiv.textContent = "Error fetching definition";
    }
    

  });

  // Make the popup draggable
  let isDragging = false;
  let offsetX, offsetY;

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - popup.getBoundingClientRect().left;
    offsetY = e.clientY - popup.getBoundingClientRect().top;
    popup.style.transition = 'none'; // remove smooth transition during drag
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      popup.style.left = `${e.clientX - offsetX}px`;
      popup.style.top = `${e.clientY - offsetY}px`;
      popup.style.bottom = 'auto';
      popup.style.right = 'auto';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
});



// write for us pop up

const modal = document.getElementById("blogModal");
const openBtn = document.getElementById("writeForUsBtn");
const closeBtn = document.getElementById("closeBlogModal");
const cancelBtn = document.getElementById("cancelBlog");
const form = document.getElementById("blogForm");
const contentBox = document.getElementById("blogContent");
const counter = document.getElementById("charCount");

// Open modal
openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close modal
closeBtn.addEventListener("click", () => modal.style.display = "none");
cancelBtn.addEventListener("click", () => modal.style.display = "none");

// Live character count
contentBox.addEventListener("input", () => {
  const length = contentBox.value.length;
  counter.textContent = `${length} characters (minimum 100)`;
});

// Submit form simulation
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (contentBox.value.length < 100) {
    alert("Blog content must be at least 100 characters.");
    return;
  }

  alert("✅ Blog submitted successfully!");
  modal.style.display = "none";
  form.reset();
  counter.textContent = "0 characters (minimum 100)";
});