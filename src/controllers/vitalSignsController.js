import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readdirSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('=== DEBUG INFO ===');
console.log('Controller file path:', __filename);
console.log('Controller directory:', __dirname);
console.log('Process working directory:', process.cwd());
console.log('Looking for services at:', new URL('../services/', import.meta.url).pathname);

// Check what's actually in the parent directory
try {
  const parentDir = dirname(__dirname);
  console.log('Parent directory contents:', readdirSync(parentDir));
  console.log('Services directory exists:', existsSync(parentDir + '/services'));
  if (existsSync(parentDir + '/services')) {
    console.log('Services directory contents:', readdirSync(parentDir + '/services'));
  }
} catch (e) {
  console.log('Error reading directories:', e.message);
}
console.log('==================');



import * as vitalSignsServices from '../services/vitalSignsServices.js';

export const createVitalSign = async (req, res) => {
  try {
    const vitalSignData = req.body;
    const createdVitalSign = await vitalSignsServices.createVitalSign(
      vitalSignData
    );
    res
      .status(200)
      .json({ createdVitalSign, message: "Submitted Successfully" });
  } catch (err) {
    console.error("error creating vital sign:", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getVitalSignsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const vitalSigns = await vitalSignsServices.getVitalSignsByPatientId(
      patientId
    );
    res.status(200).json({ vitalSigns });
  } catch (err) {
    console.error("error getting vital signs:", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const updateVitalSign = async (req, res) => {
  try {
    const { vitalSignId } = req.params;
    const response = await vitalSignsServices.updateVitalSign(req.body, vitalSignId)
    res.status(200).json({ response })
  } catch (err) {
    console.error("error updating vital sign:", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
}