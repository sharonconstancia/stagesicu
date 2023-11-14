import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const getLocateur = async (req,res, next) => {
    const locateur = await prisma.locateur.findMany({
      include:{
        chambre:{
          select:{
            nom:true,
          }
        },
        etudiant:{
          select:{
            nometudiant:true
          }
        }
      }
    })
    res.status(200).json(locateur)
};
const getOneLocateur = async (req,res, next) => {
  const locateur = await prisma.locateur.findUnique({
    where: {
        id: req.params.id,
    },
  });
  if(!locateur){
    return res.status(404).send("ID NOT FOUND")
  }
  res.status(200).json(locateur)
};



const getLocateurSortie = async (req,res, next) => { 
  const locateur = await prisma.locateur.findMany({
    select:{
      dateentre:true,
      etudiant:true,
    }
  })
  res.status(200).json(locateur)
};



const createLocateur = async (req,res, next) => {
  {

    const locateur = await prisma.locateur.create({
        data:{ ...req.body}
    })
    res.status(200).json(locateur)
 }
};
const deleteLocateur = async (req,res, next) => {
    const id = req.params.id
    const locateur = await prisma.locateur.delete({
        where: {id},
    });
    if(!locateur){
        return res.status(404).send("ID NOT FOUND")
      }
      res.status(200).json(locateur)
};
const updateLocateur = async (req,res, next) => {
    const id = req.params.id
    const { dateentre, datesortie, observation } = req.body;
    console.log(datesortie)
  const locateur = await prisma.locateur.update({
    data: { dateentre, datesortie, observation },
    where: { id },
    });
    if(!locateur){
        return res.status(404).send("ID NOT FOUND")
      }
      res.status(200).json(locateur)
    
};
const getLocateurEtudiant = async (req,res, next) => {
  const locateur = await prisma.locateur.findMany({
  select:{
   etudiant:true,
    chambre:{
      select:{
        _count:{
          select:{
            locateur:true,
          }
        },
        bloc:{
          select:{
            numero:true,
          }
        },
       
      }
      
    }
  }
  })
  const nombreBloc = await prisma.bloc.count()
  const nombreChambre = await prisma.chambre.count()
  const nombreInscription = await prisma.inscription.count()
  let nombre=[]
  let nom =[]
  const total=await prisma.locateur.count()
    

  locateur.forEach((item)=>{
    nom.push(item?.chambre?.bloc?.numero)
    
    nombre.push(item?.chambre?._count.locateur) 

  })
  res.status(200).json({nom,nombre, total,nombreBloc,nombreChambre,nombreInscription})
};
export {getLocateur,
    getOneLocateur,
    createLocateur,
    deleteLocateur,
    updateLocateur,
    getLocateurEtudiant,
    getLocateurSortie

};