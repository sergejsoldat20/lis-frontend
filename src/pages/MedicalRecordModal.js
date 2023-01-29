import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Modal } from "antd";

const MedicalRecordModal = (props) => {
  const { visible, setVisible, id } = props;
  const [inputValue, setInputValue] = useState("");

  const handleOk = () => {
    console.log(inputValue);
    console.log(id);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="My Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input onChange={(e) => setInputValue(e.target.value)} />
      <Button type="primary" onClick={handleOk}>
        Submit
      </Button>
    </Modal>
  );
};

MedicalRecordModal.propTypes = {
  visible: PropTypes.bool,
  id: PropTypes.number,
  setVisible: PropTypes.func,
};

export default MedicalRecordModal;
