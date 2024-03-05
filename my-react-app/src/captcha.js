import React, { useState, useEffect } from 'react';
import captchaImg from './assets/captcha.jpeg';

function Captcha() {
    const [user, setUser] = useState({ username: "" });
    const [captcha, setCaptcha] = useState("");

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const characters = 'abc123';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setCaptcha(result);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const onSubmit = () => {
        const element = document.getElementById("succesBTN");
        const inputData = document.getElementById("inputType");
        element.style.cursor = "wait";
        element.innerHTML = "Checking...";
        inputData.disabled = true;
        element.disabled = true;

        const myFunctions = () => {
            if (captcha === user.username) {
                element.style.backgroundColor = "green";
                element.innerHTML = "Captcha Verified";
                element.disabled = true;
                element.style.cursor = "not-allowed";
                inputData.style.display = "none";
            } else {
                element.style.backgroundColor = "red";
                element.style.cursor = "not-allowed";
                element.innerHTML = "Not Matched";
                element.disabled = true;
                const myFunction = () => {
                    element.style.backgroundColor = "white";
                    element.style.cursor = "pointer";
                    element.innerHTML = "Verify Captcha";
                    element.disabled = false;
                    inputData.disabled = false;
                    inputData.value = '';
                };
                setTimeout(myFunction, 5000);
            }
        };
        setTimeout(myFunctions, 5000);
    };

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-md-4"></div>
                <div className="col-md-8" style={{ position: "relative" }}>
                    <img src={captchaImg} style={{ width: "150px", height: "50px" }} alt="Captcha" />
                    <h4 id="captcha" style={{ position: "absolute", top: "25%", left: "12%", transform: "translate(-50%, -50%)", color: "black", textShadow: "1px 1px 2px black" }}>{captcha}</h4>
                    <div className="form-group row mt-3">
                        <input type="text" id="inputType" className="form-control" placeholder="Enter Captcha"
                            name="username" onChange={handleChange} autoComplete="off" style={{ width: "20%" }} />
                        <button type="button" id="succesBTN" onClick={onSubmit} className="btn btn-primary ml-3 border border-gray-400 p-1 rounded-md shadow-md">Verify Captcha</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Captcha;
