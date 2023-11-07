import React from 'react';
import { Link } from 'react-router-dom';
import "./AboutPage.css";
import Avatar from "./../../images/Avatar.jpg"
import InstagramIcon from "@material-ui/icons/Instagram"
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Resume_1 from "./../../images/Resume_1.pdf"
import { useSelector } from 'react-redux';


const AboutPage = () => {
    const { user } = useSelector((state)=> state.user);

    return (
        <>
        <section className="home" id="home">
            <div className="home-content">
                <h3>Hello, Art Enthusiast </h3>
                <h1>{user && user.name }</h1>
                <h3>We are <span className="multiple-text">Arts_Island</span> </h3>
                <p>We love to Art. Arts shape our way of living. We are moving forward with the motto of spreading art culture across the globe.
                    The arts displayed here are made by art Enthusiasts just like us from around the country.</p>

                <div className="social-media">
                    <Link to="https://www.facebook.com/subham.chandra.750/"><FacebookIcon className="fa-brands fa-facebook" /></Link>
                    <Link to="https://twitter.com/SubhamC60715111"><TwitterIcon className="fa-brands fa-twitter" /></Link>
                    <Link to="https://www.instagram.com/subhamchandra222/"><InstagramIcon className="fa-brands fa-instagram" /></Link>
                    <Link to="https://www.linkedin.com/in/subhamchandra528/"><LinkedInIcon className="fa-brands fa-linkedin" /></Link>
                </div>
                <a href='/' className="btn">Join the community</a>
            </div>

            <div className="home-img">
                <img src={Avatar} alt="" />
            </div>

        </section>
        </>

    )
}

export default AboutPage;
