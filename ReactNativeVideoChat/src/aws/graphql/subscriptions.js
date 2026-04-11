/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUserChannelFeedUpdate = /* GraphQL */ `
  subscription OnUserChannelFeedUpdate($userID: ID!) {
    onUserChannelFeedUpdate(userID: $userID) {
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
export const onSingleChannelUpdate = /* GraphQL */ `
  subscription OnSingleChannelUpdate($channelID: ID!) {
    onSingleChannelUpdate(channelID: $channelID) {
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
export const onChannelMessageUpdate = /* GraphQL */ `
  subscription OnChannelMessageUpdate($channelID: ID!) {
    onChannelMessageUpdate(channelID: $channelID) {
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
export const onUserFriendshipUpdate = /* GraphQL */ `
  subscription OnUserFriendshipUpdate($sourceUserID: ID!) {
    onUserFriendshipUpdate(sourceUserID: $sourceUserID) {
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
export const onUserMutualFriendshipUpdate = /* GraphQL */ `
  subscription OnUserMutualFriendshipUpdate($sourceUserID: ID!) {
    onUserMutualFriendshipUpdate(sourceUserID: $sourceUserID) {
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
export const onUserReportUpdate = /* GraphQL */ `
  subscription OnUserReportUpdate($source: ID!) {
    onUserReportUpdate(source: $source) {
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
export const onDestUserStoryFeedUpdate = /* GraphQL */ `
  subscription OnDestUserStoryFeedUpdate($destUserID: ID!) {
    onDestUserStoryFeedUpdate(destUserID: $destUserID) {
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
export const onAuthorPostFeedUpdate = /* GraphQL */ `
  subscription OnAuthorPostFeedUpdate($authorID: ID!) {
    onAuthorPostFeedUpdate(authorID: $authorID) {
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
export const onDestUserPostFeedUpdate = /* GraphQL */ `
  subscription OnDestUserPostFeedUpdate($destUserID: ID!) {
    onDestUserPostFeedUpdate(destUserID: $destUserID) {
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
export const onPostCommentsUpdate = /* GraphQL */ `
  subscription OnPostCommentsUpdate($postID: ID!) {
    onPostCommentsUpdate(postID: $postID) {
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
export const onEntityPostFeedUpdate = /* GraphQL */ `
  subscription OnEntityPostFeedUpdate($hashtag: String!) {
    onEntityPostFeedUpdate(hashtag: $hashtag) {
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
export const onSinglePostUpdate = /* GraphQL */ `
  subscription OnSinglePostUpdate($id: String!) {
    onSinglePostUpdate(id: $id) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreatePostFeed = /* GraphQL */ `
  subscription OnCreatePostFeed {
    onCreatePostFeed {
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
export const onUpdatePostFeed = /* GraphQL */ `
  subscription OnUpdatePostFeed {
    onUpdatePostFeed {
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
export const onDeletePostFeed = /* GraphQL */ `
  subscription OnDeletePostFeed {
    onDeletePostFeed {
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
export const onCreateEntityPostFeed = /* GraphQL */ `
  subscription OnCreateEntityPostFeed {
    onCreateEntityPostFeed {
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
export const onUpdateEntityPostFeed = /* GraphQL */ `
  subscription OnUpdateEntityPostFeed {
    onUpdateEntityPostFeed {
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
export const onDeleteEntityPostFeed = /* GraphQL */ `
  subscription OnDeleteEntityPostFeed {
    onDeleteEntityPostFeed {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateStory = /* GraphQL */ `
  subscription OnCreateStory {
    onCreateStory {
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
export const onUpdateStory = /* GraphQL */ `
  subscription OnUpdateStory {
    onUpdateStory {
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
export const onDeleteStory = /* GraphQL */ `
  subscription OnDeleteStory {
    onDeleteStory {
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
export const onCreateStoryFeed = /* GraphQL */ `
  subscription OnCreateStoryFeed {
    onCreateStoryFeed {
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
export const onUpdateStoryFeed = /* GraphQL */ `
  subscription OnUpdateStoryFeed {
    onUpdateStoryFeed {
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
export const onDeleteStoryFeed = /* GraphQL */ `
  subscription OnDeleteStoryFeed {
    onDeleteStoryFeed {
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
export const onCreateFriendship = /* GraphQL */ `
  subscription OnCreateFriendship {
    onCreateFriendship {
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
export const onUpdateFriendship = /* GraphQL */ `
  subscription OnUpdateFriendship {
    onUpdateFriendship {
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
export const onDeleteFriendship = /* GraphQL */ `
  subscription OnDeleteFriendship {
    onDeleteFriendship {
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
