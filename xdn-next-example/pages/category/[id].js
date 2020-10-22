import Link from 'next/link';
import { Prefetch } from '@xdn/react';
import { getCategories, getCategory } from '../../lib/cms';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80%',
  },
  gridListItem: {
    padding: 8,
    height: '100%',
  },
  gridListItemWrapper: {},
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function ProductListingPage({ products }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <GridList cols={3} className={classes.gridList}>
          {products.map((product) => (
            <div key={product.id} className={classes.itemWrapper}>
              <Link as={product.href} href="/product/[id]" passHref>
                <Prefetch>
                  <a className={classes.link}>
                    <GridListTile
                      className={classes.gridListItem}
                      style={{ backgroundColor: product.img }}
                    >
                      <GridListTileBar
                        title={product.name}
                        actionIcon={
                          <IconButton
                            aria-label={`info about ${product.name}`}
                            className={classes.icon}
                          >
                            <InfoIcon />
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  </a>
                </Prefetch>
              </Link>
            </div>
          ))}
        </GridList>
      </Grid>
    </div>
  );
}

export function getServerSideProps({ params }) {
  // fetch mock products for category
  const { products } = getCategory(params.id);

  return {
    props: { products },
  };
}
