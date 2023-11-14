import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const getChambre = async (req, res, next) => {
    
    const chambre = await prisma.chambre.findMany({
      include: {
        bloc:{
          select:{
            numero:true
          }
        }
      }
    });
    res.status(200).json(chambre);
      
  };
const getOneChambre = async (req,res, next) => {
  const chambre = await prisma.chambre.findUnique({
    where: {
        id: req.params.id,
    },
  });
  if(!chambre){
    return res.status(404).send("ID NOT FOUND")
  }
  res.status(200).json(chambre)
};
const createChambre = async (req,res, next) => {
 

    const chambre = await prisma.chambre.create({
        data:{ ...req.body}
    })
    res.status(200).json(chambre)
 
};
const deleteChambre = async (req,res, next) => {
    const id = req.params.id
    const chambre = await prisma.chambre.delete({
        where: {id},
    });
    if(!chambre){
        return res.status(404).send("ID NOT FOUND")
      }
      res.status(200).json(chambre)
};
const updateChambre = async (req,res, next) => {
    const id = req.params.id
    const chambre = await prisma.chambre.update({
        data: {...req.body},
        where: {id},
    });
    if(!chambre){
        return res.status(404).send("ID NOT FOUND")
      }
      res.status(200).json(chambre)    
};

export {getChambre,
    getOneChambre,
    createChambre,
    deleteChambre,
    updateChambre
};