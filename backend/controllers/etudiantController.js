import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


const getEtudiant = async (req,res, next) => {
    const etudiant = await prisma.etudiant.findMany({})
    res.status(200).json(etudiant)
};
const getOneEtudiant = async (req,res, next) => {
  const etudiant = await prisma.etudiant.findUnique({
    where: {
        id: req.params.id,
    },
  });
  if(!etudiant){
    return res.status(404).send("ID NOT FOUND")
  }
  res.status(200).json(etudiant)
};
const createEtudiant = async (req,res, next) => {
 

    const etudiant = await prisma.etudiant.create({
        data:{ ...req.body}
    })
    res.status(200).json(etudiant)

    
 
};
const deleteEtudiant = async (req,res, next) => {
    const id = req.params.id
    const etudiant = await prisma.etudiant.delete({
        where: {id},
    });
    if(!etudiant){
        return res.status(404).send("ID NOT FOUND")
      }
      res.status(200).json(etudiant)
};
const updateEtudiant = async (req,res, next) => {
    const id = req.params.id
    const etudiant = await prisma.etudiant.update({
        data: {...req.body},
        where: {id},
    });
    if(!etudiant){
        return res.status(404).send("ID NOT FOUND")
      }
      res.status(200).json(etudiant)
    
};
const verify = async (req,res, next) => {
    console.log("sqry")
    const {numero} = req.body
    const etudiant = await prisma.etudiant.findUnique({
        
        where: {
            numero : numero,
        },
        include: {
            compte: true,
        },
    });
    if(!etudiant){
        return (res.status(404).json({message: 'votre mot de passe est incorrect'}),  console.log("hasina"))
      
      }
      if (etudiant.compte){
        return res 
          .status(400)
          .json ({message:'Désolé, vous avez deja un compte'})
      }
      res.status(200).json({message:'creer'})

    
};


export {getEtudiant,
    getOneEtudiant,
    createEtudiant,
    deleteEtudiant,
    updateEtudiant,
    verify
};