import React from 'react';
import axios from 'axios'

class Login extends React.Component{

    state = {
        userName : '',
        password:'',
        isError:false,
        message:''

    }
    handleLoginAction = () =>{
            axios.post('http://localhost:8081/login',{
                "username":this.state.userName,
                "password":this.state.password
            }).then(res =>{
                console.log(res.data.token)
                const token = res.data.token
                if(typeof window!= "undefined"){
                    localStorage.setItem("token",token)
                    this.props.history.push('/profile')
                }

            }).catch(err =>{
                this.setState({isError:true,message:'Invalid Credentials...'})
            })
    }

    handleOnChange = (name,event) =>{
        this.setState({[name]:event.target.value})
    }
    render(){
       
        return(
            <div className="login-container">
            <div>
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" onChange={(event)=>this.handleOnChange("userName",event)} placeholder="Email"/>
            </div>
            <div>
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control"  onChange={(event)=>this.handleOnChange("password",event)} placeholder="Password"/>
            </div>
            
            <button type="submit"  onClick={this.handleLoginAction} className="btn btn-primary">Login</button>
            
                {
                    this.state.isError ? <div className="alert alert-danger">{this.state.message}</div>:null
                }
          </div>
            )        
    }
}

export default Login