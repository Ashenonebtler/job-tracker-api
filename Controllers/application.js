const Application = require('../Models/application');

const createApplication = async (req, res) => {
  try {
    if (!req.body.company || !req.body.position) {
      return res.status(400).send({
        message: 'Send all required fields: company, position',
      });
    }
    const newApplication = {
      company: req.body.company,
      position: req.body.position,
      status: req.body.status,
      location: req.body.location,
      salary: req.body.salary,
      notes: req.body.notes,
    };

    const application = await Application.create(newApplication);

    return res.status(201).send(application);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find({});

    return res.status(200).json({
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.status(200).json(application);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    if (!req.body.company || !req.body.position) {
      return res.status(400).send({
        message: 'Send all required fields: company, position',
      });
    }

    const { id } = req.params;

    const result = await Application.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.status(200).send({ message: 'Application updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Application.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.status(200).send({ message: 'Application deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
