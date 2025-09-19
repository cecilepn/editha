// Affiche un message d'erreur à l'utilisateur

export const showErrorMessage = message => {
  const errorElement = document.getElementById('errorMessage')
  if (errorElement) {
    errorElement.textContent = message
    errorElement.style.display = 'block'
    setTimeout(() => (errorElement.style.display = 'none'), 5000)
  }
}
