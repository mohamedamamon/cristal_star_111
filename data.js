// بيانات اللاعبين والعناصر والرسائل والمنشورات مخزنة هنا
let players = [];
let items = [];
let messages = [];
let posts = [];

// عرض اللاعبين في الجدول
function renderPlayers() {
  const tbody = document.querySelector('#playersTable tbody');
  tbody.innerHTML = '';
  players.forEach((player, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${player.name}</td>
      <td>${player.score}</td>
      <td>
        <button onclick="changeScore(${index}, 1)">+</button>
        <button onclick="changeScore(${index}, -1)">-</button>
        <button onclick="removePlayer(${index})">🗑</button>
      </td>`;
    tbody.appendChild(tr);
  });
  renderMessageRecipients();
}
// تعديل نقاط اللاعب
function changeScore(index, delta) {
  players[index].score += delta;
  if(players[index].score < 0) players[index].score = 0;
  renderPlayers();
}

// حذف لاعب
function removePlayer(index) {
  if(confirm(هل تريد حذف اللاعب ${players[index].name}؟)) {
    players.splice(index, 1);
    renderPlayers();
  }
}

// إضافة لاعب جديد
function addPlayer() {
  const input = document.getElementById('newPlayerName');
  const name = input.value.trim();
  if(name === '') {
    alert('يرجى إدخال اسم اللاعب');
    return;
  }
  players.push({name: name, score: 0});
  input.value = '';
  renderPlayers();
}

// عرض العناصر في المتجر
function renderStore() {
  const container = document.getElementById('storeItems');
  container.innerHTML = '';
  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.textContent = ${item.name} - السعر: ${item.price};
    container.appendChild(div);
  });
}
// إضافة عنصر جديد للمتجر
function addItem() {
  const nameInput = document.getElementById('newItemName');
  const priceInput = document.getElementById('newItemPrice');
  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  if(name === '' || isNaN(price) || price < 0) {
    alert('يرجى إدخال اسم العنصر وسعر صحيح');
    return;
  }
  items.push({name: name, price: price});
  nameInput.value = '';
  priceInput.value = '';
  renderStore();
}

// عرض مستلمي الرسائل في القائمة المنسدلة
function renderMessageRecipients() {
  const select = document.getElementById('messageRecipient');
  select.innerHTML = '';
  players.forEach((player, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = player.name;
    select.appendChild(option);
  });
 // إضافة خيار للمشرف
  const adminOption = document.createElement('option');
  adminOption.value = 'admin';
  adminOption.textContent = 'المشرف';
  select.appendChild(adminOption);
}

// إرسال رسالة
function sendMessage() {
  const recipientSelect = document.getElementById('messageRecipient');
  const recipient = recipientSelect.value;
  const messageText = document.getElementById('newMessage').value.trim();
  if(messageText === '') {
    alert('يرجى كتابة رسالة');
    return;
  }
  const sender = 'أنت'; // يمكن تطوير لاحقاً ليحدد اسم اللاعب
  messages.push({to: recipient, from: sender, text: messageText, date: new Date()});
  document.getElementById('newMessage').value = '';
  renderMessages();
}
// عرض الرسائل
function renderMessages() {
  const container = document.getElementById('messagesList');
  container.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    const toName = (msg.to === 'admin') ? 'المشرف' : players[msg.to]?.name || 'غير معروف';
    div.textContent = من: ${msg.from} - إلى: ${toName} - ${msg.text};
    container.appendChild(div);
  });
}

// عرض المنشورات
function renderPosts() {
  const container = document.getElementById('postsList');
  container.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.style.color = post.color;
    div.style.border = '1px solid ' + post.color;
    div.style.marginBottom = '10px';
    div.style.padding = '10px'; if(post.img) {
      const img = document.createElement('img');  img.src = post.img;
      img.style.maxWidth = '100%';
      img.style.borderRadius = '6px';
      div.appendChild(img);
    }
    const p = document.createElement('p');
    p.textContent = post.text;
    div.appendChild(p);
    container.appendChild(div);
  });
}
// إضافة منشور جديد
function addPost() {
  const text = document.getElementById('newPostText').value.trim();
  const color = document.getElementById('newPostColor').value;
  const img = document.getElementById('newPostImg').value.trim();
  if(text === '') {
    alert('يرجى كتابة نص المنشور');
    return;
  }
  posts.push({text: text, color: color, img: img});
  document.getElementById('newPostText').value = '';
  document.getElementById('newPostImg').value = '';
  renderPosts();
}

// عند تحميل الصفحة الرئيسية
window.onload = () => {
  renderPlayers();
  renderStore();
  renderMessageRecipients();
  renderMessages();
  renderPosts();};
