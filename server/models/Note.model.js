const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "default",
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);

// Ensure findByIdAndUpdate also triggers timestamp refresh
noteSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: new Date() });
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
