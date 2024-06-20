import { Client, Account, ID, Avatars, Databases, Query, Models } from 'react-native-appwrite'

type Config = {
  endpoint: string
  platform: string
  projectId: string
  databaseId: string
  userCollectionId: string
  videoCollectionId: string
  storageId: string
}

export const config: Config = {
  endpoint: process.env.EXPO_PUBLIC_AW_ENDPOINT || '',
  platform: process.env.EXPO_PUBLIC_AW_PLATFORM || '',
  projectId: process.env.EXPO_PUBLIC_AW_PROJECT_ID || '',
  databaseId: process.env.EXPO_PUBLIC_AW_DATABASE_ID || '',
  userCollectionId: process.env.EXPO_PUBLIC_AW_USER_COLLECTION_ID || '',
  videoCollectionId: process.env.EXPO_PUBLIC_AW_VIDEO_COLLECTION_ID || '',
  storageId: process.env.EXPO_PUBLIC_AW_STORAGE_ID || '',
}

const client: Client = new Client()

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)

const account: Account = new Account(client)
const avatars: Avatars = new Avatars(client)
const databases: Databases = new Databases(client)

export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)

    if (!newAccount) throw Error('Failed to create account')

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    return await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    )
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    return await account.createEmailPasswordSession(email, password)
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

export const getCurrentUser = async (): Promise<Models.Document> => {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw Error('Failed to get current account')

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error('Failed to get current account')

    return currentUser.documents[0]
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}
