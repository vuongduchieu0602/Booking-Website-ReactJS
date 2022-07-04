import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUser, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { reject } from 'lodash';
import {emitter} from '../../utils/emitter';



class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async() => {
        let response = await getAllUser('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async(data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0){
                alert(response.errMessage);
            }else{
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })

                //cách truyền cả data
                // emitter.emit('EVENT_CLEAR_MODAL_DATA', {"id": "your id"});
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error);
        }
        console.log('data from child: ', data);
        
    }

    handleDeleteUser = async(user) => {
        try {
            let response = await deleteUserService(user.id);
            if(response && response.errCode === 0){
                await this.getAllUserFromReact();
            }else{
                alert(response.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async(user) => {
        try {
            let response = await editUserService(user);
            if(response && response.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false
                })

                await this.getAllUserFromReact();
            }else{
                alert(response.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
        
        console.log()
    }


    render() {
        console.log("check render: ", this.state);
        let {arrUsers} = this.state;
        return (
            <div className="container-user">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                {this.state.isOpenModalEditUser && 
                    <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser}
                    toggleUserModal = {this.toggleUserEditModal}
                    currentUser = {this.state.userEdit}
                    editUser = {this.doEditUser}
                    />
                }
                
                <div className="title text-center">User manager</div>
                <div className="mx-4 mb-3">
                    <button 
                        className="btn btn-primary px-3"
                        onClick={()=> this.handleAddNewUser()}
                        >
                        <i className="fas fa-plus"></i>
                        Add new users
                    </button>
                </div>
                
                <div className="users-table mt-4 mx-4">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Role ID</th>
                                <th>Action</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.gender === 1 ? "Male" : "Female"}</td>
                                            <td>{item.roleId}</td>
                                            <td>
                                                <button 
                                                    className="btn-edit"
                                                    onClick = {() => {this.handleEditUser(item)}}
                                                    >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button 
                                                    className="btn-delete"
                                                    onClick={()=>{this.handleDeleteUser(item)}}
                                                    >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
