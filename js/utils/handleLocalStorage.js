import { showErrorMessage } from './showError.js'

// Constantes
const STORAGE_KEY = 'editha_configurator_settings'
const STORAGE_EXPIRY_HOURS = 24

// Gestion localStorage avec gestion d'erreurs
export const storage = {
  save: settings => {
    try {
      const dataToSave = {
        ...settings,
        timestamp: Date.now(),
        expiryTime: Date.now() + STORAGE_EXPIRY_HOURS * 60 * 60 * 1000
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      //console.log('Settings saved successfully:', settings)
    } catch (error) {
      //console.error('Erreur lors de la sauvegarde:', error)
      showErrorMessage('Impossible de sauvegarder vos paramètres')
    }
  },

  load: () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (!savedData) return null
      const parsedData = JSON.parse(savedData)

      if (Date.now() > parsedData.expiryTime) {
        localStorage.removeItem(STORAGE_KEY)
        //console.log('Settings expired, removed from storage')
        return null
      }
      return parsedData
    } catch (error) {
      //console.error('Erreur lors du chargement:', error)
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
  }
}
