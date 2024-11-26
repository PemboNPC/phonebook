// Массив контактов
let contacts = [];

// Элементы DOM
const contactList = document.getElementById('contact-list');
const addContactBtn = document.getElementById('add-contact-btn');
const addContactModal = document.getElementById('add-contact-modal');
const closeModal = document.getElementById('close-modal');
const addContactForm = document.getElementById('add-contact-form');
const searchInput = document.getElementById('search');

// Открытие модального окна
addContactBtn.addEventListener('click', () => {
  addContactModal.style.display = 'block'; // Показываем модальное окно
});

// Закрытие модального окна через кнопку "Закрыть"
closeModal.addEventListener('click', () => {
  addContactModal.style.display = 'none'; // Полностью убираем модальное окно
});

// Добавление контакта
addContactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Получение данных из формы
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const favorite = document.getElementById('favorite').checked;

  if (!name || !phone) {
    alert('Заполните все поля!');
    return;
  }

  // Добавление нового контакта (с иконкой)
  const newContact = {
    name,
    phone,
    favorite,
    avatar: 'https://via.placeholder.com/50', // Заглушка для иконки
  };
  contacts.push(newContact);

  // Сортировка и отображение контактов
  sortAndDisplayContacts();

  // Сбрасываем форму и закрываем модальное окно
  addContactForm.reset();
  addContactModal.style.display = 'none';
});

// Удаление контакта
const deleteContact = (index) => {
  contacts.splice(index, 1);
  sortAndDisplayContacts();
};

// Добавление в избранное
const toggleFavorite = (index) => {
  contacts[index].favorite = !contacts[index].favorite;
  sortAndDisplayContacts();
};

// Сортировка и отображение контактов
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

// Поиск по контактам
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
