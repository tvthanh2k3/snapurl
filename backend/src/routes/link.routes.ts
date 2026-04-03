import { Router } from 'express';
import { createLink, getAnalytics, redirectLink } from '../controllers/link.controller';
import { validate } from '../middlewares/validate.middleware';
import { createLinkSchema } from '../schemas/link.schema';

const router = Router();

router.post('/api/links', validate(createLinkSchema), createLink);
router.get('/api/links/:shortCode/analytics', getAnalytics);

router.get('/:shortCode', redirectLink);

export default router;
