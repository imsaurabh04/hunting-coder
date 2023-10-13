import styles from "@/styles/Contact.module.css";
import { useState } from "react";

const Contact = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [notification, setNotification] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { name, email, phone, message }
        // console.log(data)

        fetch("/api/postcontact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(d => {
            console.log(d)
            setNotification("Thanks for Contacting us!")
            setName("")
            setEmail("")
            setPhone("")
            setMessage("")
            setTimeout(() => {
                setNotification("")
            }, 5000)
        })

    }

    const handleChange = (e) => {
        if (e.target.name == "name"){
            setName(e.target.value)
        }
        else if (e.target.name == "email"){
            setEmail(e.target.value)
        }
        else if (e.target.name == "phone"){
            setPhone(e.target.value)
        }
        else if (e.target.name == "message"){
            setMessage(e.target.value)
        }
    }
    
    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.mb10}>
                <h1 className={styles.main}>Contact Us</h1>
                <div className={styles.main2}>
                    <label htmlFor="name" className={styles.formLabel}>
                        Name
                    </label>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.main2}>
                    <label htmlFor="email" className={styles.formLabel}>
                        Email address
                    </label>
                    <input
                        type="email"
                        className={styles.formControl}
                        id="email"
                        aria-describedby="emailHelp"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.main2}>
                    <label htmlFor="phone" className={styles.formLabel}>
                        Phone No.
                    </label>
                    <input
                        type="phone"
                        className={styles.formControl}
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.main2}>
                    <label htmlFor="message" className={styles.formLabel}>Message</label>
                    <textarea className={styles.formControl2} value={message} onChange={handleChange} name="message" id="message" rows="3" required></textarea>
                </div>
                <div>
                    <p className={styles.note}>We will never share your email and phone no. with anyone else.</p>
                </div>

                <button type="submit" className={styles.btn}>
                    Submit
                </button>
                <div>
                    <p className={styles.notification}>{notification}</p>
                </div>
            </div>
        </form>
    );
};

export default Contact;
