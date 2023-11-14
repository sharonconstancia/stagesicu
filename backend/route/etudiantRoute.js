import {getEtudiant,getOneEtudiant,createEtudiant,deleteEtudiant,updateEtudiant,verify} from '../controllers/etudiantController';
import {Router} from "express";

const router = Router()


router.route('/').get(getEtudiant).post(createEtudiant)
router.route('/verify').post(verify)
router.route('/:id').get(getOneEtudiant).delete(deleteEtudiant).put(updateEtudiant)


export default 
router