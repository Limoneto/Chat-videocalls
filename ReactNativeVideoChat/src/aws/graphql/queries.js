/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const fetchProfile = /* GraphQL */ `
  query FetchProfile($viewerID: String!, $profileID: String!) {
    fetchProfile(viewerID: $viewerID, profileID: $profileID) {
      profileData {
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
        success
        friends {
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
        moreFriendsAvailable
        actionButtonType
      }
      success
    }
  }
`;
export const fetchOtherUserFriendships = /* GraphQL */ `
  query FetchOtherUserFriendships(
    $viewerID: String!
    $userID: String!
    $type: String!
    $limit: String!
    $nextToken: String!
  ) {
    fetchOtherUserFriendships(
      viewerID: $viewerID
      userID: $userID
      type: $type
      limit: $limit
      nextToken: $nextToken
    ) {
      friendships {
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
        createdAt
        updatedAt
      }
      success
    }
  }
`;
export const onSearchUsers = /* GraphQL */ `
  query OnSearchUsers(
    $userID: String!
    $keyword: String!
    $nextToken: String
    $limit: Int
  ) {
    onSearchUsers(
      userID: $userID
      keyword: $keyword
      nextToken: $nextToken
      limit: $limit
    ) {
      items {
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
      nextToken
    }
  }
`;
export const fetchDiscoverFeedPosts = /* GraphQL */ `
  query FetchDiscoverFeedPosts(
    $userID: String!
    $nextToken: String
    $limit: Int
  ) {
    fetchDiscoverFeedPosts(
      userID: $userID
      nextToken: $nextToken
      limit: $limit
    ) {
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
      success
      nextToken
    }
  }
`;
export const fetchHashtagFeedPosts = /* GraphQL */ `
  query FetchHashtagFeedPosts(
    $userID: String!
    $hashtag: String!
    $nextToken: String
    $limit: Int
  ) {
    fetchHashtagFeedPosts(
      userID: $userID
      hashtag: $hashtag
      nextToken: $nextToken
      limit: $limit
    ) {
      items {
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
        hashtag
        createdAt
        updatedAt
      }
      success
      nextToken
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: [SearchableUserSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAggregationInput]
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
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
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getChannelFeed = /* GraphQL */ `
  query GetChannelFeed($id: String!) {
    getChannelFeed(id: $id) {
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
export const listChannelFeeds = /* GraphQL */ `
  query ListChannelFeeds(
    $id: String
    $filter: ModelChannelFeedFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listChannelFeeds(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
  }
`;
export const getChannel = /* GraphQL */ `
  query GetChannel($id: String!) {
    getChannel(id: $id) {
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
export const listChannels = /* GraphQL */ `
  query ListChannels(
    $id: String
    $filter: ModelChannelFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listChannels(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
            senderID
            content
            senderProfilePictureURL
            senderProfilePictureKey
            senderFirstName
            readUserIDs
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
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getPostFeed = /* GraphQL */ `
  query GetPostFeed($id: ID!) {
    getPostFeed(id: $id) {
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
export const listPostFeeds = /* GraphQL */ `
  query ListPostFeeds(
    $filter: ModelPostFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostFeeds(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEntityPostFeed = /* GraphQL */ `
  query GetEntityPostFeed($id: ID!) {
    getEntityPostFeed(id: $id) {
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
export const listEntityPostFeeds = /* GraphQL */ `
  query ListEntityPostFeeds(
    $filter: ModelEntityPostFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntityPostFeeds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        hashtag
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        commentText
        postID
      }
      nextToken
    }
  }
`;
export const getStory = /* GraphQL */ `
  query GetStory($id: ID!) {
    getStory(id: $id) {
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
export const listStories = /* GraphQL */ `
  query ListStories(
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getStoryFeed = /* GraphQL */ `
  query GetStoryFeed($id: ID!) {
    getStoryFeed(id: $id) {
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
export const listStoryFeeds = /* GraphQL */ `
  query ListStoryFeeds(
    $filter: ModelStoryFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStoryFeeds(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFriendship = /* GraphQL */ `
  query GetFriendship($id: String!) {
    getFriendship(id: $id) {
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
export const listFriendships = /* GraphQL */ `
  query ListFriendships(
    $id: String
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFriendships(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMutualFriendship = /* GraphQL */ `
  query GetMutualFriendship($id: String!) {
    getMutualFriendship(id: $id) {
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
export const listMutualFriendships = /* GraphQL */ `
  query ListMutualFriendships(
    $id: String
    $filter: ModelMutualFriendshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMutualFriendships(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUnmutualFriendship = /* GraphQL */ `
  query GetUnmutualFriendship($id: String!) {
    getUnmutualFriendship(id: $id) {
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
export const listUnmutualFriendships = /* GraphQL */ `
  query ListUnmutualFriendships(
    $id: String
    $filter: ModelUnmutualFriendshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUnmutualFriendships(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const channelFeedByChannelID = /* GraphQL */ `
  query ChannelFeedByChannelID(
    $channelID: String
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChannelFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    channelFeedByChannelID(
      channelID: $channelID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const channelFeedByUser = /* GraphQL */ `
  query ChannelFeedByUser(
    $userID: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChannelFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    channelFeedByUser(
      userID: $userID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const messagesByChannelID = /* GraphQL */ `
  query MessagesByChannelID(
    $channelID: String
    $createdAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChannelID(
      channelID: $channelID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getPostsbyUser = /* GraphQL */ `
  query GetPostsbyUser(
    $authorID: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostsbyUser(
      authorID: $authorID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const getPostFeedByAuthor = /* GraphQL */ `
  query GetPostFeedByAuthor(
    $authorID: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostFeedByAuthor(
      authorID: $authorID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostFeedForDestUser = /* GraphQL */ `
  query GetPostFeedForDestUser(
    $destUserID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPostFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostFeedForDestUser(
      destUserID: $destUserID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostFeedForPost = /* GraphQL */ `
  query GetPostFeedForPost(
    $postID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPostFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostFeedForPost(
      postID: $postID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEntityPostFeedByhashtag = /* GraphQL */ `
  query GetEntityPostFeedByhashtag(
    $hashtag: String
    $sortDirection: ModelSortDirection
    $filter: ModelEntityPostFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getEntityPostFeedByhashtag(
      hashtag: $hashtag
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        hashtag
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommentsByUser = /* GraphQL */ `
  query GetCommentsByUser(
    $authorID: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getCommentsByUser(
      authorID: $authorID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        commentText
        postID
      }
      nextToken
    }
  }
`;
export const getPostComments = /* GraphQL */ `
  query GetPostComments(
    $postID: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostComments(
      postID: $postID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        commentText
        postID
      }
      nextToken
    }
  }
`;
export const getStoriesByUser = /* GraphQL */ `
  query GetStoriesByUser(
    $authorID: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getStoriesByUser(
      authorID: $authorID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const getStoryFeedByAuthor = /* GraphQL */ `
  query GetStoryFeedByAuthor(
    $authorID: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getStoryFeedByAuthor(
      authorID: $authorID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStoryFeedForDestUser = /* GraphQL */ `
  query GetStoryFeedForDestUser(
    $destUserID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFeedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getStoryFeedForDestUser(
      destUserID: $destUserID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const friendshipsBySourceUser = /* GraphQL */ `
  query FriendshipsBySourceUser(
    $sourceUserID: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    friendshipsBySourceUser(
      sourceUserID: $sourceUserID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const friendshipsByDestUser = /* GraphQL */ `
  query FriendshipsByDestUser(
    $destUserID: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    friendshipsByDestUser(
      destUserID: $destUserID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const mutualsBySourceUser = /* GraphQL */ `
  query MutualsBySourceUser(
    $sourceUserID: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMutualFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mutualsBySourceUser(
      sourceUserID: $sourceUserID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const mutualsByDestUser = /* GraphQL */ `
  query MutualsByDestUser(
    $destUserID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMutualFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mutualsByDestUser(
      destUserID: $destUserID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const unmutualsBySourceUser = /* GraphQL */ `
  query UnmutualsBySourceUser(
    $sourceUserID: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUnmutualFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    unmutualsBySourceUser(
      sourceUserID: $sourceUserID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const unmutualsByDestUser = /* GraphQL */ `
  query UnmutualsByDestUser(
    $destUserID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUnmutualFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    unmutualsByDestUser(
      destUserID: $destUserID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userReportsByDestUser = /* GraphQL */ `
  query UserReportsByDestUser(
    $dest: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userReportsByDestUser(
      dest: $dest
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const userReportsBySourceUser = /* GraphQL */ `
  query UserReportsBySourceUser(
    $source: ID!
    $updatedAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userReportsBySourceUser(
      source: $source
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
