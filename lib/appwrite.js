import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

const debug = true
const client = new Client();

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.adarsh.aora",
    projectId: "6621230d4fb33770f85b",
    databaseId: "662135a867562d29ce33",
    userCollectionId: "66213600f3d148f9af9f",
    videoCollectionId: "66213621776b1223c135",
    storageBucketId: "6621372203ca3ee8dcb1"
}

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
    ;

const account = new Account(client);
const avatar = new Avatars(client)
const database = new Databases(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username)
        debug && console.log(newAccount)

        // ! if for some reason the account is not created 
        if (!newAccount) throw Error

        // ! create avatar url using getInitials method 
        const avatarUrl = avatar.getInitials(username)

        // ! invoke the sign-in method here 
        await logUser(email, password)

        // ! now inject the user details into the database
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                username: username,
                email: email,
                avatar: avatarUrl,
                accountId: newAccount.$id
            }
        )

        return newUser
    }
    catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const logUser = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password)
        return session
    }
    catch (error) {
        debug && console.log(error.message)
        throw new Error(error)
    }
}