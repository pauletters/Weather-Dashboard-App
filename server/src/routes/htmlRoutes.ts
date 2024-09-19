import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// This is the route that sends the index.html file
router.get('/', (_, res) => {
  const indexPath = path.join(__dirname, '../../../client/dist/index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending index.html: ', err);
      res.status(500).end();
    }
  })
});

export default router;
