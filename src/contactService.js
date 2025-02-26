// src/contactService.js

/**
 * Valide les données du formulaire de contact
 * @returns {boolean} - true si le formulaire est valide, false sinon
 */
function validateContact() {
    const nomInput = document.getElementById('nom');
    const prenomInput = document.getElementById('prenom');
    const telephoneInput = document.getElementById('telephone');
    const emailInput = document.getElementById('email');
    
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
    
    // Validation du format de téléphone canadien (XXX-XXX-XXXX)
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(telephoneInput.value.trim())) {
      alert('Le numéro de téléphone doit être au format XXX-XXX-XXXX');
      telephoneInput.focus();
      return false;
    }
    
    if (emailInput.value.trim() === '') {
      alert('L\'adresse email est requise');
      emailInput.focus();
      return false;
    }
    
    // Validation basique d'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      alert('Veuillez entrer une adresse email valide');
      emailInput.focus();
      return false;
    }
    
    return true;
  }
  
  /**
   * Ajoute un nouveau contact à la liste
   * @param {Array} contacts - La liste des contacts
   * @param {Function} generateId - Fonction pour générer un nouvel ID
   * @returns {boolean} - true si l'ajout a réussi
   */
  function addContact(contacts, generateId) {
    const nomInput = document.getElementById('nom');
    const prenomInput = document.getElementById('prenom');
    const telephoneInput = document.getElementById('telephone');
    const emailInput = document.getElementById('email');
    
    const newContact = {
      id: generateId(),
      nom: nomInput.value,
      prenom: prenomInput.value,
      telephone: telephoneInput.value,
      email: emailInput.value
    };
    
    contacts.push(newContact);
    alert('Contact ajouté avec succès!');
    return true;
  }
  
  /**
   * Met à jour un contact existant
   * @param {Array} contacts - La liste des contacts
   * @param {number|string} editingId - L'ID du contact à modifier
   * @returns {boolean} - true si la mise à jour a réussi, false sinon
   */
  function updateContact(contacts, editingId) {
    const nomInput = document.getElementById('nom');
    const prenomInput = document.getElementById('prenom');
    const telephoneInput = document.getElementById('telephone');
    const emailInput = document.getElementById('email');
    
    const index = contacts.findIndex(c => c.id === parseInt(editingId));
    
    if (index === -1) {
      return false;
    }
    
    contacts[index] = {
      id: parseInt(editingId),
      nom: nomInput.value,
      prenom: prenomInput.value,
      telephone: telephoneInput.value,
      email: emailInput.value
    };
    
    alert('Contact mis à jour avec succès!');
    return true;
  }
  
  /**
   * Supprime un contact de la liste
   * @param {Array} contacts - La liste des contacts
   * @param {number|string} id - L'ID du contact à supprimer
   * @returns {boolean} - true si la suppression a réussi, false sinon
   */
  function deleteContact(contacts, id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce contact?')) {
      return false;
    }
    
    const idNumber = parseInt(id);
    const initialLength = contacts.length;
    const filteredContacts = contacts.filter(c => c.id !== idNumber);
    
    if (filteredContacts.length === initialLength) {
      // Aucun contact n'a été supprimé
      return false;
    }
    
    // Mise à jour du tableau original (mutation directe pour les tests)
    contacts.splice(0, contacts.length);
    filteredContacts.forEach(contact => contacts.push(contact));
    
    alert('Contact supprimé avec succès!');
    return true;
  }
  
  // Exporter les fonctions pour les tests
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      addContact,
      updateContact,
      deleteContact,
      validateContact
    };
  }