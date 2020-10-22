import { useState } from 'react';
import { getProductById, getCategories } from '../../lib/cms';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  productImageWrapper: {
    width: 300,
    height: 300,
    color: 'white',
    display: 'flex',
    alignItems: 'center',

    '& h4': {
      flex: 'auto',
      textAlign: 'center',
    },
  },
  tabWrapper: {
    marginTop: 10,
  },
}));

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function ProductPage({ product }) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <div
            className={classes.productImageWrapper}
            style={{ backgroundColor: product.img }}
          >
            <Typography variant="h4">{product.name}</Typography>
          </div>
        </Grid>
        <Grid item>
          <Paper className={classes.control}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">{product.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <div>${product.price}</div>
                <div>
                  <Rating value={Number(product.rating)} readOnly />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" variant="contained">
                  Add To Cart
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <div className={classes.tabWrapper}>
        <AppBar position="relative" color="inherit">
          <Tabs
            variant="fullWidth"
            value={selectedTab}
            onChange={handleTabChange}
          >
            <Tab label="Description" />
            <Tab label="Specs" />
          </Tabs>
        </AppBar>
        <TabPanel value={selectedTab} index={0}>
          {product.description}
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          {product.specs}
        </TabPanel>
      </div>
    </div>
  );
}
export function getServerSideProps({ params }) {
  // fetch mock product by id
  const product = getProductById(params.id);

  return {
    props: { product },
  };
}
