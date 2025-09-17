import express from "express";
import {
  healthCheck,
  simpleHealthCheck,
  detailedHealthCheck,
} from "../controllers/healthcheckController";

const router = express.Router();

router.get("/", simpleHealthCheck); 
router.get("/detailed", detailedHealthCheck); 
router.get("/full", healthCheck); 

export default router;
