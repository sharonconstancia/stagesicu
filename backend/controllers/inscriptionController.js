import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


const getInscription = async (req,res, next) => {
    const inscription = await prisma.inscription.findMany({
        include:{
            etudiant:{
                select:{
                    nometudiant:true,
                    prenom: true,
                    parcour:true,
                    niveau:true,
                    association:true,
                    tel:true
                }
            }
        }
    })
    res.status(200).json(inscription)
};
const getOneInscription = async (req,res, next) => {
  const inscription = await prisma.inscription.findUnique({
    where: {
        id: req.params.id,
    },
  });
  if(!inscription){
    return res.status(404).send("ID NOT FOUND")
  }
  res.status(200).json(inscription)
};
const createInscription = async (req,res, next) => {
 
{
    const inscription = await prisma.inscription.create({
        data:{ ...req.body}
    })
    res.status(200).json(inscription)

}
    
 
};
const deleteInscription = async (req,res, next) => {
    const id = req.params.id
    const inscription = await prisma.inscription.delete({
        where: {id},
    });
    if(!inscription){
        return res.status(404).send("ID NOT FOUND")
      }
      res.status(200).json(inscription)
};
const updateInscription = async (req,res, next) => {
    const id = req.params.id;
    const { etudiantId,pere,mere, date,lieux,adresse,inscrit} = req.body;
    const inscription = await prisma.inscription.update({
      data: { etudiantId,pere,mere, date,lieux,adresse,inscrit },
      where: { id },
    });
    if(!inscription){
        return res.status(404).send("ID NOT FOUND")
      }
      res.status(200).json(inscription)
    
};
const acceptation = async (req,res, next) => {
    const id = req.params.id
    const {inscrit} = req.body
    const inscription = await prisma.inscription.update({
       data:{
        inscrit,id
       },
        where: {id},
    });
    if(!inscription){
        return res.status(404).send("ID NOT FOUND")
      }
      res.status(200).json(inscription)
    
};


export {getInscription,
    getOneInscription,
    createInscription,
    deleteInscription,
    updateInscription,
    acceptation
};