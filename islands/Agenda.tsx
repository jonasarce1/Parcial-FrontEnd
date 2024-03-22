import { useState } from "preact/hooks";
import { FunctionComponent, JSX } from "preact";


type Error = {
    error: boolean;
    message: string;
}

type Contact = {
    name: string;
    mail: string;
}

const Agenda: FunctionComponent = () => {
    const [error, setError] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [mail, setMail] = useState<string>("");

    let errorAux = false;

    const[contacts, setContacts] = useState<Contact[]>();

    const checkMail = (value:string) => {
        if(!value.includes("@") || !value.includes(".")){
            setError(true);
            errorAux = true;
        }

        if(contacts?.find(contact => contact.mail === value)){
            setError(true);
            errorAux = true;
        }
    }

    const isComplete = (name:string, mail:string) => {
        if(name === "" || mail === ""){
            setError(true);
            errorAux = true;
        }
    }

    const addContact = (e:JSX.TargetedEvent<HTMLFormElement>, name:string, mail:string) => {
        e.preventDefault();
        isComplete(name, mail);
        checkMail(mail)

        if(!errorAux){
            if(contacts){
                setContacts([...contacts, {name, mail}]);
            }else{
                setContacts([{name, mail}]);
            }
        }

        console.log(contacts)
    }

    return(
        <div>
            {contacts && contacts.length > 0 &&
            <div class = "contactlist">
                <h1>Contacts</h1>
                <ul>
                    {contacts.map((contact, index) => {
                        return(
                            <li key = {index}>
                                <span>{contact.name}</span>
                                <span>{contact.mail}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>}


            <div class = "form">
                <form method = "POST" onSubmit={(e) => addContact(e, name, mail)}>
                    <h1>Add new contact</h1>
                    <div>
                        <input type="text" name = "name" value = {name} placeholder = "Name"
                        onInput={(e) => setName(e.currentTarget.value)}
                        onFocus={() => setError(false)}
                        />
                    </div>

                    <div>
                        <input type = "text" name = "mail" value = {mail} placeholder= "Email"
                        onInput={(e) => setMail(e.currentTarget.value)}
                        onFocus={() => setError(false)}
                        />
                    </div>

                    <div>
                        <button type = "submit" class = "button">
                        Add contact
                        </button>
                    </div>

                {error && <div class = "error">Invalid contact. A field is empty, email is invalid, or the email is already in use.</div>}
                </form>
            </div>
        </div>
    )
}

export default Agenda;