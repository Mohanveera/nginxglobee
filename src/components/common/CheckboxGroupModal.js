import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Button, Modal } from "antd";
import { SearchOutlined, DownOutlined,CloseOutlined } from "@ant-design/icons";

const CheckboxGroup = Checkbox.Group;

const CheckboxGroupModal = ({
  formVisible,
  setFormVisible,
  options,
  options2,
  onSubmit,
  title,
  droplabel,
  otherState,
  otherState2,
}) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setSelectedCheckboxes(otherState);
    
  }, [otherState]);
 
  const handleCheckboxChange = (checkedValues) => {    
    localStorage.setItem('key', JSON.stringify(checkedValues))
    setSelectedCheckboxes(checkedValues);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFormSubmit = () => {
    // Handle form submission logic here
   
    onSubmit(selectedCheckboxes);
    setFormVisible(false);
  };

  const handleFormCancel = () => {
    setFormVisible(false);
  };

  const handleDeselectAll = () => {
    setSelectedCheckboxes([]);
  };

  const modifiedOptions = options.map((option) => option.toLowerCase().replace(/_/g, ""));

  const filteredOptions = searchValue
    ? modifiedOptions.filter((option) => option.includes(searchValue.toLowerCase().replace(/_/g, "")))
    : modifiedOptions;

	const handleRemoveCheckbox = (value) => {
		setSelectedCheckboxes((prevSelected) => prevSelected.filter((item) => item !== value));
    
    localStorage.setItem('key', JSON.stringify(selectedCheckboxes.filter((item) => item !== value)))
	  };
	

	let selectedItems = null;
	if (Array.isArray(selectedCheckboxes) && selectedCheckboxes.length > 0) {
		selectedItems = (
		  <div className="d-flex flex-wrap">
			{selectedCheckboxes.map((value) => (
			  <div key={value} style={{ border: "1px solid", margin: "5px", padding: "2px 5px" }}>
				<span >
				  {value}
				  <CloseOutlined
					style={{ marginLeft: "5px", cursor: "pointer" }}
					onClick={() => handleRemoveCheckbox(value)}
				  />
				</span>
			  </div>
			))}
		  </div>
		);
	  }
  return (
    <Modal title={title} visible={formVisible} onCancel={handleFormCancel} footer={null}>
      <div>
        <label>{droplabel}</label>
        <Input suffix={<DownOutlined />} type="button" onClick={() => setShowForm(!showForm)} />
      </div>
      {!showForm && <div style={{ maxHeight: "200px", overflow: "auto" }}>{selectedItems}</div>}

      <div style={{ marginTop: showForm ? "16px" : "0" }}>
        <Form style={{ visibility: showForm ? "visible" : "hidden", transition: "none", margin: "20px 0" }}>
          <Form.Item>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ maxHeight: "200px", overflow: "auto" }}>
              <CheckboxGroup
                options={filteredOptions}
                value={selectedCheckboxes}
                onChange={handleCheckboxChange}
                style={{ display: "flex", flexDirection: "column" }}
              />              
              
            </div>
          </Form.Item>
        </Form>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="link" onClick={handleDeselectAll} className="btn btn-primary" style={{ opacity: 0.2, marginRight: "20px" }}>
            Deselect All
          </Button>
          <Button key="cancel" onClick={handleFormCancel} className="btn btn-secondary me-2" style={{ marginRight: "20px" }}>
            Cancel
          </Button>
          <Button key="submit" type="primary" onClick={handleFormSubmit} className="btn btn-primary">
            Submit
          </Button>
        </Form.Item>
      </div>
    </Modal>
  );
};

export default CheckboxGroupModal;
