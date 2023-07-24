import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Select } from "antd";

export const ModalForm = ({ visible, onModalVisibility, title, labelName, onSave, record, subtitle, showShareFields }) => {
  const [form] = Form.useForm();

  const showModal = () => {
    if (typeof onModalVisibility === "function") {
      onModalVisibility(true);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    if (typeof onModalVisibility === "function") {
      onModalVisibility(false);
    }
  };

  const formLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const handleSaveClick = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);

        if (typeof onSave === "function") {
          onSave(values);
        }

        form.resetFields();

        if (typeof onModalVisibility === "function") {
          onModalVisibility(false); // Close the modal
        }
      })
      .catch((errorInfo) => {
        console.log("Form validation failed:", errorInfo);
      });
  };

  useEffect(() => {
    if (record) {
      const fieldMappings = {
        audienceName: "audienceName",
        description: "description",
      };

      const fieldValues = {};

      Object.entries(fieldMappings).forEach(([fieldName, recordKey]) => {
        if (record[recordKey] !== undefined) {
          fieldValues[fieldName] = record[recordKey];
        }
      });

      console.log("dddd", fieldValues);
      form.setFieldsValue(fieldValues); // Set the field values to the form
    }
  }, [record, form]);

  const modalFooter = (
    <div style={{ textAlign: "right" }}>
      <Button onClick={handleCancel} style={{ marginRight: 8 }} className="btn btn-secondary me-2">
        Cancel
      </Button>
      <Button type="primary" onClick={handleSaveClick} className="btn btn-primary">
        Save
      </Button>
    </div>
  );

  const renderEmailIdField = () => {
    const validateEmailIds = (rule, value, callback) => {
      if (!value) {
        callback("Please enter email IDs");
      } else {
        const emailIds = value.replace(/\s+/g, ",").split(",");
        const emailRegex = /^\S+@\S+\.\S+$/;
        for (let i = 0; i < emailIds.length; i++) {
          if (!emailRegex.test(emailIds[i])) {
            callback("Invalid email format");
            return;
          }
        }
        callback();
      }
    };
  
    return (
      <>
        <Form.Item
          label="Email IDs"
          name="emailIds"
          style={{ display: "inline-block", width: "calc(70% - 8px)", marginRight: "16px" }}
          rules={[
            { validator: validateEmailIds }
          ]}
        >
          <Input.TextArea placeholder="Enter email IDs separated by space or comma" rows={1} />
        </Form.Item>
        <Form.Item
          label="Permissions"
          name="permissions"
          style={{ display: "inline-block", width: "calc(30% - 8px)" }}
          rules={[{ required: true, message: "Please select permissions" }]}
        >
          <Select placeholder="Select permissions">
            <Select.Option value="edit">Can Edit</Select.Option>
            <Select.Option value="view">Can View</Select.Option>
          </Select>
        </Form.Item>
      </>
    );
  };
  
  
  return (
    <>
      <Modal visible={visible} onCancel={handleCancel} footer={modalFooter} title={title}>
        <p>{subtitle}</p>
        {!showShareFields && (
          <Form form={form} onFinish={() => {}} {...formLayout}>
            <Form.Item label={labelName} name="audienceName" rules={[{ required: true, message: "Please enter audience name" }]}>
              <Input placeholder="Enter audience name" />
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter description" }]}>
              <Input.TextArea placeholder="Description" />
            </Form.Item>
          </Form>
        )}

        {showShareFields && (
          <Form form={form} onFinish={() => {}} {...formLayout}>
            {renderEmailIdField()}
          </Form>
        )}
      </Modal>
    </>
  );
};
