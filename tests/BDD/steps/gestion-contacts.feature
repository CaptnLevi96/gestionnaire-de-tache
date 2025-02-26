# language: fr
Fonctionnalité: Gestion des contacts
  En tant qu'utilisateur
  Je veux pouvoir gérer mes contacts
  Afin de maintenir une liste de contacts organisée et à jour

  # SCÉNARIOS D'AJOUT DE CONTACT
  Scénario: Ajouter un nouveau contact avec des données valides
    Etant donné que je suis sur la page de gestion des contacts
    Quand je remplis le formulaire avec les informations suivantes
      | nom    | prenom | telephone    | email                    |
      | Dubois | Pierre | 514-555-1234 | pierre.dubois@exemple.fr |
    Et que je clique sur le bouton "Enregistrer"
    Alors je devrais voir le nouveau contact dans la liste
    Et le formulaire devrait être réinitialisé

  Scénario: Essayer d'ajouter un contact avec des données invalides
    Etant donné que je suis sur la page de gestion des contacts
    Quand je remplis le formulaire avec les informations suivantes
      | nom    | prenom | telephone  | email             |
      | Martin | Sophie | 0612345678 | sophie@exemple.fr |
    Et que je clique sur le bouton "Enregistrer"
    Alors je devrais voir un message d'erreur pour le format de téléphone
    Et le contact ne devrait pas être ajouté à la liste

  # SCÉNARIOS DE MODIFICATION DE CONTACT
  Scénario: Modifier un contact existant avec succès
    Etant donné que je suis sur la page de gestion des contacts
    Et qu'il existe un contact avec les informations suivantes
      | nom    | prenom | telephone    | email                   |
      | Dupont | Jean   | 514-204-2934 | jean.dupont@exemple.com |
    Quand je clique sur le bouton "Modifier" pour ce contact
    Alors le formulaire devrait être rempli avec les informations du contact
    Quand je modifie les informations comme suit
      | nom          | prenom       | telephone    | email                        |
      | Dupont-Smith | Jean-Michel | 514-987-6543 | jean.michel.dupont@exemple.com |
    Et que je clique sur le bouton "Mettre à jour"
    Alors je devrais voir le contact modifié dans la liste
    Et le formulaire devrait être réinitialisé

  Scénario: Annuler la modification d'un contact
    Etant donné que je suis sur la page de gestion des contacts
    Et qu'il existe un contact avec les informations suivantes
      | nom    | prenom | telephone    | email                   |
      | Dupont | Jean   | 514-204-2934 | jean.dupont@exemple.com |
    Quand je clique sur le bouton "Modifier" pour ce contact
    Alors le formulaire devrait être rempli avec les informations du contact
    Quand je modifie le nom en "Durand"
    Et que je clique sur le bouton "Annuler"
    Alors le formulaire devrait être réinitialisé
    Et les informations du contact ne devraient pas être modifiées

  Scénario: Essayer de modifier un contact avec un format de téléphone invalide
    Etant donné que je suis sur la page de gestion des contacts
    Et qu'il existe un contact avec les informations suivantes
      | nom    | prenom | telephone    | email                   |
      | Dupont | Jean   | 514-204-2934 | jean.dupont@exemple.com |
    Quand je clique sur le bouton "Modifier" pour ce contact
    Et je modifie le numéro de téléphone en "0612345678"
    Et que je clique sur le bouton "Mettre à jour"
    Alors je devrais voir un message d'erreur pour le format de téléphone
    Et les informations du contact ne devraient pas être modifiées

  # SCÉNARIOS DE SUPPRESSION DE CONTACT
  Scénario: Supprimer un contact avec confirmation
    Etant donné que je suis sur la page de gestion des contacts
    Et qu'il existe les contacts suivants
      | id | nom    | prenom | telephone    | email                    |
      | 1  | Dupont | Jean   | 514-204-2934 | jean.dupont@exemple.com  |
      | 2  | Martin | Marie  | 514-630-8462 | marin.marin@exemple.com  |
    Quand je clique sur le bouton "Supprimer" pour le contact "Dupont Jean"
    Et je confirme la suppression
    Alors le contact "Dupont Jean" ne devrait plus apparaître dans la liste
    Et le nombre total de contacts devrait diminuer de 1

  Scénario: Annuler la suppression d'un contact
    Etant donné que je suis sur la page de gestion des contacts
    Et qu'il existe les contacts suivants
      | id | nom    | prenom | telephone    | email                    |
      | 1  | Dupont | Jean   | 514-204-2934 | jean.dupont@exemple.com  |
      | 2  | Martin | Marie  | 514-630-8462 | marin.marin@exemple.com  |
    Quand je clique sur le bouton "Supprimer" pour le contact "Martin Marie"
    Mais j'annule la suppression
    Alors le contact "Martin Marie" devrait toujours apparaître dans la liste
    Et le nombre total de contacts ne devrait pas changer

  Scénario: Supprimer le dernier contact de la liste
    Etant donné que je suis sur la page de gestion des contacts
    Et qu'il ne reste qu'un seul contact dans la liste
    Quand je clique sur le bouton "Supprimer" pour ce contact
    Et je confirme la suppression
    Alors la liste des contacts devrait être vide
    Et un message devrait indiquer qu'aucun contact n'est disponible