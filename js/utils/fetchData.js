// Fetching data from products json
export async function fetchProducts() {
  try {
    const response = await fetch('../json/products.json')
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`)
    }
    const data = await response.json()
    return data.books
  } catch (error) {
    console.error('Erreur lors du chargement des produits :', error)
    return []
  }
}
