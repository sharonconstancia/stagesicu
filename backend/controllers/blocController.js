import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getBloc = async (req, res, next) => {
  const bloc = await prisma.bloc.findMany({});
  res.status(200).json(bloc);
};

const getOneBloc = async (req, res, next) => {
  const bloc = await prisma.bloc.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!bloc) {
    return res.status(404).send('ID NOT FOUND');
  }
  res.status(200).json(bloc);
};
const createBloc = async (req, res, next) => {
  const bloc = await prisma.bloc.create({
    data: { ...req.body },
  });
  res.status(200).json(bloc);
};
const deleteBloc = async (req, res, next) => {
  const id = req.params.id;
  const bloc = await prisma.bloc.delete({
    where: { id },
  });
  if (!bloc) {
    return res.status(404).send('ID NOT FOUND');
  }
  res.status(200).json(bloc);
};
const updateBloc = async (req, res, next) => {
  const id = req.params.id;
  const { numero, adresse, nombreporte, portelibre, porteoccuper } = req.body;
  const bloc = await prisma.bloc.update({
    data: { numero, adresse, nombreporte, portelibre, porteoccuper },
    where: { id },
  });
  if (!bloc) {
    return res.status(404).send('ID NOT FOUND');
  }
  res.status(200).json(bloc);
};



export { getBloc, getOneBloc, createBloc, deleteBloc, updateBloc };
