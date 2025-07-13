const express = require("express");
const router = express.Router();
const AiContent = require("../models/AiContentModel");
const mongoose = require("mongoose");

// Add cache control middleware
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// POST /api/ai-content
router.post("/", async (req, res) => {
    try {
        const aiContentData = req.body;
        const aiContent = new AiContent(aiContentData);
        await aiContent.save();
        res.status(201).json({ message: "AI content created successfully", data: aiContent });
    } catch (error) {
        console.error("Error creating content:", error);
        res.status(400).json({ error: error.message });
    }
});

// GET /api/ai-content
router.get("/", async (req, res) => {
    try {
        console.log("Fetching all AI content...");
        const aiContents = await AiContent.find();
        res.status(200).json(aiContents);
    } catch (error) {
        console.error("Error fetching AI content:", error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/ai-content/:id
router.get("/:id", async (req, res) => {
    try {
        const blogId = req.params.id;
        const isValidId = mongoose.Types.ObjectId.isValid(blogId);
        
        if (!isValidId) {
            return res.status(400).json({ message: "Invalid blog ID format" });
        }

        const aiContent = await AiContent.findById(blogId);
        if (!aiContent) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(aiContent);
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/ai-content/:id
router.put("/:id", async (req, res) => {
    try {
        const aiContent = await AiContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!aiContent) return res.status(404).json({ message: "Content not found" });
        res.status(200).json({ message: "Content updated successfully", data: aiContent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/ai-content/:id
router.delete("/:id", async (req, res) => {
    try {
        const aiContent = await AiContent.findByIdAndDelete(req.params.id);
        if (!aiContent) return res.status(404).json({ message: "Content not found" });
        res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
