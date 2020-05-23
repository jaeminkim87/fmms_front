import React, { useState } from 'react';
import {
  Button,
  Container,
  FormControl, Grid, LinearProgress, Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

function App() {
  const [isDisable, setIsDisable] = useState(false);
  const [comment, setComment] = useState('');
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [token, setToken] =  useState('');

  const useStyles = makeStyles(theme => ({
    container: {
      display: "flex"
    },
    formControl: {
      marginBottom: theme.spacing(5)
    },
    paper: {
      padding: theme.spacing(5)
    },
    title: {
      marginBottom: theme.spacing(2)
    },
    textarea: {
      marginBottom: theme.spacing(3)
    },
    progressBar: {
      marginBottom: theme.spacing(3)
    }
  }));

  const styles = useStyles();

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  }

  const handleValidate = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsDisable(true);
    axios.post('/inference', {
      "comment": comment
    }).then((response) => {
      setIsDisable(false);
      console.log(response.data);
      const {label, max_prob, tokenized_comment} = response.data;
      const percent = max_prob * 100;
      if (label === 1) {
        setPositive(percent);
        setNegative(100 - percent);
      } else if (label === 0) {
        setPositive(100 - percent);
        setNegative(percent);
      }
      setToken(tokenized_comment);
    }).catch((error) => {
      console.log(error);
      setIsDisable(false);
    });
  }

  return (
    <Container maxWidth={"xl"} className={styles.container}>
      <Grid container justify={"center"} alignContent={"center"} spacing={0}>
        <Grid item xs={12}>
          <Paper elevation={3} className={styles.paper}>
            <Typography variant={"h3"} component={"h1"}
                        className={styles.title}>
              긍정 부정 판별기
            </Typography>
            <FormControl fullWidth className={styles.formControl}>
              <TextField required label={"comment"} variant={"outlined"}
                         placeholder={"Input Comment"} autoFocus={true}
                         helperText={"긍/부정 체크할 문장을 넣어주세요"}
                         className={styles.textarea}
                         value={comment}
                         onChange={onChangeInput}
              />
              <Button variant={"contained"} color={"primary"}
                      size={"large"} disabled={isDisable}
                      onClick={handleValidate}>판단하기
              </Button>
            </FormControl>
            <Typography variant={"h4"} component={"h1"}
                        className={styles.title}>
              결과
            </Typography>

            긍정 : {positive}%
            <LinearProgress variant="determinate" value={positive}
                            className={styles.progressBar}/>
            부정 : {negative}%
            <LinearProgress variant="determinate" value={negative}
                            color="secondary" className={styles.progressBar}/>
            토크나이즈 현황<br />
            {token}
          </Paper>
        </Grid>
      </Grid>
    </Container>

  );
}

export default App;
