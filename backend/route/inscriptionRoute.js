import {getInscription,getOneInscription,createInscription,deleteInscription,updateInscription,acceptation} from '../controllers/inscriptionController';
import {Router} from "express";

const router = Router()


router.route('/').get(getInscription).post(createInscription)
router.route('/:id').get(getOneInscription).delete(deleteInscription).put(updateInscription)
router.route('/acceptation/:id')

export default 
router