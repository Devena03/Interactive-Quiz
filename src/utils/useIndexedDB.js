export const useIndexedDB = () => {
    const dbName = "QuizDB";
    const storeName = "Attempts";

    const openDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, 1);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    };

    const addAttempt = async (attempt) => {
        const db = await openDB();
        const transaction = db.transaction(storeName, "readwrite");
        transaction.objectStore(storeName).add(attempt);
    };

    const getAttempts = async () => {
        const db = await openDB();
        return new Promise((resolve) => {
            const transaction = db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
        });
    };

    return { addAttempt, getAttempts };
};
