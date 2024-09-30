import React from 'react'


export default function Task(props) {
    

  return (
    <>
      <div>
        <div className="task shadow mt-4 p-md-2 p-4 d-flex justify-content-between">
            <div className="details d-flex flex-column flex-wrap w-75">
            <h3>{props.newtask}</h3>
            <p >{props.des}</p>
            {props.isCompleted &&(<>
                <p>Completed on {props.time}</p>
            </>)}
            </div>
           
            <div className="actions d-flex gap-2 mt-4 justify-content-end ">

          
            <i className="fa-solid fa-trash" onClick={()=>{props.delTask(props.index)}}></i>


            {!props.isCompleted && (
              <>
                {/* Edit icon */}
                <i className="fa-regular fa-pen-to-square" onClick={()=>{props.update(props.index)}}></i>

                {/* Done icon */}
                <i className="fa-solid fa-check-double" onClick={() => props.complete(props.index)}></i>
              </>
            )}
            
            </div>
            
        </div>
         
       </div>
    </>
     )
}
