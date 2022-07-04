import _ from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {emitter} from '../../utils/emitter';

class ModalEditUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

    }

    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: '123456',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,

            })
        }
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


    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        if(isValid){
            //call api edit user
            this.props.editUser(this.state);
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
                    Edit user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input 
                                type="text"
                                onChange = {(event)=> {this.handleOnChangeInput(event, "email")}}
                                value={this.state.email}
                                disabled
                                />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input 
                                type="password"
                                onChange = {(event)=> {this.handleOnChangeInput(event, "password")}}
                                value={this.state.password}
                                disabled
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
                        onClick={() => {this.handleSaveUser()}}
                    >
                        Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);





