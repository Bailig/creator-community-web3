// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";


contract CreatorCommunity {
  struct Video {
    string hash;
    uint width;
    uint height;
  }

  struct Image {
    string hash;
    uint width;
    uint height;
  }

  struct VideoPostSet {
    uint viewCount;
    string description;
    Video video;
    Image thumbnail;
  }

   struct ImagePostSet {
    Image[] images;
  }

  struct Post {
    uint id;
    address owner;

    string caption;
    uint tipAmount;
    uint likeCount;

    // VideoPostSet videoSet;
    // ImagePostSet imageSet;
  }

  event ImagePosted(
    uint id,
    address owner,

    string caption,
    uint tipAmount,
    uint likeCount
  );

  mapping (uint => Post) public posts;
  uint private postCount = 0;

  constructor() {}

  function postImage(string memory caption) public returns (uint) {
    require(bytes(caption).length > 0, "No caption.");

    postCount++;
    posts[postCount] = Post(postCount, msg.sender, caption, 0, 0);

    emit ImagePosted(postCount, msg.sender, caption, 0, 0);
    
    return postCount;
  }

}