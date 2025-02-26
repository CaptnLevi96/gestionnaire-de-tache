let contacts = [];
let editingId = null;

const contactForm = document.getElementById('contactForm');
const contactsList = document.getElementById('contactsList');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');
const contactIdInput = document.getElementById('contactId');
const nomInput = document.getElementById('nom');
const prenomInput = document.getElementById('prenom');
const telephoneInput = document.getElementById('telephone');
const emailInput = document.getElementById('email');

window.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    
    contactForm.addEventListener('submit', handleFormSubmit);
    cancelButton.addEventListener('click', cancelEdit);
});

function loadContacts() {
    fetch('contacts.json')
        .then(response => response.json())
        .then(data => {
            contacts = data;
            displayContacts();
        })
        .catch(error => {
            console.error('Erreur lors du chargement des contacts:', error);
            contacts = [];
            displayContacts();
        });
}

function displayContacts() {
    contactsList.innerHTML = '';
    
    contacts.forEach(contact => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${contact.nom}</td>
            <td>${contact.prenom}</td>
            <td>${contact.telephone}</td>
            <td>${contact.email}</td>
            <td>
                <button class="edit" data-id="${contact.id}">Modifier</button>
                <button class="delete" data-id="${contact.id}">Supprimer</button>
            </td>
        `;
        
        contactsList.appendChild(row);
    });
    
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            prepareContactEdit(id);
        });
    });
    
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            deleteContact(id);
        });
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateContact()) {
        return;
    }
    
    if (editingId) {
        updateContact();
    } else {
        addContact();
    }
    
    resetForm();
    displayContacts();
}

function validateContact() {
    if (nomInput.value.trim() === '') {
        alert('Le nom est requis');
        nomInput.focus();
        return false;
    }
    
    if (prenomInput.value.trim() === '') {
        alert('Le prénom est requis');
        prenomInput.focus();
        return false;
    }
    
    if (telephoneInput.value.trim() === '') {
        alert('Le numéro de téléphone est requis');
        telephoneInput.focus();
        return false;
    }
    
    if (emailInput.value.trim() === '') {
        alert('L\'adresse email est requise');
        emailInput.focus();
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        alert('Veuillez entrer une adresse email valide');
        emailInput.focus();
        return false;
    }
    
    return true;
}

function addContact() {
    const newContact = {
        id: generateId(),
        nom: nomInput.value,
        prenom: prenomInput.value,
        telephone: telephoneInput.value,
        email: emailInput.value
    };
    
    contacts.push(newContact);
    alert('Contact ajouté avec succès!');
}

function updateContact() {
    const index = contacts.findIndex(c => c.id === parseInt(editingId));
    
    if (index !== -1) {
        contacts[index] = {
            id: parseInt(editingId),
            nom: nomInput.value,
            prenom: prenomInput.value,
            telephone: telephoneInput.value,
            email: emailInput.value
        };
        
        alert('Contact mis à jour avec succès!');
    }
}

function prepareContactEdit(id) {
    const contact = contacts.find(c => c.id === parseInt(id));
    
    if (contact) {
        editingId = id;
        contactIdInput.value = contact.id;
        nomInput.value = contact.nom;
        prenomInput.value = contact.prenom;
        telephoneInput.value = contact.telephone;
        emailInput.value = contact.email;
        
        saveButton.textContent = 'Mettre à jour';
        cancelButton.style.display = 'inline-block';
        
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteContact(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact?')) {
        contacts = contacts.filter(c => c.id !== parseInt(id));
        alert('Contact supprimé avec succès!');
        displayContacts();
        
        if (editingId === id) {
            resetForm();
        }
    }
}

function cancelEdit() {
    resetForm();
}

function resetForm() {
    contactForm.reset();
    editingId = null;
    contactIdInput.value = '';
    saveButton.textContent = 'Enregistrer';
    cancelButton.style.display = 'none';
}

function generateId() {
    return contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
}


function saveToJSON() {
    console.log('Sauvegarde des contacts:', contacts);
    alert('Les contacts ont été sauvegardés (simulé).');
}