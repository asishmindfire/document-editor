import { Router } from "express";
import { documentController, getAllDocumentController, getAllVersionController } from "../controllers/documentController";
// import { getExample, getExampleData } from "../controllers/exampleControllers";
// import { getExampleDataValidation } from "../validation/exampleValidation/exampleValidation";

const router = Router();

// router.post("/", getExampleDataValidation, getExampleData);

router.post("/document", documentController);
router.get("/getDocuments", getAllDocumentController);
router.get("/getVersions/:id", getAllVersionController);

export default router;
