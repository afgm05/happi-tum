import React from "react";
import { ImGithub } from "react-icons/im";
import { SiGitlab } from "react-icons/si";
import { BsLinkedin, BsTwitter, BsInstagram, BsYoutube} from "react-icons/bs";


export default function Footer() { 
    return (
        <footer className="pt-4 pb-0 mt-5" style={{}}>
            <div className="container-fluid text-center text-md-left">
            <div className="row">
                <div className="col-md-6 mt-md-0 mt-3" style={{"fontSize": "12px"}}>
                    <h5 className="text-uppercase">Disclaimer</h5>
                    <p className="my-0">The images used for this e-commerce app are not mine and were images taken from Google.</p>
                    <p className="my-0">If you see your image being used here and want it removed please email me at</p>
                    <p>aly.faye05@gmail.com</p>
                </div>
                <hr className="clearfix w-100 d-md-none pb-0"/>
                <div className="col-md-6 mb-md-0 mb-3 d-flex justify-content-end pe-5">                             
                    <a href="#!" style={{color: 'black'}} className="fs-4 px-2"><ImGithub /></a>
                    <a href="#!" style={{color: 'black'}} className="fs-4 px-2"><SiGitlab /></a>
                    <a href="#!" style={{color: 'black'}} className="fs-4 px-2"><BsTwitter /></a>
                    <a href="#!" style={{color: 'black'}} className="fs-4 px-2"><BsInstagram /></a>
                    <a href="#!" style={{color: 'black'}} className="fs-4 px-2"><BsYoutube /></a>
                    <a href="#!" style={{color: 'black'}} className="fs-4 ps-2 pe-5"><BsLinkedin /></a>                                
                </div>
            </div>
            </div>
            <div className="footer-copyright text-center py-3">© 2022 Copyright | FM
            </div>
        </footer>
    )
}

