import React from 'react';
import { Container, Card, ButtonGroup,Form,Button, FormControl } from 'react-bootstrap';
import axios from 'axios';

class Home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        selectedFile: null,
        selectedFiletoDisplay: null,
        selectedFileName:'',
        showPreview:true,
        showResized:false
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
    onFileUpload = () => {
    
    const formData = new FormData();
    const AWS = require('aws-sdk');
    const ID = '';
    const SECRET = '';
    const BUCKET_NAME = '';
  
    const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET
    });


    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    const params = {
      Bucket: BUCKET_NAME,
      Key: this.state.selectedFile.name, // File name you want to save as in S3
      Body: this.state.selectedFile
    };
  
   
    formData.append("file", this.state.selectedFile);

     s3.upload(params, function(err, data) {
       if (err) {
           throw err;
       }
       console.log(`File uploaded successfully. ${data.Location}`);
     });

    
        
    this.setState({
        showPreview:false,
        showResized:true
    })
  };
  

  handleChange(event) {
    this.setState({
        selectedFiletoDisplay: URL.createObjectURL(event.target.files[0]),
        selectedFile: event.target.files[0] 
    })
    this.setState({
        showPreview:true,
        showResized:false
    })
  };

    render() {
    const fileName = '<path>'+ this.state.selectedFileName;

    return (
        <Container fluid>
        <Card bg={'Dark'.toLowerCase()} text={'white'}>
              <Card.Body><Card.Body>
                <h3>Serverless Application</h3>
              </Card.Body></Card.Body>
          </Card>
          <Card style={{ width: '52rem' }}><Card.Body> 
          <div class="col d-flex justify-content-center">
          <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Select the image that you want to upload</Form.Label>
                  <Form.Control type="file" onChange={this.handleChange}/>
            </Form.Group>
            <div>&nbsp;&nbsp;</div>
            </div>
            <div class="col d-flex justify-content-center">
            <Button  onClick={this.onFileUpload} variant="dark">Upload</Button> 
           
            </div>
        
          </Card.Body></Card>
          <div class="col d-flex justify-content-center">
              {this.state.showPreview===true?
              (<img className="resize" src={this.state.selectedFiletoDisplay}/>):
              (<img className="resize" src={fileName}/>)}
           
          </div>
        </Container>
        
    );
  }
}

export default Home;