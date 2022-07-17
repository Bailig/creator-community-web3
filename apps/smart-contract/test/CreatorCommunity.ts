import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CreatorCommunity", function () {
  async function deployFixture() {
    const [owner, ...otherAccounts] = await ethers.getSigners();

    const CreatorCommunity = await ethers.getContractFactory(
      "CreatorCommunity"
    );
    const creatorCommunity = await CreatorCommunity.deploy();
    return { creatorCommunity, owner, otherAccounts };
  }

  async function deployWithPostFixture() {
    const { creatorCommunity, owner, otherAccounts } = await loadFixture(
      deployFixture
    );
    await creatorCommunity.postImage("My first post");
    return { creatorCommunity, owner, otherAccounts };
  }

  describe("postImage", function () {
    it("Should emit PostImageSuccess", async function () {
      const { creatorCommunity, owner } = await loadFixture(deployFixture);

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
      const { creatorCommunity, owner } = await loadFixture(deployFixture);

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
      const { creatorCommunity } = await loadFixture(deployFixture);

      await expect(creatorCommunity.postImage("")).to.be.revertedWith(
        "No caption."
      );
    });
  });

  describe("tipOnPost", function () {
    it("Should emit TipOnPostSuccess", async function () {
      const { creatorCommunity, owner } = await loadFixture(
        deployWithPostFixture
      );
      // await creatorCommunity.postImage("My first post");

      const tipAmount = 1;
      const response = await creatorCommunity.tipOnPost(1, {
        value: tipAmount,
      });
      const receipt = await response.wait();

      expect(receipt.events).to.be.lengthOf(1);
      const event = receipt.events![0].args!;

      expect(event.id).to.equal(1);
      expect(event.owner).to.equal(owner.address);
      expect(event.likeCount).to.equal(0);
      expect(event.tipAmount).to.equal(tipAmount);
    });

    it("Should save post", async function () {
      const { creatorCommunity } = await loadFixture(deployWithPostFixture);

      const tipAmount = 1;
      await creatorCommunity.tipOnPost(1, {
        value: tipAmount,
      });
      const post = await creatorCommunity.posts(1);

      expect(post.tipAmount).to.equal(tipAmount);
    });

    it("Should reject wring id", async function () {
      const { creatorCommunity } = await loadFixture(deployWithPostFixture);

      await expect(creatorCommunity.tipOnPost(2)).to.be.revertedWith(
        "Post not found."
      );
    });

    it("Should reject 0 tip amount", async function () {
      const { creatorCommunity } = await loadFixture(deployWithPostFixture);

      await expect(
        creatorCommunity.tipOnPost(1, { value: 0 })
      ).to.be.revertedWith("Tip amount must not be 0.");
    });
  });
});
