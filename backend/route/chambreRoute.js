import {getChambre,getOneChambre,createChambre,deleteChambre,updateChambre} from '../controllers/chambreController';
import {Router} from "express";

const router = Router()


router.route('/').get(getChambre).post(createChambre)
router.route('/:id').get(getOneChambre).delete(deleteChambre).put(updateChambre)


export default router
