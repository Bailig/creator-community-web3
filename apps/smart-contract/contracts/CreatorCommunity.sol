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

  event PostImageSuccess(
    uint id,
    address owner,

    string caption,
    uint tipAmount,
    uint likeCount
  );

  event TipOnPostSuccess(
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

    emit PostImageSuccess(postCount, msg.sender, caption, 0, 0);
    
    return postCount;
  }

  function tipOnPost(uint id) public payable {
    Post memory post = posts[id];
    require(post.id != 0, "Post not found.");
    require(msg.value != 0, "Tip amount must not be 0.");

    address payable postOwner = payable(post.owner);
    postOwner.transfer(msg.value);
    post.tipAmount = post.tipAmount + msg.value;
    posts[id] = post;

    emit TipOnPostSuccess(id, post.owner, post.caption, post.tipAmount, post.likeCount);
  }

}