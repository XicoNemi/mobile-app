import * as SecureStore from 'expo-secure-store';

async function saveValue(key, value) {
    // Guarda un valor en el almacenamiento seguro bajo una clave específica.
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
    // Obtiene el valor asociado a la clave.
    let result = await SecureStore.getItemAsync(key);
    return result ? result : false; // Retorna el valor si existe, o false si no.
}

async function deleteValue(key) {
    // Elimina el valor asociado a la clave.
    await SecureStore.deleteItemAsync(key);
}

// Exporta las funciones para su uso en otras partes de la aplicación.
export { saveValue, getValueFor, deleteValue };
