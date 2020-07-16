import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from 'antd';
import axios from 'axios'

class NewMail extends React.Component{
    constructor (props) {
        super(props)
        this.state = { editorHtml: '', theme: 'snow' ,subject:'',to:''}

        this.handleChange = this.handleChange.bind(this)
      }
      
      handleChange (html) {
          this.setState({ editorHtml: html });
      }
      
      handlePropChange = (name,event)=>{
            this.setState({[name]:event.target.value})
      }
   
      handleSendMail = ()=>{
            axios.post('http://localhost:8082/emails', 
            {
                 to:this.state.to,
                 subject:this.state.subject,
                 body:this.state.editorHtml   
            },{
                headers: { Authorization: `Bearer ${this.props.token}` }

            }
            )
            .then(res =>{
                    this.props.modelClose()
            })
      }
      
      render () {
        return (
          <div>
            <Input type="text"  className="default" onChange={(event)=>this.handlePropChange("to",event)} placeholder="To"/><br />
              <Input type="text"  className="default" onChange={(event)=>this.handlePropChange("subject",event)}  placeholder="Enter Email Subject"/>
            <ReactQuill 
              theme={this.state.theme}
              onChange={this.handleChange}
              value={this.state.editorHtml}
              modules={NewMail.modules}
              formats={NewMail.formats}
              bounds={'.app'}
              placeholder={this.props.placeholder}
             />
            <button className="btn btn-primary" onClick={this.handleSendMail}>Send</button>
           </div>
         )
      }
    }
    
    /* 
     * Quill modules to attach to editor
     * See https://quilljs.com/docs/modules/ for complete options
     */
    NewMail.modules = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    }
    /* 
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    NewMail.formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]
    
   

export default NewMail