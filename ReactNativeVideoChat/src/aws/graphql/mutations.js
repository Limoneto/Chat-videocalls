/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addFriendship = /* GraphQL */ `
  mutation AddFriendship($sourceUserID: String, $destUserID: String) {
    addFriendship(sourceUserID: $sourceUserID, destUserID: $destUserID)
  }
`;
export const unfriend = /* GraphQL */ `
  mutation Unfriend($sourceUserID: String, $destUserID: String) {
    unfriend(sourceUserID: $sourceUserID, destUserID: $destUserID)
  }
`;
export const unfollow = /* GraphQL */ `
  mutation Unfollow($sourceUserID: String, $destUserID: String) {
    unfollow(sourceUserID: $sourceUserID, destUserID: $destUserID)
  }
`;
export const onMessageCreated = /* GraphQL */ `
  mutation OnMessageCreated($messageID: String, $channelID: String) {
    onMessageCreated(messageID: $messageID, channelID: $channelID)
  }
`;
export const onChannelCreated = /* GraphQL */ `
  mutation OnChannelCreated($channelID: String) {
    onChannelCreated(channelID: $channelID) {
      id
      creatorID
      participants {
        id
        fullName
        username
        firstName
        lastName
        profilePictureKey
      }
      name
      admins
      channelID
      lastMessage
      lastMessageDate
      lastMessageSenderId
      lastThreadMessageId
      readUserIDs
      messages {
        items {
          id
          sender {
            id
            fullName
            username
            firstName
            lastName
            profilePictureKey
          }
          senderID
          participantProfilePictureURLs {
            participantId
            profilePictureURL
            profilePictureKey
          }
          content
          mentions {
            start
            end
            username
            id
            type
          }
          url {
            mime
            url
            urlKey
            fileID
          }
          senderProfilePictureURL
          senderProfilePictureKey
          senderFirstName
          readUserIDs
          inReplyToItem {
            senderFirstName
            senderLastName
            content
          }
          channelID
          createdAt
          updatedAt
        }
        nextToken
      }
      channelFeed {
        items {
          id
          creatorID
          channelID
          title
          content
          markedAsRead
          participants {
            id
            fullName
            username
            firstName
            lastName
            profilePictureKey
          }
          admins
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      typingUsers {
        userID
        isTyping
      }
      createdAt
      updatedAt
    }
  }
`;
export const markAsRead = /* GraphQL */ `
  mutation MarkAsRead(
    $channelID: String
    $userID: String
    $messageID: String
    $readUserIDs: [String]
  ) {
    markAsRead(
      channelID: $channelID
      userID: $userID
      messageID: $messageID
      readUserIDs: $readUserIDs
    )
  }
`;
export const deleteMessageAndUpdateChannel = /* GraphQL */ `
  mutation DeleteMessageAndUpdateChannel(
    $channelID: String
    $messageID: String
  ) {
    deleteMessageAndUpdateChannel(channelID: $channelID, messageID: $messageID)
  }
`;
export const leaveGroup = /* GraphQL */ `
  mutation LeaveGroup($channelID: String, $userID: String, $content: String) {
    leaveGroup(channelID: $channelID, userID: $userID, content: $content)
  }
`;
export const onGroupUpdate = /* GraphQL */ `
  mutation OnGroupUpdate(
    $channelID: String
    $userID: String
    $content: String
  ) {
    onGroupUpdate(channelID: $channelID, userID: $userID, content: $content)
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup($channelID: String) {
    deleteGroup(channelID: $channelID)
  }
`;
export const onMarkedAbuse = /* GraphQL */ `
  mutation OnMarkedAbuse($sourceUserID: String, $destUserID: String) {
    onMarkedAbuse(sourceUserID: $sourceUserID, destUserID: $destUserID)
  }
`;
export const unblockUser = /* GraphQL */ `
  mutation UnblockUser($sourceUserID: String!, $destUserID: String!) {
    unblockUser(sourceUserID: $sourceUserID, destUserID: $destUserID)
  }
`;
export const addComment = /* GraphQL */ `
  mutation AddComment(
    $postID: String!
    $authorID: String!
    $commentText: String!
  ) {
    addComment(postID: $postID, authorID: $authorID, commentText: $commentText)
  }
`;
export const addReaction = /* GraphQL */ `
  mutation AddReaction(
    $postID: String!
    $authorID: String!
    $reaction: String!
  ) {
    addReaction(postID: $postID, authorID: $authorID, reaction: $reaction)
  }
`;
export const createChannelFeed = /* GraphQL */ `
  mutation CreateChannelFeed(
    $input: CreateChannelFeedInput!
    $condition: ModelChannelFeedConditionInput
  ) {
    createChannelFeed(input: $input, condition: $condition) {
      id
      creatorID
      channelID
      title
      content
      markedAsRead
      participants {
        id
        fullName
        username
        firstName
        lastName
        profilePictureKey
      }
      admins
      userID
      createdAt
      updatedAt
    }
  }
`;
export const updateChannelFeed = /* GraphQL */ `
  mutation UpdateChannelFeed(
    $input: UpdateChannelFeedInput!
    $condition: ModelChannelFeedConditionInput
  ) {
    updateChannelFeed(input: $input, condition: $condition) {
      id
      creatorID
      channelID
      title
      content
      markedAsRead
      participants {
        id
        fullName
        username
        firstName
        lastName
        profilePictureKey
      }
      admins
      userID
      createdAt
      updatedAt
    }
  }
`;
export const deleteChannelFeed = /* GraphQL */ `
  mutation DeleteChannelFeed(
    $input: DeleteChannelFeedInput!
    $condition: ModelChannelFeedConditionInput
  ) {
    deleteChannelFeed(input: $input, condition: $condition) {
      id
      creatorID
      channelID
      title
      content
      markedAsRead
      participants {
        id
        fullName
        username
        firstName
        lastName
        profilePictureKey
      }
      admins
      userID
      createdAt
      updatedAt
    }
  }
`;
export const createChannel = /* GraphQL */ `
  mutation CreateChannel(
    $input: CreateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    createChannel(input: $input, condition: $condition) {
      id
      creatorID
      participants {
        id
        fullName
        username
        firstName
        lastName
        profilePictureKey
      }
      name
      admins
      channelID
      lastMessage
      lastMessageDate
      lastMessageSenderId
      lastThreadMessageId
      readUserIDs
      messages {
        items {
          id
          sender {
            id
            fullName
            username
            firstName
            lastName
            profilePictureKey
          }
          senderID
          participantProfilePictureURLs {
            participantId
            profilePictureURL
            profilePictureKey
          }
          content
          mentions {
            start
            end
            username
            id
            type
          }
          url {
            mime
            url
            urlKey
            fileID
          }
          senderProfilePictureURL
          senderProfilePictureKey
          senderFirstName
          readUserIDs
          inReplyToItem {
            senderFirstName
            senderLastName
            content
          }
          channelID
          createdAt
          updatedAt
        }
        nextToken
      }
      channelFeed {
        items {
          id
          creatorID
          channelID
          title
          content
          markedAsRead
          participants {
            id
            fullName
            username
            firstName
            lastName
            profilePictureKey
          }
          admins
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      typingUsers {
        userID
        isTyping
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChannel = /* GraphQL */ `
  mutation UpdateChannel(
    $input: UpdateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    updateChannel(input: $input, condition: $condition) {
      id
      creatorID
      participants {
        id
        fullName
        username
        firstName
        lastName
        profilePictureKey
      }
      name
      admins
      channelID
      lastMessage
      lastMessageDate
      lastMessageSenderId
      lastThreadMessageId
      readUserIDs
      messages {
        items {
          id
          sender {
            id
            fullName
            username
            firstName
            lastName
            profilePictureKey
          }
          senderID
          participantProfilePictureURLs {
            participantId
            profilePictureURL
            profilePictureKey
          }
          content
          mentions {
            start
            end
            username
            id
            type
          }
          url {
            mime
            url
            urlKey
            fileID
          }
          senderProfilePictureURL
          senderProfilePictureKey
          senderFirstName
          readUserIDs
          inReplyToItem {
            senderFirstName
            senderLastName
            content
          }
          channelID
          createdAt
          updatedAt
        }
        nextToken
      }
      channelFeed {
        items {
          id
          creatorID
          channelID
          title
          content
          markedAsRead
          participants {
            id
            fullName
            username
            firstName
            lastName
            profilePictureKey
          }
          admins
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      typingUsers {
        userID
        isTyping
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChannel = /* GraphQL */ `
  mutation DeleteChannel(
    $input: DeleteChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    deleteChannel(input: $input, condition: $condition) {
      id
      creatorID
      participants {
        id
        fullName
        username
        firstName
        lastName
        profilePictureKey
      }
      name
      admins
      channelID
      lastMessage
      lastMessageDate
      lastMessageSenderId
      lastThreadMessageId
      readUserIDs
      messages {
        items {
          id
          sender {
            id
            fullName
            username
            firstName
            lastName
            profilePictureKey
          }
          senderID
          participantProfilePictureURLs {
            participantId
            profilePictureURL
            profilePictureKey
          }
          content
          mentions {
            start
            end
            username
            id
            type
          }
          url {
            mime
            url
            urlKey
            fileID
          }
          senderProfilePictureURL
          senderProfilePictureKey
          senderFirstName
          readUserIDs
          inReplyToItem {
            senderFirstName
            senderLastName
            content
          }
          channelID
          createdAt
          updatedAt
        }
        nextToken
      }
      channelFeed {
        items {
          id
          creatorID
          channelID
          title
          content
          markedAsRead
          participants {
            id
            fullName
            username
            firstName
            lastName
            profilePictureKey
          }
          admins
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      typingUsers {
        userID
        isTyping
      }
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      sender {
        id
        fullName
        username
        firstName
        lastName
        profilePictureKey
      }
      senderID
      participantProfilePictureURLs {
        participantId
        profilePictureURL
        profilePictureKey
      }
      content
      mentions {
        start
        end
        username
        id
        type
      }
      url {
        mime
        url
        urlKey
        fileID
      }
      senderProfilePictureURL
      senderProfilePictureKey
      senderFirstName
      readUserIDs
      inReplyToItem {
        senderFirstName
        senderLastName
        content
      }
      channelID
      createdAt
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      sender {
        id
        fullName
        username
        firstName
        lastName
        profilePictureKey
      }
      senderID
      participantProfilePictureURLs {
        participantId
        profilePictureURL
        profilePictureKey
      }
      content
      mentions {
        start
        end
        username
        id
        type
      }
      url {
        mime
        url
        urlKey
        fileID
      }
      senderProfilePictureURL
      senderProfilePictureKey
      senderFirstName
      readUserIDs
      inReplyToItem {
        senderFirstName
        senderLastName
        content
      }
      channelID
      createdAt
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      sender {
        id
        fullName
        username
        firstName
        lastName
        profilePictureKey
      }
      senderID
      participantProfilePictureURLs {
        participantId
        profilePictureURL
        profilePictureKey
      }
      content
      mentions {
        start
        end
        username
        id
        type
      }
      url {
        mime
        url
        urlKey
        fileID
      }
      senderProfilePictureURL
      senderProfilePictureKey
      senderFirstName
      readUserIDs
      inReplyToItem {
        senderFirstName
        senderLastName
        content
      }
      channelID
      createdAt
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      postText
      reactionsCount
      commentCount
      location
      postMedia {
        url
        thumbnailURL
        mime
        urlKey
      }
      mentions {
        start
        end
        username
        id
        type
      }
      hashtags
      reactions {
        like
        love
        laugh
        angry
        suprised
        cry
        sad
      }
      comments {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          commentText
          postID
        }
        nextToken
      }
      postFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          postID
          post {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      entityPostFeed {
        items {
          id
          postID
          post {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          hashtag
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      postText
      reactionsCount
      commentCount
      location
      postMedia {
        url
        thumbnailURL
        mime
        urlKey
      }
      mentions {
        start
        end
        username
        id
        type
      }
      hashtags
      reactions {
        like
        love
        laugh
        angry
        suprised
        cry
        sad
      }
      comments {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          commentText
          postID
        }
        nextToken
      }
      postFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          postID
          post {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      entityPostFeed {
        items {
          id
          postID
          post {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          hashtag
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      postText
      reactionsCount
      commentCount
      location
      postMedia {
        url
        thumbnailURL
        mime
        urlKey
      }
      mentions {
        start
        end
        username
        id
        type
      }
      hashtags
      reactions {
        like
        love
        laugh
        angry
        suprised
        cry
        sad
      }
      comments {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          commentText
          postID
        }
        nextToken
      }
      postFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          postID
          post {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      entityPostFeed {
        items {
          id
          postID
          post {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          hashtag
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createPostFeed = /* GraphQL */ `
  mutation CreatePostFeed(
    $input: CreatePostFeedInput!
    $condition: ModelPostFeedConditionInput
  ) {
    createPostFeed(input: $input, condition: $condition) {
      id
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      destUserID
      postID
      post {
        id
        createdAt
        updatedAt
        authorID
        author {
          id
          username
          email
          firstName
          lastName
          fullName
          phone
          profilePictureKey
          profilePictureURL
          location {
            longitude
            latitude
          }
          signUpLocation {
            longitude
            latitude
          }
          lastOnlineTimestamp
          friendships {
            nextToken
          }
          mutualFriendships {
            nextToken
          }
          unmutualFriendships {
            nextToken
          }
          chatChannelFeed {
            nextToken
          }
          userReports {
            nextToken
          }
          posts {
            nextToken
          }
          comments {
            nextToken
          }
          stories {
            nextToken
          }
          postFeed {
            nextToken
          }
          storyFeed {
            nextToken
          }
          createdAt
          updatedAt
        }
        postText
        reactionsCount
        commentCount
        location
        postMedia {
          url
          thumbnailURL
          mime
          urlKey
        }
        mentions {
          start
          end
          username
          id
          type
        }
        hashtags
        reactions {
          like
          love
          laugh
          angry
          suprised
          cry
          sad
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        entityPostFeed {
          items {
            id
            postID
            hashtag
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePostFeed = /* GraphQL */ `
  mutation UpdatePostFeed(
    $input: UpdatePostFeedInput!
    $condition: ModelPostFeedConditionInput
  ) {
    updatePostFeed(input: $input, condition: $condition) {
      id
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      destUserID
      postID
      post {
        id
        createdAt
        updatedAt
        authorID
        author {
          id
          username
          email
          firstName
          lastName
          fullName
          phone
          profilePictureKey
          profilePictureURL
          location {
            longitude
            latitude
          }
          signUpLocation {
            longitude
            latitude
          }
          lastOnlineTimestamp
          friendships {
            nextToken
          }
          mutualFriendships {
            nextToken
          }
          unmutualFriendships {
            nextToken
          }
          chatChannelFeed {
            nextToken
          }
          userReports {
            nextToken
          }
          posts {
            nextToken
          }
          comments {
            nextToken
          }
          stories {
            nextToken
          }
          postFeed {
            nextToken
          }
          storyFeed {
            nextToken
          }
          createdAt
          updatedAt
        }
        postText
        reactionsCount
        commentCount
        location
        postMedia {
          url
          thumbnailURL
          mime
          urlKey
        }
        mentions {
          start
          end
          username
          id
          type
        }
        hashtags
        reactions {
          like
          love
          laugh
          angry
          suprised
          cry
          sad
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        entityPostFeed {
          items {
            id
            postID
            hashtag
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePostFeed = /* GraphQL */ `
  mutation DeletePostFeed(
    $input: DeletePostFeedInput!
    $condition: ModelPostFeedConditionInput
  ) {
    deletePostFeed(input: $input, condition: $condition) {
      id
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      destUserID
      postID
      post {
        id
        createdAt
        updatedAt
        authorID
        author {
          id
          username
          email
          firstName
          lastName
          fullName
          phone
          profilePictureKey
          profilePictureURL
          location {
            longitude
            latitude
          }
          signUpLocation {
            longitude
            latitude
          }
          lastOnlineTimestamp
          friendships {
            nextToken
          }
          mutualFriendships {
            nextToken
          }
          unmutualFriendships {
            nextToken
          }
          chatChannelFeed {
            nextToken
          }
          userReports {
            nextToken
          }
          posts {
            nextToken
          }
          comments {
            nextToken
          }
          stories {
            nextToken
          }
          postFeed {
            nextToken
          }
          storyFeed {
            nextToken
          }
          createdAt
          updatedAt
        }
        postText
        reactionsCount
        commentCount
        location
        postMedia {
          url
          thumbnailURL
          mime
          urlKey
        }
        mentions {
          start
          end
          username
          id
          type
        }
        hashtags
        reactions {
          like
          love
          laugh
          angry
          suprised
          cry
          sad
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        entityPostFeed {
          items {
            id
            postID
            hashtag
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const createEntityPostFeed = /* GraphQL */ `
  mutation CreateEntityPostFeed(
    $input: CreateEntityPostFeedInput!
    $condition: ModelEntityPostFeedConditionInput
  ) {
    createEntityPostFeed(input: $input, condition: $condition) {
      id
      postID
      post {
        id
        createdAt
        updatedAt
        authorID
        author {
          id
          username
          email
          firstName
          lastName
          fullName
          phone
          profilePictureKey
          profilePictureURL
          location {
            longitude
            latitude
          }
          signUpLocation {
            longitude
            latitude
          }
          lastOnlineTimestamp
          friendships {
            nextToken
          }
          mutualFriendships {
            nextToken
          }
          unmutualFriendships {
            nextToken
          }
          chatChannelFeed {
            nextToken
          }
          userReports {
            nextToken
          }
          posts {
            nextToken
          }
          comments {
            nextToken
          }
          stories {
            nextToken
          }
          postFeed {
            nextToken
          }
          storyFeed {
            nextToken
          }
          createdAt
          updatedAt
        }
        postText
        reactionsCount
        commentCount
        location
        postMedia {
          url
          thumbnailURL
          mime
          urlKey
        }
        mentions {
          start
          end
          username
          id
          type
        }
        hashtags
        reactions {
          like
          love
          laugh
          angry
          suprised
          cry
          sad
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        entityPostFeed {
          items {
            id
            postID
            hashtag
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      hashtag
      createdAt
      updatedAt
    }
  }
`;
export const updateEntityPostFeed = /* GraphQL */ `
  mutation UpdateEntityPostFeed(
    $input: UpdateEntityPostFeedInput!
    $condition: ModelEntityPostFeedConditionInput
  ) {
    updateEntityPostFeed(input: $input, condition: $condition) {
      id
      postID
      post {
        id
        createdAt
        updatedAt
        authorID
        author {
          id
          username
          email
          firstName
          lastName
          fullName
          phone
          profilePictureKey
          profilePictureURL
          location {
            longitude
            latitude
          }
          signUpLocation {
            longitude
            latitude
          }
          lastOnlineTimestamp
          friendships {
            nextToken
          }
          mutualFriendships {
            nextToken
          }
          unmutualFriendships {
            nextToken
          }
          chatChannelFeed {
            nextToken
          }
          userReports {
            nextToken
          }
          posts {
            nextToken
          }
          comments {
            nextToken
          }
          stories {
            nextToken
          }
          postFeed {
            nextToken
          }
          storyFeed {
            nextToken
          }
          createdAt
          updatedAt
        }
        postText
        reactionsCount
        commentCount
        location
        postMedia {
          url
          thumbnailURL
          mime
          urlKey
        }
        mentions {
          start
          end
          username
          id
          type
        }
        hashtags
        reactions {
          like
          love
          laugh
          angry
          suprised
          cry
          sad
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        entityPostFeed {
          items {
            id
            postID
            hashtag
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      hashtag
      createdAt
      updatedAt
    }
  }
`;
export const deleteEntityPostFeed = /* GraphQL */ `
  mutation DeleteEntityPostFeed(
    $input: DeleteEntityPostFeedInput!
    $condition: ModelEntityPostFeedConditionInput
  ) {
    deleteEntityPostFeed(input: $input, condition: $condition) {
      id
      postID
      post {
        id
        createdAt
        updatedAt
        authorID
        author {
          id
          username
          email
          firstName
          lastName
          fullName
          phone
          profilePictureKey
          profilePictureURL
          location {
            longitude
            latitude
          }
          signUpLocation {
            longitude
            latitude
          }
          lastOnlineTimestamp
          friendships {
            nextToken
          }
          mutualFriendships {
            nextToken
          }
          unmutualFriendships {
            nextToken
          }
          chatChannelFeed {
            nextToken
          }
          userReports {
            nextToken
          }
          posts {
            nextToken
          }
          comments {
            nextToken
          }
          stories {
            nextToken
          }
          postFeed {
            nextToken
          }
          storyFeed {
            nextToken
          }
          createdAt
          updatedAt
        }
        postText
        reactionsCount
        commentCount
        location
        postMedia {
          url
          thumbnailURL
          mime
          urlKey
        }
        mentions {
          start
          end
          username
          id
          type
        }
        hashtags
        reactions {
          like
          love
          laugh
          angry
          suprised
          cry
          sad
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        entityPostFeed {
          items {
            id
            postID
            hashtag
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      hashtag
      createdAt
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      commentText
      postID
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      commentText
      postID
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      commentText
      postID
    }
  }
`;
export const createStory = /* GraphQL */ `
  mutation CreateStory(
    $input: CreateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    createStory(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      storyMediaURL
      storyType
      viewsCount
      reactionsCount
      storyFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          storyID
          story {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateStory = /* GraphQL */ `
  mutation UpdateStory(
    $input: UpdateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    updateStory(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      storyMediaURL
      storyType
      viewsCount
      reactionsCount
      storyFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          storyID
          story {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteStory = /* GraphQL */ `
  mutation DeleteStory(
    $input: DeleteStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    deleteStory(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      storyMediaURL
      storyType
      viewsCount
      reactionsCount
      storyFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          storyID
          story {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createStoryFeed = /* GraphQL */ `
  mutation CreateStoryFeed(
    $input: CreateStoryFeedInput!
    $condition: ModelStoryFeedConditionInput
  ) {
    createStoryFeed(input: $input, condition: $condition) {
      id
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      destUserID
      storyID
      story {
        id
        createdAt
        updatedAt
        authorID
        author {
          id
          username
          email
          firstName
          lastName
          fullName
          phone
          profilePictureKey
          profilePictureURL
          location {
            longitude
            latitude
          }
          signUpLocation {
            longitude
            latitude
          }
          lastOnlineTimestamp
          friendships {
            nextToken
          }
          mutualFriendships {
            nextToken
          }
          unmutualFriendships {
            nextToken
          }
          chatChannelFeed {
            nextToken
          }
          userReports {
            nextToken
          }
          posts {
            nextToken
          }
          comments {
            nextToken
          }
          stories {
            nextToken
          }
          postFeed {
            nextToken
          }
          storyFeed {
            nextToken
          }
          createdAt
          updatedAt
        }
        storyMediaURL
        storyType
        viewsCount
        reactionsCount
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateStoryFeed = /* GraphQL */ `
  mutation UpdateStoryFeed(
    $input: UpdateStoryFeedInput!
    $condition: ModelStoryFeedConditionInput
  ) {
    updateStoryFeed(input: $input, condition: $condition) {
      id
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      destUserID
      storyID
      story {
        id
        createdAt
        updatedAt
        authorID
        author {
          id
          username
          email
          firstName
          lastName
          fullName
          phone
          profilePictureKey
          profilePictureURL
          location {
            longitude
            latitude
          }
          signUpLocation {
            longitude
            latitude
          }
          lastOnlineTimestamp
          friendships {
            nextToken
          }
          mutualFriendships {
            nextToken
          }
          unmutualFriendships {
            nextToken
          }
          chatChannelFeed {
            nextToken
          }
          userReports {
            nextToken
          }
          posts {
            nextToken
          }
          comments {
            nextToken
          }
          stories {
            nextToken
          }
          postFeed {
            nextToken
          }
          storyFeed {
            nextToken
          }
          createdAt
          updatedAt
        }
        storyMediaURL
        storyType
        viewsCount
        reactionsCount
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteStoryFeed = /* GraphQL */ `
  mutation DeleteStoryFeed(
    $input: DeleteStoryFeedInput!
    $condition: ModelStoryFeedConditionInput
  ) {
    deleteStoryFeed(input: $input, condition: $condition) {
      id
      authorID
      author {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      destUserID
      storyID
      story {
        id
        createdAt
        updatedAt
        authorID
        author {
          id
          username
          email
          firstName
          lastName
          fullName
          phone
          profilePictureKey
          profilePictureURL
          location {
            longitude
            latitude
          }
          signUpLocation {
            longitude
            latitude
          }
          lastOnlineTimestamp
          friendships {
            nextToken
          }
          mutualFriendships {
            nextToken
          }
          unmutualFriendships {
            nextToken
          }
          chatChannelFeed {
            nextToken
          }
          userReports {
            nextToken
          }
          posts {
            nextToken
          }
          comments {
            nextToken
          }
          stories {
            nextToken
          }
          postFeed {
            nextToken
          }
          storyFeed {
            nextToken
          }
          createdAt
          updatedAt
        }
        storyMediaURL
        storyType
        viewsCount
        reactionsCount
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFriendship = /* GraphQL */ `
  mutation CreateFriendship(
    $input: CreateFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    createFriendship(input: $input, condition: $condition) {
      id
      sourceUserID
      destUserID
      type
      user {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateFriendship = /* GraphQL */ `
  mutation UpdateFriendship(
    $input: UpdateFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    updateFriendship(input: $input, condition: $condition) {
      id
      sourceUserID
      destUserID
      type
      user {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteFriendship = /* GraphQL */ `
  mutation DeleteFriendship(
    $input: DeleteFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    deleteFriendship(input: $input, condition: $condition) {
      id
      sourceUserID
      destUserID
      type
      user {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createMutualFriendship = /* GraphQL */ `
  mutation CreateMutualFriendship(
    $input: CreateMutualFriendshipInput!
    $condition: ModelMutualFriendshipConditionInput
  ) {
    createMutualFriendship(input: $input, condition: $condition) {
      id
      sourceUserID
      destUserID
      type
      user {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateMutualFriendship = /* GraphQL */ `
  mutation UpdateMutualFriendship(
    $input: UpdateMutualFriendshipInput!
    $condition: ModelMutualFriendshipConditionInput
  ) {
    updateMutualFriendship(input: $input, condition: $condition) {
      id
      sourceUserID
      destUserID
      type
      user {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteMutualFriendship = /* GraphQL */ `
  mutation DeleteMutualFriendship(
    $input: DeleteMutualFriendshipInput!
    $condition: ModelMutualFriendshipConditionInput
  ) {
    deleteMutualFriendship(input: $input, condition: $condition) {
      id
      sourceUserID
      destUserID
      type
      user {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUnmutualFriendship = /* GraphQL */ `
  mutation CreateUnmutualFriendship(
    $input: CreateUnmutualFriendshipInput!
    $condition: ModelUnmutualFriendshipConditionInput
  ) {
    createUnmutualFriendship(input: $input, condition: $condition) {
      id
      sourceUserID
      destUserID
      type
      user {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUnmutualFriendship = /* GraphQL */ `
  mutation UpdateUnmutualFriendship(
    $input: UpdateUnmutualFriendshipInput!
    $condition: ModelUnmutualFriendshipConditionInput
  ) {
    updateUnmutualFriendship(input: $input, condition: $condition) {
      id
      sourceUserID
      destUserID
      type
      user {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUnmutualFriendship = /* GraphQL */ `
  mutation DeleteUnmutualFriendship(
    $input: DeleteUnmutualFriendshipInput!
    $condition: ModelUnmutualFriendshipConditionInput
  ) {
    deleteUnmutualFriendship(input: $input, condition: $condition) {
      id
      sourceUserID
      destUserID
      type
      user {
        id
        username
        email
        firstName
        lastName
        fullName
        phone
        profilePictureKey
        profilePictureURL
        location {
          longitude
          latitude
        }
        signUpLocation {
          longitude
          latitude
        }
        lastOnlineTimestamp
        friendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        mutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        unmutualFriendships {
          items {
            id
            sourceUserID
            destUserID
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        chatChannelFeed {
          items {
            id
            creatorID
            channelID
            title
            content
            markedAsRead
            admins
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        userReports {
          items {
            id
            dest
            source
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        posts {
          items {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          nextToken
        }
        comments {
          items {
            id
            createdAt
            updatedAt
            authorID
            commentText
            postID
          }
          nextToken
        }
        stories {
          items {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          nextToken
        }
        postFeed {
          items {
            id
            authorID
            destUserID
            postID
            createdAt
            updatedAt
          }
          nextToken
        }
        storyFeed {
          items {
            id
            authorID
            destUserID
            storyID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      firstName
      lastName
      fullName
      phone
      profilePictureKey
      profilePictureURL
      location {
        longitude
        latitude
      }
      signUpLocation {
        longitude
        latitude
      }
      lastOnlineTimestamp
      friendships {
        items {
          id
          sourceUserID
          destUserID
          type
          user {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      mutualFriendships {
        items {
          id
          sourceUserID
          destUserID
          type
          user {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      unmutualFriendships {
        items {
          id
          sourceUserID
          destUserID
          type
          user {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      chatChannelFeed {
        items {
          id
          creatorID
          channelID
          title
          content
          markedAsRead
          participants {
            id
            fullName
            username
            firstName
            lastName
            profilePictureKey
          }
          admins
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      userReports {
        items {
          id
          dest
          source
          user {
            id
            lastName
            firstName
            fullName
            email
            profilePictureURL
            profilePictureKey
          }
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      posts {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          postText
          reactionsCount
          commentCount
          location
          postMedia {
            url
            thumbnailURL
            mime
            urlKey
          }
          mentions {
            start
            end
            username
            id
            type
          }
          hashtags
          reactions {
            like
            love
            laugh
            angry
            suprised
            cry
            sad
          }
          comments {
            nextToken
          }
          postFeed {
            nextToken
          }
          entityPostFeed {
            nextToken
          }
        }
        nextToken
      }
      comments {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          commentText
          postID
        }
        nextToken
      }
      stories {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          storyMediaURL
          storyType
          viewsCount
          reactionsCount
          storyFeed {
            nextToken
          }
        }
        nextToken
      }
      postFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          postID
          post {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      storyFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          storyID
          story {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      firstName
      lastName
      fullName
      phone
      profilePictureKey
      profilePictureURL
      location {
        longitude
        latitude
      }
      signUpLocation {
        longitude
        latitude
      }
      lastOnlineTimestamp
      friendships {
        items {
          id
          sourceUserID
          destUserID
          type
          user {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      mutualFriendships {
        items {
          id
          sourceUserID
          destUserID
          type
          user {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      unmutualFriendships {
        items {
          id
          sourceUserID
          destUserID
          type
          user {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      chatChannelFeed {
        items {
          id
          creatorID
          channelID
          title
          content
          markedAsRead
          participants {
            id
            fullName
            username
            firstName
            lastName
            profilePictureKey
          }
          admins
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      userReports {
        items {
          id
          dest
          source
          user {
            id
            lastName
            firstName
            fullName
            email
            profilePictureURL
            profilePictureKey
          }
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      posts {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          postText
          reactionsCount
          commentCount
          location
          postMedia {
            url
            thumbnailURL
            mime
            urlKey
          }
          mentions {
            start
            end
            username
            id
            type
          }
          hashtags
          reactions {
            like
            love
            laugh
            angry
            suprised
            cry
            sad
          }
          comments {
            nextToken
          }
          postFeed {
            nextToken
          }
          entityPostFeed {
            nextToken
          }
        }
        nextToken
      }
      comments {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          commentText
          postID
        }
        nextToken
      }
      stories {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          storyMediaURL
          storyType
          viewsCount
          reactionsCount
          storyFeed {
            nextToken
          }
        }
        nextToken
      }
      postFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          postID
          post {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      storyFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          storyID
          story {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      firstName
      lastName
      fullName
      phone
      profilePictureKey
      profilePictureURL
      location {
        longitude
        latitude
      }
      signUpLocation {
        longitude
        latitude
      }
      lastOnlineTimestamp
      friendships {
        items {
          id
          sourceUserID
          destUserID
          type
          user {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      mutualFriendships {
        items {
          id
          sourceUserID
          destUserID
          type
          user {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      unmutualFriendships {
        items {
          id
          sourceUserID
          destUserID
          type
          user {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      chatChannelFeed {
        items {
          id
          creatorID
          channelID
          title
          content
          markedAsRead
          participants {
            id
            fullName
            username
            firstName
            lastName
            profilePictureKey
          }
          admins
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      userReports {
        items {
          id
          dest
          source
          user {
            id
            lastName
            firstName
            fullName
            email
            profilePictureURL
            profilePictureKey
          }
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      posts {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          postText
          reactionsCount
          commentCount
          location
          postMedia {
            url
            thumbnailURL
            mime
            urlKey
          }
          mentions {
            start
            end
            username
            id
            type
          }
          hashtags
          reactions {
            like
            love
            laugh
            angry
            suprised
            cry
            sad
          }
          comments {
            nextToken
          }
          postFeed {
            nextToken
          }
          entityPostFeed {
            nextToken
          }
        }
        nextToken
      }
      comments {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          commentText
          postID
        }
        nextToken
      }
      stories {
        items {
          id
          createdAt
          updatedAt
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          storyMediaURL
          storyType
          viewsCount
          reactionsCount
          storyFeed {
            nextToken
          }
        }
        nextToken
      }
      postFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          postID
          post {
            id
            createdAt
            updatedAt
            authorID
            postText
            reactionsCount
            commentCount
            location
            hashtags
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      storyFeed {
        items {
          id
          authorID
          author {
            id
            username
            email
            firstName
            lastName
            fullName
            phone
            profilePictureKey
            profilePictureURL
            lastOnlineTimestamp
            createdAt
            updatedAt
          }
          destUserID
          storyID
          story {
            id
            createdAt
            updatedAt
            authorID
            storyMediaURL
            storyType
            viewsCount
            reactionsCount
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUserReport = /* GraphQL */ `
  mutation CreateUserReport(
    $input: CreateUserReportInput!
    $condition: ModelUserReportConditionInput
  ) {
    createUserReport(input: $input, condition: $condition) {
      id
      dest
      source
      user {
        id
        lastName
        firstName
        fullName
        email
        profilePictureURL
        profilePictureKey
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateUserReport = /* GraphQL */ `
  mutation UpdateUserReport(
    $input: UpdateUserReportInput!
    $condition: ModelUserReportConditionInput
  ) {
    updateUserReport(input: $input, condition: $condition) {
      id
      dest
      source
      user {
        id
        lastName
        firstName
        fullName
        email
        profilePictureURL
        profilePictureKey
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserReport = /* GraphQL */ `
  mutation DeleteUserReport(
    $input: DeleteUserReportInput!
    $condition: ModelUserReportConditionInput
  ) {
    deleteUserReport(input: $input, condition: $condition) {
      id
      dest
      source
      user {
        id
        lastName
        firstName
        fullName
        email
        profilePictureURL
        profilePictureKey
      }
      type
      createdAt
      updatedAt
    }
  }
`;
