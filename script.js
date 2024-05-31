// Sélectionner les éléments HTML nécessaires
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearCompletedButton = document.getElementById('clear-completed');

// Fonction pour ajouter une nouvelle tâche
function addTask(taskContent) {
  // Créer un nouvel élément de liste
  const taskItem = document.createElement('li');
  taskItem.textContent = taskContent;

  // Ajouter un bouton pour supprimer la tâche
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Supprimer';
  deleteButton.classList.add('delete-button');
  taskItem.appendChild(deleteButton);

  // Ajouter l'élément de liste à la liste des tâches
  taskList.appendChild(taskItem);
}

// Événement de soumission du formulaire pour ajouter une tâche
taskForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Empêcher le comportement par défaut du formulaire

  const taskContent = taskInput.value.trim(); // Récupérer le contenu de la tâche

  if (taskContent !== '') {
    addTask(taskContent); // Ajouter la tâche à la liste
    taskInput.value = ''; // Effacer le champ de texte
  }
});

// Événement de clic pour supprimer une tâche
taskList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-button')) {
    event.target.parentElement.remove(); // Supprimer l'élément de liste parent
  }
});

// Événement de clic pour effacer les tâches terminées
clearCompletedButton.addEventListener('click', function() {
  const completedTasks = document.querySelectorAll('.completed');
  completedTasks.forEach(task => task.remove());
});

const messages = [
  "You're amazing!",
  "You're doing a great job!",
  "That's my girl!",
  "Yalla, next step sweetie!"
];

// Fonction pour choisir un message aléatoire
function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

// Événement de clic pour marquer une tâche comme terminée
taskList.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('completed');
    if (event.target.classList.contains('completed')) {
      // Si la tâche est marquée comme terminée, afficher un message aléatoire
      const message = getRandomMessage();
      alert(message);
    }
  }
});
