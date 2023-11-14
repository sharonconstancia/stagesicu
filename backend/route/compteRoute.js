import {getCompte,getOneCompte,createCompte,deleteCompte,updateCompte, getClerkId} from '../controllers/compteController';
import {Router} from "express";

const router = Router()


router.route('/').get(getCompte).post(createCompte)
router.route('/:id').get(getOneCompte).delete(deleteCompte).put(updateCompte)
router.route('/clerk/:clerkId').get(getClerkId)

export default router
