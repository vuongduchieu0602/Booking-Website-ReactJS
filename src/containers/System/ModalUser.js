import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {emitter} from '../../utils/emitter';

class ModalUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

        this.listenToEmitter();
    }

    listenToEmitter(){
        //cách nhận data
        // emitter.on('EVENT_CLEAR_MODAL_DATA', data => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.state({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        });
    }

    componentDidMount() {
        
    }

    toggle = () => {
        this.props.toggleUserModal();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing required parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }


    handleAddNewUser = () => {
        let isValid = this.checkValidInput();
        if(isValid){
            this.props.createNewUser(this.state);
        }   
    }

    render() {
        return (
            <Modal
                fullscreen=""
                size="lg"
                toggle={() => {this.toggle()}}
                isOpen={this.props.isOpen}
                centered
                className="modal-user-container"
            >
                <ModalHeader toggle={() => {this.toggle()}}>
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input 
                                type="text"
                                onChange = {(event)=> {this.handleOnChangeInput(event, "email")}}
                                value={this.state.email}
                                />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input 
                                type="password"
                                onChange = {(event)=> {this.handleOnChangeInput(event, "password")}}
                                value={this.state.password}
                            />
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input 
                                type="text"
                                onChange = {(event)=> {this.handleOnChangeInput(event, "firstName")}}
                                value={this.state.firstName}
                                />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input 
                                type="text"
                                onChange = {(event)=> {this.handleOnChangeInput(event, "lastName")}}
                                value={this.state.lastName}
                                />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input 
                                type="text"
                                onChange = {(event)=> {this.handleOnChangeInput(event, "address")}}
                                value={this.state.address}
                                />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => {this.handleAddNewUser()}}
                    >
                        Add
                    </Button>
                    {' '}
                    <Button 
                        className="px-3"
                        onClick={() => {this.toggle()}}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);





