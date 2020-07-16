import React from 'react';
import axios from 'axios'
import { Card } from 'antd';
import { Menu } from 'antd';
import NewMail from './NewMail';

class Profile extends React.Component{

    state = {
        folders : [],
        emails:[],
        token:'',
        emailContent : '',
        selectedFolderId :'',
        newMail:false
    }
    componentDidMount(){
            const token = localStorage.getItem("token")
            axios.get('http://localhost:8082/folders',{
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res =>{
                  console.log(res.data) 
                  this.setState({token:token,folders:res.data}) 
            })
            .catch(err=>{
                console.log(err)
            })
            axios.get('http://localhost:8082/folders/1/emails',{
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res =>{
                  console.log(res.data) 
                  //this.setState({folders:res.data}) 
                  this.setState({emails:res.data,selectedFolderId:"1"})
            })
            .catch(err=>{
                console.log(err)
            })
        }

    handleFolderChange =(id) =>{
        axios.get(`http://localhost:8082/folders/${id}/emails`,{
            headers: { Authorization: `Bearer ${this.state.token}` }
        })
        .then(res =>{
              console.log(res.data) 
              //this.setState({folders:res.data}) 
              this.setState({emails:res.data,selectedFolderId:id})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleEmailContent = (id)=>{
          const emailCopy = this.state.emails
            const index = emailCopy.findIndex( email => email.id === id)
            console.log(index)
            this.setState({emailContent:this.state.emails[index]})

    }

    deleteEmail  = () =>{
        axios.delete(`http://localhost:8082/emails/${this.state.emailContent.id}`,{
            headers: { Authorization: `Bearer ${this.state.token}` }
        })
        .then(res =>{
              console.log(res.data) 
              //this.setState({folders:res.data}) 
             let emailCopy = JSON.parse(JSON.stringify(this.state.emails))
             const index = emailCopy.findIndex( email => email.id === this.state.emailContent.id)
             console.log(index)
             emailCopy.splice(index,1)
             console.log(emailCopy)
             this.setState({emails:emailCopy,emailContent:''})
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleNewMessage = ()=>{
        this.setState({newMail:true})
    }
    closeNewMail = () =>{
        this.setState({newMail:false})

    }
    render(){
        return(
            <React.Fragment>
            <Menu mode="horizontal">
            <Menu.Item onClick={this.handleNewMessage}>
                    New Message
            </Menu.Item>
            <Menu.Item>
            
            </Menu.Item>
            <Menu.Item>
            
            </Menu.Item>
            <Menu.Item onClick={this.deleteEmail}>
                Delete
            </Menu.Item>
            </Menu>
            <div className="profileContainer row">
                <div className="common folders col-2">
            <div className="panel panel-default p-0  m-t-20">
                <div className="panel-body p-0">
                    <Menu mode="vertical-left">
                    {
                        this.state.folders.map((folder) =>{
                            return(
                                 <Menu.Item mode="" key={folder.id}   onClick={() => this.handleFolderChange(folder.id)}>{folder.titile}
                                 </Menu.Item>
                            )
                        })
                    }
                    </Menu>
                    </div>
                </div>   
                </div>  
                <div className="common emails col-3">
                {console.log('last:',this.state.emails)}
                    {
                        
                        this.state.emails.map(email =>{
                            return (
                                <Card  key={email.id} className="i mb-2" title={email.title}  
                                onClick={()=>this.handleEmailContent(email.id)}>
                                {email.subject}
                            </Card>
                            )
                        })
                    }
                   
                </div>
                <div className="common emailDetails col-7">
                    {
                        this.state.newMail ? <NewMail modelClose={this.closeNewMail} token={this.state.token} /> :
                    
                        <Card key={this.state.emailContent.id} title={this.state.emailContent.title}>
                        <Card type="inner" title={this.state.emailContent.subject}>
                          {this.state.emailContent.body}
                        </Card>
                        </Card>
                    }
                </div>
                

            </div>
            </React.Fragment>
        )
    }
}

export default Profile