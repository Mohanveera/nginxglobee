import { Modal } from 'antd';

const ContentModal = ({...props}) => {

  return (
    <>
      <Modal
        title={props.title}
        centered
        open={props.show}
        onOk={props.onHide}
        footer={null}
        onCancel={props.onHide}
      >
        <div style={{height:props.height}}>
            {props.content}
            {
                props.hideFooter == true ? null :
                <div className="footer text-end">
                    <div>
                        <button onClick={props.onHide} className="btn btn-secondary me-2">Cancel</button>
                        <button onClick={props.onSubmit} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            }
        </div>
      </Modal>
    </>
  );
};
export default ContentModal;
