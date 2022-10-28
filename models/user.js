const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require('../helpers')
const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        match: emailRegex,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
}, { versionKey: false, timestamps: true })

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegex).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegex).required(),
});

const updSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "bearer !== 'Bearer'").required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    updSubscriptionSchema
}

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
}