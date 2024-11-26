
let contacts = [];


const contactList = document.getElementById('contact-list');
const addContactBtn = document.getElementById('add-contact-btn');
const addContactModal = document.getElementById('add-contact-modal');
const closeModal = document.getElementById('close-modal');
const addContactForm = document.getElementById('add-contact-form');
const searchInput = document.getElementById('search');


addContactBtn.addEventListener('click', () => {
  addContactModal.style.display = 'block'; 
});


closeModal.addEventListener('click', () => {
  addContactModal.style.display = 'none'; 
});


addContactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const favorite = document.getElementById('favorite').checked;

  if (!name || !phone) {
    alert('Заполните все поля!');
    return;
  }


  const newContact = {
    name,
    phone,
    favorite,
    avatar: 'https://via.placeholder.com/50', 
  };
  contacts.push(newContact);

 
  sortAndDisplayContacts();

 
  addContactForm.reset();
  addContactModal.style.display = 'none';
});


const deleteContact = (index) => {
  contacts.splice(index, 1);
  sortAndDisplayContacts();
};


const toggleFavorite = (index) => {
  contacts[index].favorite = !contacts[index].favorite;
  sortAndDisplayContacts();
};


const sortAndDisplayContacts = () => {
  const sortedContacts = [...contacts].sort((a, b) => {
    if (a.favorite === b.favorite) return a.name.localeCompare(b.name);
    return b.favorite - a.favorite;
  });

  contactList.innerHTML = '';
  sortedContacts.forEach((contact, index) => {
    const li = document.createElement('li');
    li.className = `contact-item ${contact.favorite ? 'favorite' : ''}`;
    li.innerHTML = `
      <div class="contact-card">
        <img src="${contact.avatar}" alt="${contact.name}" class="contact-avatar">
        <div class="contact-info">
          <span>${contact.name}</span>
          <span>${contact.phone}</span>
        </div>
        <div class="contact-actions">
          <button onclick="toggleFavorite(${index})">★</button>
          <button onclick="deleteContact(${index})">🗑</button>
        </div>
      </div>
    `;
    contactList.appendChild(li);
  });
};


searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm) ||
    contact.phone.includes(searchTerm)
  );

  contactList.innerHTML = '';
  filteredContacts.forEach((contact, index) => {
    const li = document.createElement('li');
    li.className = `contact-item ${contact.favorite ? 'favorite' : ''}`;
    li.innerHTML = `
      <div class="contact-card">
        <img src="${contact.avatar}" alt="${contact.name}" class="contact-avatar">
        <div class="contact-info">
          <span>${contact.name}</span>
          <span>${contact.phone}</span>
        </div>
        <div class="contact-actions">
          <button onclick="toggleFavorite(${index})">★</button>
          <button onclick="deleteContact(${index})">🗑</button>
        </div>
      </div>
    `;
    contactList.appendChild(li);
  });
});
