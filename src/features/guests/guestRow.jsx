import styled from "styled-components";
import {
  HiOutlinePencil,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
} from "react-icons/hi2";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useDeleteGuest } from "./useDeleteGuest";
import { useCreateGuest } from "./useCreateGuest";
import CreateGuestForm from "./createGuestForm";

const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Img = styled.img`
  display: block;
  width: 2rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(40px);
`;

const GuestRow = ({ guest }) => {
  const { isDeleting, deleteGuest } = useDeleteGuest();

  const {
    id: guestId,
    fullName,
    email,
    nationality,
    nationalID,
    countryFlag,
  } = guest;

  const { createGuest, isCreating } = useCreateGuest();
  async function handleDuplicate() {
    createGuest({
      fullName: `Copy of ${fullName}`,
      email,
      nationalID,
      nationality,
      countryFlag,
    });
  }

  return (
    <Table.Row>
      <Guest>{fullName}</Guest>
      <Guest>{email}</Guest>
      <Guest>{nationalID}</Guest>
      <Guest>{nationality}</Guest>
      <Img src={countryFlag} />

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={guestId} />

            <Menus.List id={guestId}>
              <Modal.Open opens='edit'>
                <Menus.Button icon={<HiOutlinePencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Menus.Button
                icon={<HiOutlineSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='edit'>
              <CreateGuestForm guestToEdit={guest} />
            </Modal.Window>

            <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName='guests'
                disabled={isDeleting}
                onConfirm={() => deleteGuest(guestId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default GuestRow;
