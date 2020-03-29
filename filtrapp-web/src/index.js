import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./SignIn";
import { Button, CssBaseline, TextField, Container } from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";

import IconLogo from "./assets/logo.png";
import IconGallery from "./assets/gallery.png";

const StyledButton = styled(Button)({
  background: "#e300ef",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(105, 105, 105, .3)",
  color: "white",
  height: 48,
  marginTop: 5,
  padding: "0 30px",
  "&:hover": {
    backgroundColor: "#ffffff",
    color: "#e300ef",
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#ffffff"
  },
  "&:focus": {
    boxShadow: "none"
  }
});

const StyledTextField = styled(TextField)({
  "& label": {
    color: "white"
  },
  "& label.Mui-focused": {
    color: "white"
  },
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "#e300ef"
    },
    "&:hover fieldset": {
      borderColor: "white"
    },
    "&.Mui-focused fieldset": {
      borderColor: "white"
    }
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipString: "",
      portString: "",
      isLoading: false,
      selected: false,
      file: null,
      image: IconGallery
    };
  }

  async _onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var tmppath = URL.createObjectURL(event.target.files[0]);
    await this.setState({ file: event.target.files[0], image: tmppath, selected: true }); /// if you want to upload latter
  }

  _sendFile = async () => {
    if (this.state.selected) {
      var reader  = new FileReader();
      reader.onloadend = function () {
        var file = reader.result;
        var formData = new FormData();
        formData.append("image", file);
        //console.log(formData.get('image').split(','))
        console.log(formData.get('image').split(',').pop())
      }
      reader.readAsDataURL(this.state.file)

    }
  };

  render() {
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={useStyles.logo}></div>
        <div className={useStyles.container}>
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <img height={300} width={300} alt="" src={IconLogo} />
          </div>
          <form className={useStyles.form} noValidate>
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ip"
              label="IP Address"
              name="ip"
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="port"
              label="Port"
              id="port"
            />
            <input
              accept="image/*"
              id="contained-button-file"
              ref={ref => (this.upload = ref)}
              onChange={this._onChangeFile.bind(this)}
              type="file"
              style={{ display: "none" }}
            />
            <div
              style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "center"
              }}
            >
              <img height={100} width={100} alt="" src={this.state.image} />
            </div>
            <StyledButton
              style={{ display: "block", textAlign: "center" }}
              onClick={() => {
                this.upload.click();
              }}
              fullWidth
            >
              SELECT IMAGE
            </StyledButton>
          </form>
          <form className={useStyles.form} noValidate>
            <StyledButton onClick={this._sendFile} fullWidth>
              SEND
            </StyledButton>
          </form>
        </div>
      </Container>
    );
  }
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    display: "inline-block"
  },
  input: {
    display: "none"
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  }
});

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
