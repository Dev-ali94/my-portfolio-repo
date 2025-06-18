const Skill = require('../models/Skill');

// GET ALLSKILL
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
};

// CREATE SKILL
exports.createSkill = async (req, res) => {
  try {
    const { title, description, category, progressBar } = req.body;
    const image = req.body.image || ''; 

    const skill = new Skill({
      title,
      description,
      category,
      progressBar,
      image
    });
    await skill.save();
    res.status(201).json({ message: 'Skill created successfully', skill });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create skill' });
  }
};

// DELETE SKILL
exports.deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.id;

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    if (skill.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', skill.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.warn('Failed to delete image file:', err.message);
        }
      });
    }

    await Skill.findByIdAndDelete(skillId);

    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete skill' });
  }
};  
