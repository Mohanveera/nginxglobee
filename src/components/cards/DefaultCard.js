import React from 'react'


function DefaultCard({title,btnList,children}) {
    const [activeItem, setActiveItem] = React.useState(0);
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

  return (
    <div className="m-4">
        <h5 className="my-4 card-text">{title}</h5>
        <div className="main-content">
            <div className="border-muted border border-2">
                <div className="main-content-header d-flex">
                    {
                        btnList?.map((item,index) => (
                            <div onClick={() => {
                                setActiveItem(index);
                                item.onClick()
                              }} className={activeItem == index ? `main-content-header-text active d-flex px-3 py-3 mx-3` : `main-content-header-text d-flex px-3 py-3 mx-3`}>
                                <h3  className="ms-2 content-text">{item.label}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='children-content border-end border-bottom border-start border-2 border-muted p-4'>
                {children}
            </div>
            </div> 
    </div>
  )
}

export default DefaultCard