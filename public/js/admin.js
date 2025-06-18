const token = localStorage.getItem('token');

const modelsTableBody = document.querySelector('#modelsTable tbody');
const modelFormDiv = document.getElementById('modelFormDiv');
const formModel = document.getElementById('formModel');
const formTitle = document.getElementById('formTitle');
const btnAdd = document.getElementById('btnAdd');
const cancelBtn = document.getElementById('cancelBtn');

let editingModelId = null;

// Load table data
async function loadModels() {
  const res = await fetch('/api/models', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const models = await res.json();
  modelsTableBody.innerHTML = '';

  models.forEach(model => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${model.firstname}</td>
      <td>${model.lastname}</td>
      <td>${model.gender}</td>
      <td>${model.age}</td>
      <td>${model.height}</td>
      <td>${model.category}</td>
      <td>${model.description}</td>
      <td><img src="/images/${model.profileImage || 'default.png'}" width="80" height="100"></td>
      <td>
        <button onclick="editModel('${model._id}')">Modifier</button>
        <button onclick="deleteModel('${model._id}')">Supprimer</button>
      </td>
    `;
    modelsTableBody.appendChild(tr);
  });
}

// Ajouter un modèle
btnAdd.onclick = () => {
  editingModelId = null;
  formTitle.textContent = "Ajouter un modèle";
  formModel.reset();
  modelFormDiv.style.display = 'block';
};

// Annuler formulaire
cancelBtn.onclick = () => {
  modelFormDiv.style.display = 'none';
};

// Valider ajout/modification
formModel.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(formModel);
  const modelData = {};
  formData.forEach((value, key) => modelData[key] = value);

  let url = '/api/models';
  let method = 'POST';

  if (editingModelId) {
    url += `/${editingModelId}`;
    method = 'PUT';
  }

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(modelData)
  });

  if (res.ok) {
    modelFormDiv.style.display = 'none';
    loadModels();
  } else {
    alert("Erreur lors de l'enregistrement");
  }
};

// Modifier un modèle
async function editModel(id) {
  editingModelId = id;
  formTitle.textContent = "Modifier un modèle";

  const res = await fetch(`/api/models/${id}`, {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const model = await res.json();

  formModel.firstname.value = model.firstname;
  formModel.lastname.value = model.lastname;
  formModel.gender.value = model.gender;
  formModel.age.value = model.age;
  formModel.height.value = model.height;
  formModel.category.value = model.category;
  formModel.description.value = model.description;

  modelFormDiv.style.display = 'block';
}

// Supprimer un modèle
async function deleteModel(id) {
  if (confirm("Confirmer la suppression ?")) {
    const res = await fetch(`/api/models/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.ok) {
      loadModels();
    } else {
      alert("Erreur lors de la suppression");
    }
  }
}

// Chargement initial
loadModels();
