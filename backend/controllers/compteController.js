import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


const getCompte = async (req,res, next) => {
    const compte = await prisma.compte.findMany({
      include: {
        etudiant:true,
      }
    })
    res.status(200).json(compte)
};
const getOneCompte = async (req,res, next) => {
  const compte = await prisma.compte.findUnique({
    where: {
        id: req.params.id,
    },
  });
  if(!compte){
    return res.status(404).send("ID NOT FOUND")
  }
  res.status(200).json(compte)
};

const getClerkId = async (req,res, next) => {
    const compte = await prisma.compte.findUnique({
      where: {
        clerkId: req.params.clerkId,
      },
      include:{
        etudiant: true,
      }
    });
    if(!compte){
      return res.status(404).send("ID NOT FOUND")
    }
    res.status(200).json(compte)
  };
const createCompte = async (req,res, next) => {
  {
    const compte = await prisma.compte.create({
        data:{ ...req.body}
    })
    res.status(200).json(compte)
 
 }
};
const deleteCompte = async (req,res, next) => {
    const id = req.params.id
    const compte = await prisma.compte.delete({
        where: {id},
    });
    if(!compte){
        return res.status(404).send("ID NOT FOUND")
      }
      res.status(200).json(compte)
};
const updateCompte = async (req,res, next) => {
    const id = req.params.id
    const compte = await prisma.compte.update({
        data: {...req.body},
        where: {id},
    });
    if(!compte){
        return res.status(404).send("ID NOT FOUND")
      }
      res.status(200).json(compte)
    
};

export {getCompte,
    getOneCompte,
    createCompte,
    deleteCompte,
    updateCompte,
    getClerkId
};