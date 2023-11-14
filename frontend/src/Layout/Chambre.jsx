import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

import { FcFullTrash } from "react-icons/fc";
import Modal from "../components/Modal/Modal";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../components/Input/Input";

import { PiPlusFill } from "react-icons/pi";
import {
  useDeletechambreMutation,
  useGetchambreQuery,
  useUpdatechambreMutation,
  useGetOnechambreQuery,
  useChambreMutation,
} from "../redux/Slice/chambreslice";
import { useGetblocQuery } from "../redux/Slice/regionslice";
import { MoonLoader } from "react-spinners";

import Message from "../components/Message/Message";
import Success from "../components/Success/Success";
import CircleLoader from "../components/CircleLoader/CircleLoader";
import { container, item } from "../Utils/Animate";




const Chambre = () => {
  const {
    data: chambre,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetchambreQuery();
  const [searchTerm, setSearchTerm] = useState(""); 
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [updateModal, setUpdateModal] = useState(false);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);
  const [selectedId, setSelectedId] = useState(null);
  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
  return (
    <>
      <div className="dark:bg-slate-900 w-full h-screen mt-5 px-12 ">
        <div className="flex justify-between py-2">
          <button
            className="  bg-blue-500 w-[100px]  text-white px-3 py-2 rounded-full"
            onClick={toggleAddModal}
          >
            Ajout
          </button>
          <div className="border border-slate-400 hidden md:block md: rounded-md dark:border-slate-500 w-60 rounted flex">
          <input
            type="text"
            placeholder="Rechercher par nom..."
            className=" outline-none bg-transparent w-full text-black dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      
       
          </div>
        </div>
        <div className="w-full grid grid-cols-6 mt-6 bg-blue-950 py-2 dark:bg-slate-100 text-slate-200 dark:text-slate-900  rounded-tr-xl rounded-tl-xl px-2 ">
          <p>Numero du bloc</p>
          <p>Nom de la porte</p>
          <p>Nombre de cloison</p>
          <p>Reference</p>
          <p>Disponibilité</p>
          <p className="pl-5 mx-auto">Actions</p>
        </div>
        <motion.div variants={container} initial="hidden" animate="visible">
          {isLoading && (
            <div className="flex justify-center  items-center mt-[100px]">
              <MoonLoader color="black" />
            </div>
          )}

          {chambre?.filter((chambre) => chambre.nom.toLowerCase().includes(searchTerm.toLowerCase())).map((chambre) => (
            <Row
              chambre={chambre}
              key={chambre.id}
              toggleDeleteModal={toggleDeleteModal}
              toggleUpdateModal={toggleUpdateModal}
              setSelected={setSelectedId}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {addModal && (
            <AddModalComponent
              refetch={refetch}
              toggleAddModal={toggleAddModal}
            />
          )}
          {deleteModal && (
            <DeleteModalComponent
              refetch={refetch}
              toggleDeleteModal={toggleDeleteModal}
              id={selectedId}
            />
          )}
          {updateModal && (
            <UpdateModalComponent
              refetch={refetch}
              toggleUpdateModal={toggleUpdateModal}
              id={selectedId}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Chambre;
function Row({ chambre, setSelected, toggleDeleteModal, toggleUpdateModal }) {
  return (
    <motion.div
      variants={item}
      className="w-full grid grid-cols-6 px-2 py-2 border-b border-b-slate-500 dark:text-white last:border-b-0"
    >
      <p>{chambre.bloc.numero}</p>
      <p>{chambre.nom}</p>
      <p>{chambre.nombrecloison}</p>
      <p>{chambre.reference}</p>
      <p>{chambre.disponibiliter}</p>

      <div>
        <Actions
          id={chambre.id}
          setSelected={setSelected}
          toggleDeleteModal={toggleDeleteModal}
          toggleUpdateModal={toggleUpdateModal}
        />{" "}
      </div>
    </motion.div>
  );
}
function Actions({ id, setSelected, toggleDeleteModal, toggleUpdateModal }) {
  const deleteFunc = () => {
    setSelected(id);
    toggleDeleteModal();
  };
  const updateFunc = () => {
    setSelected(id);
    toggleUpdateModal();
  };
  return (
    <div className="flex justify-center space-x-3 pl-10">
      <div
        onClick={updateFunc}
        className="bg-green-500 h-10 w-10 flex rounded-full text-white cursor-pointer px-0 py-0 text-2xl text-center items-center  justify-center"
      >
        <FiEdit />
      </div>
      <div
        onClick={deleteFunc}
        className="bg-red-500  h-10 w-10  rounded-full flex text-white cursor-pointer px-0 py-0 items-center justify-center"
      >
        <RiDeleteBinFill />
      </div>
    </div>
  );
}
function AddModalComponent({ toggleAddModal, refetch }) {
  const { data, isLoading: loadingbloc } = useGetblocQuery();
  const [blocId, setblocId] = useState("");
  const [nom, setnom] = useState("");
  const [nombrecloison, setnombrecloison] = useState();
  const [reference, setreference] = useState("");
  const [disponibiliter, setdisponibiliter] = useState("");
  const [createChambre, { isLoading, isError, isSuccess }] =
    useChambreMutation();
  const [show, setShow] = useState(true);

  const onChange = (e) => {
    setblocId(e.target.value);
  };
  const formHandler = async (e) => {
    e.preventDefault();
    setShow(false);
    try {
      const res = await createChambre({
        blocId,
        nom,
        nombrecloison: Number(nombrecloison),
        reference,
        disponibiliter,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        toggleAddModal();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <Modal options="w-[500px]" closeModal={toggleAddModal}>
      {show && (
        <div>
          <form onSubmit={formHandler}>
            <select
              onChange={onChange}
              id=""
              className="border-b w-full outline-none bg-transparent border-b-slate-600 dark-text-white "
            >
              <option>choisir bloc</option>
              {data &&
                data.map((bloc) => (
                  <option key={bloc.id} value={bloc.id}>
                    {bloc.numero}
                  </option>
                ))}
            </select>
            <Input label="nom" type="text" value={nom} setValue={setnom} />
            <Input
              label="Nombre cloison"
              type="number"
              value={nombrecloison}
              setValue={setnombrecloison}
            />
            <Input
              label="reference"
              type="text"
              value={reference}
              setValue={setreference}
            />
            <Input
              label="disponibiliter"
              type="text"
              value={disponibiliter}
              setValue={setdisponibiliter}
            />

            {/* button */}
            <div className="w-full flex justify-center space-x-6 py-2">
              <Button text="Ajouter" color="bg-sky-700" />
              <Button
                onClick={toggleAddModal}
                text="Annuler"
                color="bg-red-700"
              />
            </div>
          </form>
        </div>
      )}
      {!show && isLoading ? (
        <Message message="Patientez..." icon={<CircleLoader />} />
      ) : isSuccess ? (
        <Message message="Ajout effectue" icon={<Success />} />
      ) : (
        isError && <Message message="Une erreur s'est produite" icon={""} />
      )}
    </Modal>
  );
}
function UpdateModalComponent({ toggleUpdateModal, refetch, id }) {
  const [numero, setNumero] = useState("");
  const [nom, setnom] = useState("");
  const [nombrecloison, setnombrecloison] = useState("");
  const [reference, setreference] = useState("");
  const [disponibiliter, setdisponibiliter] = useState("");
  const { data: createChambre, isSuccess: success } = useGetOnechambreQuery(id);

  useEffect(() => {
    if (success) {
      setNumero(bloc?.numero);
      setnom(Chambre?.nom);
      setnombrecloison(Chambre?.nombrecloison);
      setreference(Chambre?.reference);
      setdisponibiliter(Chambre?.disponibiliter);
    }
  }, [success]);

  const [updateChambre, { isLoading, isError, isSuccess }] =
    useUpdatechambreMutation();

  const [show, setShow] = useState(true);
  const formHandler = async (e) => {
    e.preventDefault();
    setShow(false);
    try {
      const res = await updateChambre({
        numero,
        nom,
        nombrecloison,
        reference,
        disponibiliter,
        id,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        toggleUpdateModal();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <Modal options="w-[500px]" closeModal={toggleUpdateModal}>
      {show && (
        <div>
          <h1 className="text-center dark:text-white text-gray-900 text-2xl">
            ModifierChambre
          </h1>
          <form onSubmit={formHandler}>
            <Input
              label="Numero"
              type="number"
              id="code"
              value={numero}
              setValue={setNumero}
            />
            <Input label="nom" type="text" value={nom} setValue={setnom} />
            <Input
              label="Nombre cloison"
              type="number"
              value={nombrecloison}
              setValue={setnombrecloison}
            />
            <Input
              label="reference"
              type="text"
              value={reference}
              setValue={setreference}
            />
            <Input
              label="Disponibiliter"
              type="text"
              value={disponibiliter}
              setValue={setdisponibiliter}
            />

            {/* button */}
            <div className="w-full flex justify-center space-x-6 py-2">
              <Button text="Modifier" color="bg-sky-700" />
              <Button
                onClick={toggleUpdateModal}
                text="Annuler"
                color="bg-red-700"
              />
            </div>
          </form>
        </div>
      )}
      {!show && isLoading ? (
        <Message message="Patientez..." icon={<CircleLoader />} />
      ) : isSuccess ? (
        <Message message="Ajout effectue" icon={<Success />} />
      ) : (
        isError && <Message message="Une erreur s'est produite" icon={""} />
      )}
    </Modal>
  );
}
function DeleteModalComponent({ toggleDeleteModal, refetch, id }) {
  const [deleteRegion, { isLoading, isError, isSuccess }] =
    useDeletechambreMutation();
  const [show, setShow] = useState(true);

  const handleClick = async () => {
    setShow(false);
    try {
      const res = await deleteRegion(id);

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        toggleDeleteModal();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <Modal options="w-[500px] text-white" closeModal={toggleDeleteModal}>
      {show && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-center my-2 text-2xl text-gray-900 dark:text-white">
            Voulez vous vraiment supprimer ?
          </h1>
          <FcFullTrash className="text-[175px]" />
          <div className="btn-container w-full flex justify-center space-x-5">
            <Button
              onClick={handleClick}
              text="Oui supprimer"
              color="bg-rose-500"
            />
            <Button
              onClick={toggleDeleteModal}
              text="Fermer"
              color="bg-sky-500"
            />
          </div>
        </div>
      )}
      {!show && isLoading ? (
        <Message message="Suppression en cours" icon={<CircleLoader />} />
      ) : isSuccess ? (
        <Message message="Suppression réussi" icon={<Success />} />
      ) : (
        isError && <Message message="Une erreur s'est produite" icon={""} />
      )}
    </Modal>
  );
}
