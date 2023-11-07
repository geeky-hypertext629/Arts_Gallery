import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Author.css"
import { useParams } from 'react-router-dom';
import axios from "axios";

const Author = () => {

    const navigate = useNavigate();
    let { name } = useParams();
    
    const [user, setUser] = useState({})
    const getUser = async () =>{
        try {
            const {data} = await axios.get(
                `/api/v1/authorDetails/${name}`
            )
            setUser(data.user)
        } catch (error) {
            console.log(error)
        }
    }

    const loading = false;
    useEffect(() => {
        getUser();
    }, [])


    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={`${user.name}'s Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h1>
                                {user.name}'s Profile
                            </h1>
                            <img src={user.avatar && user.avatar.url} alt={user.name} />
                        </div>

                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substring(0, 10)}</p>
                            </div>
                            <div>
                                <Link to="/contact">Contact Him</Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>

    )
}

export default Author;