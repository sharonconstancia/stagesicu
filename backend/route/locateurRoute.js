import {getLocateur,getOneLocateur,createLocateur,deleteLocateur,updateLocateur,getLocateurEtudiant,getLocateurSortie} from '../controllers/locateurControlleer';
import {Router} from "express";

const router = Router()


router.route('/').get(getLocateur).post(createLocateur)
router.route('/get').get(getLocateurEtudiant)

router.route('/:id').get(getOneLocateur).delete(deleteLocateur).put(updateLocateur)
router.route('/date').get(getLocateurSortie)


export default router
