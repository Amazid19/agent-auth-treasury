const { ethers } = require("ethers");

// AI Agent-এর জন্য একটি ডামি অফ-চেইন সাইন জেনারেটর
async function generateAgentSignature(treasuryAddress, amount) {
    // এজেন্টের প্রাইভেট কি (টেস্ট পারপাসে)
    const wallet = ethers.Wallet.createRandom();
    
    // মেসেজ হ্যাশ তৈরি করা
    const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256"],
        [treasuryAddress, amount]
    );

    // অফ-চেইন সাইন নেওয়া
    const signature = await wallet.signMessage(ethers.getBytes(messageHash));

    console.log("Agent Address:", wallet.address);
    console.log("Generated Signature:", signature);

    return { signature, messageHash };
}

// ৫০ USDC ট্রান্সফারের একটি রিকোয়েস্ট টেস্ট
generateAgentSignature("0x1234567890123456789012345678901234567890", 50);
