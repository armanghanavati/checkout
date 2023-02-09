import { faCommentDots, faPaperPlane, faCancel } from '@fortawesome/free-solid-svg-icons'
import React, { useRef, useState, useEffect } from 'react'
import { Button, Col } from 'react-bootstrap'
import { RsetAllMessage, RsetMessageTicket, selectAllMessage, selectMessageTicket } from '../slices/mainSlices'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageDto } from './chat/ChatMessageDto'
import { useParams } from "react-router-dom";
import io from 'socket.io-client';


const TicketMessage = () => {

    const socket = io();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);

    const dispatch = useDispatch()
    const titleInputRef = useRef()
    const webSocket = useRef(null)
    const sendBtnRef = useRef()
    const messageInputRef = useRef()

    const [user, setUser] = useState("")
    // const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    let { roomId } = useParams();

    const title = useSelector(selectMessageTicket)
    const messages = useSelector(selectAllMessage)

    console.log(title.length !== 0);


    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('pong', () => {
            setLastPong(new Date().toISOString());
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    // useEffect(() => {
    //     const newSocket = new WebSocket(`ws://localhost:8080/ws/${roomId}`);

    //     newSocket.onopen = (event) => {
    //         console.log("WebSocket connected:", event);
    //     };

    //     newSocket.onmessage = (event) => {
    //         dispatch(RsetMessageTicket(((prevMessages) => [...prevMessages, event.data])));
    //     };

    //     setSocket(newSocket);

    //     return () => {
    //         newSocket.close();
    //     };
    // }, [roomId]);

    const sendMessage = (event) => {
        event.preventDefault();

        socket.send(message);
        setMessage("");
    };
    let name = "قنواتیان"

    // useEffect(() => {
    //     titleInputRef.current.focus()
    //     webSocket.current = new WebSocket("ws://localhost:3000/chat")
    //     webSocket.current.onopen = (event) => {
    //         console.log("open:", event);
    //     }
    //     webSocket.current.onclose = (event) => {
    //         console.log("close:", event);
    //     }
    //     return () => {
    //         console.log("closing webSocket");
    //         webSocket.current.close()
    //     }
    // }, [])

    // useEffect(() => {
    //     webSocket.current.onmessage = (event) => {
    //         const chatMessageDto = JSON.parse(event.data);
    //         console.log("message", chatMessageDto);
    //         dispatch(RsetAllMessage([...messages, { user: chatMessageDto.user, title: chatMessageDto.title }]))
    //     }
    // }, [messages])

    const handleEnter = (e) => {
        console.log(e);
        e.which = e.which || e.keyCode;
        if (e.which === 13) {
            switch (e.target.id) {
                case "messageText":
                    sendBtnRef.current.focus();
                    break;
                case "send":
                    titleInputRef.current.focus();
                    break;
                default:
                    break;
            }
            e.preventDefault();
        }
    };
    
    return (
        <div className='d-flex' >
            <div className='px-1 pt-1 w-h400 rounded shadow bg-primary boxText' >
                <p className=' bg-warning text-end p-2 font12 backTextPoshtibani m-1' > سلام {name} هستم چطور میتونم کمکتون کنم؟</p>
                {messages.map((mess, index) =>
                    <div
                        key={index}
                        className='d-flex text-start p-2 font12 bg-light m-1 backText justify-content-end ' >
                        {mess.title}
                    </div>)}
                <div className='d-flex ms-2 positionFixedSendBox'>
                    <Col className='' >
                        <input
                            id="messageText"
                            onKeyDown={handleEnter}
                            row='1'
                            ref={titleInputRef}
                            value={title}
                            onChange={(e) => {
                                dispatch(RsetMessageTicket(e.target.value))
                            }}
                            placeholder='متن را وارد کنید . . .'
                            className='form-control' />
                    </Col>
                    <div className='d-flex align-items-end' >
                        <Button
                            onKeyDown={handleEnter}
                            id="send"
                            onClick={(e) => {
                                if (title.length !== 0) {
                                    socket.emit('ping');
                                    e.preventDefault()
                                    dispatch(RsetAllMessage([...messages, { title }]))
                                    dispatch(RsetMessageTicket(""))
                                    titleInputRef.current.focus()
                                    if (user && title) {
                                        console.log("send!");
                                        webSocket.current.send(JSON.stringify(new ChatMessageDto(user, title)))
                                    }
                                }
                            }}
                            ref={sendBtnRef}
                            variant="warning"
                            className='font6 ms-1'
                            icon={faPaperPlane} >
                            ارسال
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketMessage

