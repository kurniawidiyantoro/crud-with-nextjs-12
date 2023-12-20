import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalFooter,
  Spinner,
  ModalBody,
} from "reactstrap";

function DeleteSales({ datas }) {
  const [isDelete, setIsDelete] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setmessage] = useState("");
  const router = useRouter();

  const handleDelete = async (salesId) => {
    try {
      setIsDelete(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteTransaction/${salesId}`
      );
      setmessage(response.data.msg);
      setTimeout(() => {
        router.reload()
      }, 2000);
    } catch (error) {
      console.log("failed to fetch data", error);
    }
    setIsDelete(false);
  };

  const toggle = () => setModal(!modal);
  return (
    <div>
      {message ? (
        <Modal isOpen={modal}>
          <p>{message}</p>
        </Modal>
      ) : null}
      <Button className="badge rouded-pill p-2" color="danger" onClick={toggle}>
        Delete
        <i className="bi bi-trash ms-1"></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody toggle={toggle}>
          <strong>{`Are you sure delete ${datas.customer_name}?`}</strong>
        </ModalBody>

        <ModalFooter>
          {!isDelete ? (
            <Button
              color="danger"
              onClick={() => {
                toggle();
                handleDelete(datas.customers_id);
              }}
            >
              Delete
            </Button>
          ) : (
            <Button color="danger" disabled>
              <Spinner size="sm" className="me-2"></Spinner>
              <span>Delete...</span>
            </Button>
          )}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {message ? (
        <Modal isOpen={!modal} >
   <ModalBody className="bg-success text-white rounded opacity-75">{message}</ModalBody>
        </Modal>
      ) : null}
    </div>
  );
}

export default DeleteSales;
