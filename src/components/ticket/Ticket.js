import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from "react";
import { Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import TicketMessage from './TicketMessage'

const Ticket = () => {
    const [openViewTicket, setOpenViewTicket] = useState(false)

    const dispatch = useDispatch()
    return (
        <div className='' >
            <Col>
                <div className='d-flex justify-content-end position-fixed bottom-0 end-0 m40 '>
                    {openViewTicket && <TicketMessage />}
                </div >
            </Col>
            <FontAwesomeIcon
                onClick={() => setOpenViewTicket(!openViewTicket)}
                className={`${openViewTicket ? " text-primary font60 cursorPointer position-fixed bottom-0 end-0 m-4" : "shadowColor font60 cursorPointer position-fixed bottom-0 end-0 m-4"}`}
                icon={faCommentDots} />
            {/* <TicketModal /> */}
        </div >
    )
}

export default Ticket