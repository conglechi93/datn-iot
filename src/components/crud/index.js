import React from "react";
import StartFirebase from "../../firebaseConfig";
import {ref, set, get, update, remove, child} from 'firebase/database'

export class Crud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            db: '', 
            username: '',
            fullname: '',
            phonenumber: '',
            dob: ''
        }
        this.interface = this.interface.bind(this);
    }

    componentDidMount() {
        this.setState({
            db: StartFirebase() 
        });
    }

    render () {
        return (
<>
            <label > Enter username</label>
            <input type='text' id='userbox' value={this.state.username} 
            onChange={ e => this.setState({username : e.target.value})}></input>
            <br></br>

            <label > Enter fullname</label>
            <input type='text' id='namebox' value={this.state.fullname} 
            onChange={ e => this.setState({fullname : e.target.value})}></input>
            <br></br>

            <label > Enter phonenumber</label>
            <input type='text' id='phonebox' value={this.state.phonenumber} 
            onChange={ e => this.setState({phonenumber : e.target.value})}></input>
            <br></br>

            <label > Enter dob</label>
            <input type='text' id='datebox' value={this.state.dob} 
            onChange={ e => this.setState({dob : e.target.value})}></input>
            <br></br>

            <button id='addBtn' onClick={this.interface}>Add</button>
            <button id='updateBtn' onClick={this.interface}>Add</button>
            <button id='deleteBtn' onClick={this.interface}>Add</button>
            <button id='selectBtn' onClick={this.interface}>Add</button>
        </>
        )
    }
    
    interface(event) {
        const id = event.target.id;

        if(id == 'addBtn') {
            this.insertData();
        }
        if(id == 'updateBtn') {
            this.updateData();
        }
    }

    getAllInput() {
        return {
            username: this.state.username,
            name: this.state.fullname,
            phone: this.state.phonenumber,
            dob: this.state.dob,
        }
    }

    insertData () {
        const db = this.state.db;
        const data = this.getAllInput();
        set(ref(db,'Customer/' + data.username),
        {
            Fullname: data.name,
            PhoneNumber: data.phone,
            dateofBirth: data.dob
        }).then(
            () => {
                alert("Insert Data Success")
            } 
        )
        .catch((error) => alert("Err: " + error));
    }

    updateData () {
        const db = this.state.db;
        const data = this.getAllInput();
        update(ref(db,'Customer/' + data.username),
        {
            Fullname: data.name,
            PhoneNumber: data.phone,
            dateofBirth: data.dob
        }).then(
            () => {
                alert("Update Data Success")
            } 
        )
        .catch((error) => alert("Err: " + error));
    }
}