const Design = require("../models/Design");
const express = require("express");
const Order = require("../models/Order");
const Review = require("../models/Review");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order submitted successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Order submission failed",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
});

router.post("/save-design", async (req, res) => {
  try {
    const design = new Design(req.body);
    const savedDesign = await design.save();

    res.status(201).json(savedDesign);
  } catch (error) {
    res.status(500).json({
      message: "Failed to save design",
      error: error.message,
    });
  }
});

router.get("/saved-designs", async (req, res) => {
  try {
    const designs = await Design.find().sort({
      createdAt: -1,
    });

    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch saved designs",
      error: error.message,
    });
  }
});

router.delete("/saved-designs/:id", protect, adminOnly, async (req, res) => {
  try {
    await Design.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Design deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete design",
      error: error.message,
    });
  }
});

router.post("/reviews", async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit review",
      error: error.message,
    });
  }
});

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
});

router.delete("/reviews/:id", protect, adminOnly, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete review",
      error: error.message,
    });
  }
});

module.exports = router;