const express = require('express');
const router = express.Router();
const applicationController = require('../Controllers/application');

router.post("/create", applicationController.createApplication);
router.get("/getallapplications", applicationController.getAllApplications);
router.get("/getapplication/:id", applicationController.getApplicationById);
router.put("/updateapplication/:id", applicationController.updateApplication);
router.delete("/deleteapplication/:id", applicationController.deleteApplication);
module.exports = router;
