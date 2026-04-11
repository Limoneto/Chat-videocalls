const functions = require('firebase-functions')
const admin = require('firebase-admin')
// admin.initializeApp();
const firestore = admin.firestore()

/*
 ** When a user updates their profile info (email, profile picture, first name, etc)
 ** We update all the firestore tables that contain copies of that user object
 */

exports.propagateUserProfileUpdates = functions.firestore
    .document('users/{userID}')
    .onUpdate(async (change, context) => {
        try {
            const beforeData = change.before.data();
            const afterData = change.after.data();
            
            // Check if relevant user data actually changed
            if (!hasRelevantChanges(beforeData, afterData)) {
                console.log('No relevant user data changes detected');
                return null;
            }

            const userData = afterData;
            if (!userData || !userData.id) {
                console.error('Invalid user data:', userData);
                return null;
            }

            console.log('Starting profile update propagation for user:', userData.id);
            await updateAllRelatedData(userData);
            console.log('Successfully completed profile update propagation');
            return null;
        } catch (error) {
            console.error('Error in propagateUserProfileUpdates:', error);
            throw error;
        }
    });

function hasRelevantChanges(before, after) {
    const relevantFields = ['firstName', 'lastName', 'profilePictureURL', 'email', 'isOnline'];
    return relevantFields.some(field => before[field] !== after[field]);
}

const updateAllRelatedData = async (userData) => {
    try {
        const tasks = [
            updateChatConversations(userData, 'messages_live'),
            updateChatConversations(userData, 'messages_historical'),
            updateChatFeeds(userData, 'chat_feed_live'),
            updateChatFeeds(userData, 'chat_feed_historical'),
        ];




        await Promise.all(tasks);
    } catch (error) {
        console.error('Error in updateAllRelatedData:', error);
        throw error;
    }
};

const updateChatConversations = async (userData, table) => {
    try {
        console.log(`Updating chat conversations in ${table} for user ${userData.id}`);
        const querySnapshot = await firestore
            .collectionGroup(table)
            .where('senderID', '==', userData.id)
            .get();

        const batch = firestore.batch();
        let count = 0;
        const batchLimit = 500;
        const batches = [];

        querySnapshot.docs.forEach(doc => {
            const data = {};
            if (userData.firstName) data['senderFirstName'] = userData.firstName;
            if (userData.lastName) data['senderLastName'] = userData.lastName;
            if (userData.profilePictureURL) data['senderProfilePictureURL'] = userData.profilePictureURL;

            batch.set(doc.ref, data, { merge: true });
            count++;

            if (count === batchLimit) {
                batches.push(batch.commit());
                count = 0;
            }
        });

        if (count > 0) {
            batches.push(batch.commit());
        }

        await Promise.all(batches);
        console.log(`Successfully updated ${querySnapshot.size} documents in ${table}`);
    } catch (error) {
        console.error(`Error in updateChatConversations (${table}):`, error);
        throw error;
    }
};

const updateChatFeeds = async (userData, table) => {
    try {
        console.log(`Updating chat feeds in ${table} for user ${userData.id}`);
        const mySnapshot = await firestore
            .collection('social_feeds')
            .doc(userData.id)
            .collection(table)
            .get();

        for (const myDoc of mySnapshot.docs) {
            const channelID = myDoc.id;
            await updateSocialFeed(channelID, userData, 'chat_feed_live');
            await updateSocialFeed(channelID, userData, 'chat_feed_historical');

            const channelDoc = await firestore
                .collection('channels')
                .doc(channelID)
                .get();

            if (!channelDoc.exists) {
                console.log(`Channel ${channelID} not found`);
                continue;
            }

            const channelData = channelDoc.data();
            const participants = channelData.participants || [];
            const newParticipants = participants.map(p => 
                p.id === userData.id ? userData : p
            );

            await channelDoc.ref.set({ participants: newParticipants }, { merge: true });
        }
    } catch (error) {
        console.error(`Error in updateChatFeeds (${table}):`, error);
        throw error;
    }
};

const updateSocialFeed = async (channelID, userData, table) => {
    try {
        console.log(`Updating social feed ${table} for channel ${channelID}`);
        const querySnapshot = await firestore
            .collectionGroup(table)
            .where('id', '==', channelID)
            .get();

        const batch = firestore.batch();
        
        querySnapshot.docs.forEach(doc => {
            const prevData = doc.data();
            const participants = (prevData.participants || []).map(p =>
                p.id === userData.id ? userData : p
            );

            const data = { participants };
            if (participants.length === 1 && participants[0].id === userData.id) {
                data.name = `${userData.firstName} ${userData.lastName}`;
            }

            batch.set(doc.ref, data, { merge: true });
        });

        await batch.commit();
    } catch (error) {
        console.error(`Error in updateSocialFeed (${table}, ${channelID}):`, error);
        throw error;
    }
};

const updateAuthoredEntries = async (userData, collectionName) => {
    try {
        console.log(`Updating authored entries in ${collectionName} for user ${userData.id}`);
        const querySnapshot = await firestore
            .collectionGroup(collectionName)
            .where('authorID', '==', userData.id)
            .get();

        const batch = firestore.batch();
        let count = 0;
        const batchLimit = 500;
        const batches = [];

        querySnapshot.docs.forEach(doc => {
            batch.set(doc.ref, { author: userData }, { merge: true });
            count++;

            if (count === batchLimit) {
                batches.push(batch.commit());
                count = 0;
            }
        });

        if (count > 0) {
            batches.push(batch.commit());
        }

        await Promise.all(batches);
    } catch (error) {
        console.error(`Error in updateAuthoredEntries (${collectionName}):`, error);
        throw error;
    }
};
