
// import { Client, Databases, ID, Query } from 'appwrite';

// const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// if (!PROJECT_ID || !DATABASE_ID || !COLLECTION_ID) {
//   throw new Error('❌ Missing Appwrite environment variables.');
// }

// const client = new Client()
//   .setEndpoint('https://fra.cloud.appwrite.io/v1')
//   .setProject(PROJECT_ID);

// const database = new Databases(client);

// export const updateSearchCount = async (searchTerm, movie) => {
//   try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//       Query.equal('searchTerm', searchTerm),
//     ]);

//     if (result.documents.length > 0) {
//       const doc = result.documents[0];
//       await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
//         count: (doc.count || 0) + 1,
//       });
//     } else {
//       await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
//         searchTerm,
//         count: 1,
//         movie_id: movie.id,
//         poster_url: movie.poster_path
//           ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//           : null,
//       });
//     }
//   } catch (error) {
//     console.error('Error updating search count:', error);
//   }
// };

// export const getTrendingMovies = async () => {
//   try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//       Query.limit(5),
//       Query.orderDesc('count'),
//     ]);
//     return result.documents;
//   } catch (error) {
//     console.error('Error fetching trending movies:', error);
//     return [];
//   }
// };
import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

if (!PROJECT_ID || !DATABASE_ID || !COLLECTION_ID) {
  throw new Error('❌ Missing Appwrite environment variables.');
}

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTrem, movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTrem', searchTrem), // ✅ matches your schema
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: (doc.count || 0) + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTrem, // ✅ matches your schema
        count: 1,
        movie_id: movie.id,
        poster_url: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
      });
    }
  } catch (error) {
    console.error('Error updating search count:', error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ]);
    return result.documents;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};
