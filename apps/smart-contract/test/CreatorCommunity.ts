import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CreatorCommunity", function () {
  async function deployCreatorCommunityFixture() {
    const [owner, ...otherAccounts] = await ethers.getSigners();

    const CreatorCommunity = await ethers.getContractFactory(
      "CreatorCommunity"
    );
    const creatorCommunity = await CreatorCommunity.deploy();
    const c = await creatorCommunity.deployed();

    return { creatorCommunity, owner, otherAccounts };
  }

  describe("postImage", function () {
    it("Should emit image posted", async function () {
      const { creatorCommunity, owner } = await loadFixture(
        deployCreatorCommunityFixture
      );

      const caption = "My first post";
      const response = await creatorCommunity.postImage(caption);
      const receipt = await response.wait();

      expect(receipt.events).to.be.lengthOf(1);
      const event = receipt.events![0].args!;

      expect(event.id).to.equal(1);
      expect(event.owner).to.equal(owner.address);
      expect(event.caption).to.equal(caption);
      expect(event.likeCount).to.equal(0);
      expect(event.tipAmount).to.equal(0);
    });

    it("Should save post", async function () {
      const { creatorCommunity, owner } = await loadFixture(
        deployCreatorCommunityFixture
      );

      const caption = "My first post";
      await creatorCommunity.postImage(caption);
      const post = await creatorCommunity.posts(1);

      expect(post.id).to.equal(1);
      expect(post.owner).to.equal(owner.address);
      expect(post.caption).to.equal(caption);
      expect(post.likeCount).to.equal(0);
      expect(post.tipAmount).to.equal(0);
    });

    it("Should reject empty post", async function () {
      const { creatorCommunity } = await loadFixture(
        deployCreatorCommunityFixture
      );

      await expect(creatorCommunity.postImage("")).to.be.revertedWith(
        "No caption."
      );
    });
  });
});
