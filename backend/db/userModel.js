const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    chat: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    tonWallet: {
        type: String,
    },
    inviteCode: {
        type: String,
        unique: true,
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalRefers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    commissionEarned: {
        type: Number,
        default: 0
    },
    tokens: {
        type: Number,
        default: 2500
    },
    perClick: {
        type: Number,
        default: 1
    },
    maxEnergyLimit: {
        type: Number,
        default: 2500
    },
    energyLimit: {
        type: Number,
        default: 2500
    },
    rechargeSpeed: {
        type: Number,
        default: 1,
        min: 1
    },
    autoTap: {
        type: Boolean,
        default: false
    },
    lastEnergyUpdate: {
        type: Date,
        default: Date.now
    },
    dailyBoosters: { type: Number, default: 3 },
    multipleTapBoosters: { type: Number, default: 3 },
    lastBoosterReset: { type: Date, default: Date.now },
    claimedInviteTasks: [
        {
            task: {
                type: String,
                required: true
            },
            claimed: {
                type: Boolean,
                default: false
            }
        }
    ],
    level: {
        type: String,
        default: "Bronze"
    },
    lastActive: {
        type: Date,
        default: Date.now,
    },
})

userSchema.pre("save", async function (next) {
    try {

        // If inviteCode is not set, generate one
        if (!this.inviteCode) {
            this.inviteCode = generateInviteCode();
        }

        next();
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

userSchema.pre("save", function (next) {
    this.lastActive = new Date();
    next();
});

// Generate invite code
function generateInviteCode() {
    const length = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let inviteCode = '';

    // Generate a random string
    for (let i = 0; i < length; i++) {
        inviteCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return inviteCode;
}

module.exports = mongoose.model('User', userSchema);