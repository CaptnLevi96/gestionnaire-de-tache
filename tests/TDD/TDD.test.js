// tests/TDD.test.js
const {
    addContact,
    updateContact,
    deleteContact,
    validateContact
  } = require('../../src/contactService.js');
    
  // Mock du DOM pour simuler les éléments du formulaire
  document.body.innerHTML = `
    <form id="contactForm">
      <input type="hidden" id="contactId">
      <input type="text" id="nom">
      <input type="text" id="prenom">
      <input type="tel" id="telephone">
      <input type="email" id="email">
      <button type="submit" id="saveButton">Enregistrer</button>
      <button type="button" id="cancelButton">Annuler</button>
    </form>
    <table id="contactsTable">
      <tbody id="contactsList"></tbody>
    </table>
  `;
  
  // Mock des fonctions d'alerte
  global.alert = jest.fn();
  global.confirm = jest.fn();
  
  describe('Tests TDD - Application de gestion de contacts', () => {
    
    // Tests pour validateContact
    describe('validateContact', () => {
      beforeEach(() => {
        // Réinitialiser les mocks et les éléments du DOM
        jest.clearAllMocks();
        document.getElementById('nom').value = '';
        document.getElementById('prenom').value = '';
        document.getElementById('telephone').value = '';
        document.getElementById('email').value = '';
      });
  
      test('devrait retourner false si le nom est vide', () => {
        document.getElementById('nom').value = '';
        document.getElementById('prenom').value = 'Jean';
        document.getElementById('telephone').value = '514-204-2934';
        document.getElementById('email').value = 'jean@example.com';
        
        expect(validateContact()).toBe(false);
        expect(alert).toHaveBeenCalledWith('Le nom est requis');
      });
  
      test('devrait retourner false si le prénom est vide', () => {
        document.getElementById('nom').value = 'Dupont';
        document.getElementById('prenom').value = '';
        document.getElementById('telephone').value = '514-204-2934';
        document.getElementById('email').value = 'jean@example.com';
        
        expect(validateContact()).toBe(false);
        expect(alert).toHaveBeenCalledWith('Le prénom est requis');
      });
  
      test('devrait retourner false si le téléphone est vide', () => {
        document.getElementById('nom').value = 'Dupont';
        document.getElementById('prenom').value = 'Jean';
        document.getElementById('telephone').value = '';
        document.getElementById('email').value = 'jean@example.com';
        
        expect(validateContact()).toBe(false);
        expect(alert).toHaveBeenCalledWith('Le numéro de téléphone est requis');
      });
      
      test('devrait retourner false si le format du téléphone est invalide', () => {
        document.getElementById('nom').value = 'Dupont';
        document.getElementById('prenom').value = 'Jean';
        document.getElementById('telephone').value = '0612345678'; // Format non canadien
        document.getElementById('email').value = 'jean@example.com';
        
        expect(validateContact()).toBe(false);
        expect(alert).toHaveBeenCalledWith('Le numéro de téléphone doit être au format XXX-XXX-XXXX');
      });
  
      test('devrait retourner false si l\'email est vide', () => {
        document.getElementById('nom').value = 'Dupont';
        document.getElementById('prenom').value = 'Jean';
        document.getElementById('telephone').value = '514-204-2934';
        document.getElementById('email').value = '';
        
        expect(validateContact()).toBe(false);
        expect(alert).toHaveBeenCalledWith('L\'adresse email est requise');
      });
  
      test('devrait retourner false si l\'email est invalide', () => {
        document.getElementById('nom').value = 'Dupont';
        document.getElementById('prenom').value = 'Jean';
        document.getElementById('telephone').value = '514-204-2934';
        document.getElementById('email').value = 'invalid-email';
        
        expect(validateContact()).toBe(false);
        expect(alert).toHaveBeenCalledWith('Veuillez entrer une adresse email valide');
      });
  
      test('devrait retourner true si tous les champs sont valides', () => {
        document.getElementById('nom').value = 'Dupont';
        document.getElementById('prenom').value = 'Jean';
        document.getElementById('telephone').value = '514-204-2934'; // Format canadien
        document.getElementById('email').value = 'jean@example.com';
        
        expect(validateContact()).toBe(true);
        expect(alert).not.toHaveBeenCalled();
      });
    });
  
    // Tests pour addContact
    describe('addContact', () => {
      // Mock des contacts et des fonctions associées
      let contacts = [];
      const generateId = jest.fn().mockReturnValue(1);
  
      beforeEach(() => {
        contacts = [];
        jest.clearAllMocks();
        document.getElementById('nom').value = 'Dupont';
        document.getElementById('prenom').value = 'Jean';
        document.getElementById('telephone').value = '514-204-2934'; // Format canadien
        document.getElementById('email').value = 'jean@example.com';
      });
  
      test('devrait ajouter un nouveau contact à la liste', () => {
        const result = addContact(contacts, generateId);
        
        expect(contacts).toHaveLength(1);
        expect(contacts[0]).toEqual({
          id: 1,
          nom: 'Dupont',
          prenom: 'Jean',
          telephone: '514-204-2934',
          email: 'jean@example.com'
        });
        expect(alert).toHaveBeenCalledWith('Contact ajouté avec succès!');
        expect(result).toBe(true);
      });
      
      test('devrait ajouter plusieurs contacts avec des IDs uniques', () => {
        // Premier contact avec ID 1
        const generateId1 = jest.fn().mockReturnValue(1);
        addContact(contacts, generateId1);
        
        // Deuxième contact avec ID 2
        document.getElementById('nom').value = 'Martin';
        document.getElementById('prenom').value = 'Marie';
        document.getElementById('telephone').value = '514-630-8462';
        document.getElementById('email').value = 'marie@example.com';
        const generateId2 = jest.fn().mockReturnValue(2);
        addContact(contacts, generateId2);
        
        expect(contacts).toHaveLength(2);
        expect(contacts[0].id).toBe(1);
        expect(contacts[1].id).toBe(2);
        expect(contacts[1].nom).toBe('Martin');
      });
    });
  
    // Tests pour updateContact
    describe('updateContact', () => {
      let contacts = [];
      let editingId = null;
  
      beforeEach(() => {
        contacts = [
          {
            id: 1,
            nom: 'Dupont',
            prenom: 'Jean',
            telephone: '514-204-2934', // Format canadien
            email: 'jean@example.com'
          },
          {
            id: 2,
            nom: 'Martin',
            prenom: 'Marie',
            telephone: '514-630-8462', // Format canadien
            email: 'marin.marin@exemple.com'
          }
        ];
        editingId = 1;
        jest.clearAllMocks();
        document.getElementById('contactId').value = '1';
        document.getElementById('nom').value = 'Dupont-Modifié';
        document.getElementById('prenom').value = 'Jean-Modifié';
        document.getElementById('telephone').value = '514-630-8462'; // Format canadien
        document.getElementById('email').value = 'jean.modifie@example.com';
      });
  
      test('devrait mettre à jour un contact existant', () => {
        const result = updateContact(contacts, editingId);
        
        expect(contacts).toHaveLength(2);
        expect(contacts[0]).toEqual({
          id: 1,
          nom: 'Dupont-Modifié',
          prenom: 'Jean-Modifié',
          telephone: '514-630-8462',
          email: 'jean.modifie@example.com'
        });
        expect(alert).toHaveBeenCalledWith('Contact mis à jour avec succès!');
        expect(result).toBe(true);
      });
  
      test('devrait retourner false si le contact n\'existe pas', () => {
        editingId = 99; // ID inexistant
        
        const result = updateContact(contacts, editingId);
        
        expect(contacts).toHaveLength(2);
        expect(contacts[0].nom).toBe('Dupont'); // Non modifié
        expect(result).toBe(false);
      });
      
      test('ne devrait pas modifier les autres contacts', () => {
        updateContact(contacts, editingId);
        
        // Vérifier que le deuxième contact n'a pas été modifié
        expect(contacts[1]).toEqual({
          id: 2,
          nom: 'Martin',
          prenom: 'Marie',
          telephone: '514-630-8462',
          email: 'marin.marin@exemple.com'
        });
      });
    });
  
    // Tests pour deleteContact
    describe('deleteContact', () => {
      let contacts = [];
  
      beforeEach(() => {
        contacts = [
          {
            id: 1,
            nom: 'Dupont',
            prenom: 'Jean',
            telephone: '514-204-2934',
            email: 'jean@example.com'
          },
          {
            id: 2,
            nom: 'Martin',
            prenom: 'Marie',
            telephone: '514-630-8462', // Format canadien
            email: 'marin.marin@exemple.com'
          }
        ];
        jest.clearAllMocks();
        global.confirm.mockReturnValue(true); // Simuler la confirmation de suppression
      });
  
      test('devrait supprimer un contact existant', () => {
        const result = deleteContact(contacts, 1);
        
        expect(contacts).toHaveLength(1);
        expect(contacts[0].id).toBe(2);
        expect(alert).toHaveBeenCalledWith('Contact supprimé avec succès!');
        expect(result).toBe(true);
      });
  
      test('ne devrait pas supprimer si l\'utilisateur annule', () => {
        global.confirm.mockReturnValue(false); // L'utilisateur annule
        
        const result = deleteContact(contacts, 1);
        
        expect(contacts).toHaveLength(2);
        expect(result).toBe(false);
      });
  
      test('devrait gérer la suppression d\'un ID inexistant', () => {
        const result = deleteContact(contacts, 99);
        
        expect(contacts).toHaveLength(2);
        expect(result).toBe(false);
      });
      
      test('devrait pouvoir supprimer le dernier contact', () => {
        // Supprimer le premier contact
        deleteContact(contacts, 1);
        // Supprimer le dernier contact restant
        const result = deleteContact(contacts, 2);
        
        expect(contacts).toHaveLength(0);
        expect(result).toBe(true);
      });
    });
  });