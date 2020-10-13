import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: "0 auto",
    marginTop: 20,
    marginBottom: 80
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    color: "#3f51b5",
    textTransform: "uppercase"
  },
  graph: {
    marginTop: 50
  }
}));

export default function GlobalStats() {
  const classes = useStyles();

  let [globalData, setGlobalData] = useState({});

  useEffect(() => {
    async function getData() {
      const response = await fetch('https://api.thevirustracker.com/free-api?global=stats');
      let data = await response.json();
      delete data.results[0].source;
      setGlobalData(data.results[0]);
    }

    getData()
  }, [])

  let keyData = Object.keys(globalData)
  let valueData = Object.values(globalData)

  const data = {
    datasets: [{
      label: "Global Stats",
      data: [
        valueData[0],
        valueData[1],
        valueData[2],
        valueData[3],
        valueData[4],
        valueData[5],
        valueData[6],
        valueData[7],
        valueData[8],
      ],
      borderWidth: 1,
      borderColor: [
        '#FF6304',
        '#4BC000',
        '#FFCE06',
        '#E7E90D',
        '#36A20B',
        '#4BC00F',
        '#FFEE03',
        '#E7AB0D',
        '#EE18ED'
      ],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB',
        '#4BC0FF',
        '#FFEE63',
        '#E7ABED',
        '#EE28ED'
      ],
      hoverBackgroundColor: [
        '#FF5184',
        '#4BAFC0',
        '#FFBD56',
        '#E7D8ED',
        '#3691EB',
        '#4BAFFF',
        '#FFDD63',
        '#E79AED',
        '#EE08ED'
      ],
      hoverBorderColor: [
        '#FF4184',
        '#4B9FC0',
        '#FFAD56',
        '#E7C8ED',
        '#3681EB',
        '#4B9FFF',
        '#FFCD63',
        '#E78AED',
        '#EDF8ED'
      ]
    }],
    labels: [
      keyData[0],
      keyData[1],
      keyData[2],
      keyData[3],
      keyData[4],
      keyData[5],
      keyData[6],
      keyData[7],
      keyData[8],
    ]
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>WorldWide Covid-19 Stats</h1>
      <Grid container spacing={3}>
        {
          Object.keys(globalData).map((key, ind) => {
            return (
              <Grid item xs={12} sm={4} key={ind} >
                <Paper className={classes.paper} elevation={3}>
                  <h3 className={classes.title}>{key.replace(/_/g, " ")}</h3>
                  <h3>{globalData[key]}</h3>
                </Paper>
              </Grid>
            )
          })
        }
      </Grid>
      <div className={classes.graph}>
        <h3 className={classes.title}>Graph</h3>
        <Bar
          data={data}
          width={100}
          height={500}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    </div>
  );
}