// see xdn/scrapper.js file for PDP links auto-scrapping
import { SUFFIX_SPLAT } from './constants';

const prerenderRoutes = [
  // HP
  '/',
  // PLP
  '/venia-bottoms.html',
  '/venia-bottoms/venia-pants.html',
  '/venia-bottoms/venia-skirts.html',
  '/venia-tops.html',
  '/venia-tops/venia-blouses.html',
  '/venia-tops/venia-sweaters.html',
  '/venia-dresses.html',
  '/venia-accessories.html',
  '/venia-accessories/venia-belts.html',
  '/venia-accessories/venia-jewelry.html',
  '/venia-accessories/venia-scarves.html',
  '/shop-the-look.html',
  '/shop-the-look/minimalist-sensibility.html',
  '/shop-the-look/outside-the-lines.html',
  '/shop-the-look/carefree-days.html',
  '/shop-the-look/perfectly-beachy.html',
  '/shop-the-look/retire-your-lbd.html',
  '/shop-the-look/timeless-sophistication.html',

  // PDP
  /// PDP - bottoms
  '/agatha-skirt.html',
  '/amara-crochet-shorts.html',
  '/bella-eyelet-capris.html',
  '/bellona-skirt.html',
  '/calista-linen-pants.html',
  '/camilla-palazzo-pants.html',
  '/clara-wide-leg-pants.html',
  '/daria-crochet-skirt.html',
  '/davina-skirt.html',
  '/fauna-palazzo-pants.html',
  '/gloria-palazzo-pants.html',
  '/honora-wide-leg-pants.html',
  '/iona-skirt.html',
  '/isadora-skirt.html',
  '/johanna-skirt.html',
  '/lenora-crochet-shorts.html',
  '/leona-skirt.html',
  '/liana-lace-shorts.html',
  '/pomona-skirt.html',
  '/portia-shorts.html',
  '/rowena-skirt.html',
  '/samara-skirt.html',
  '/selena-pants.html',
  '/tatiana-skirt.html',

  /// PDP - tops
  '/anna-draped-top.html',
  '/aurora-sleeveless-blouse.html',
  '/brigid-boucle-cardigan.html',
  '/carina-cardigan.html',
  '/chloe-silk-shell.html',
  '/cora-open-back-tank.html',
  '/corina-lace-back-sweater.html',
  '/echo-sweater.html',
  '/emilia-cropped-lace-top.html',
  '/hanna-sweater.html',
  '/helena-cardigan.html',
  '/isabella-sleeveless-blouse.html',
  '/jillian-top.html',
  '/juno-sweater.html',
  '/lorena-cardigan.html',
  '/penelope-peasant-blouse.html',
  '/phoebe-cardigan.html',
  '/rosalina-cardigan.html',
  '/roxana-cropped-sweater.html',
  '/sabina-hooded-cardigan.html',
  '/serena-blouse.html',
  '/susanna-draped-tank.html',
  '/valeria-two-layer-tank.html',
  '/vitalia-top.html',

  /// PDP - dresses:
  '/alexia-maxi-dress.html',
  '/angelina-tank-dress.html',
  '/athena-tank-dress.html',
  '/candace-dress.html',
  '/claudia-crochet-dress.html',
  '/felicia-maxi-dress.html',
  '/flora-tank-dress.html',
  '/karena-halter-dress.html',
  '/paulina-draped-tank-dress.html',
  '/petra-sundress.html',
  '/valentina-tank-dress.html',
  '/veronica-maxi-dress.html',

  /// PDP - accessories
  '/antonia-infinity-scarf.html',
  '/augusta-earrings.html',
  '/augusta-necklace.html',
  '/augusta-trio.html',
  '/carmina-earrings.html',
  '/carmina-necklace.html',
  '/carola-infinity-scarf.html',
  '/dulcea-infinity-scarf.html',
  '/gold-cirque-earrings.html',
  '/gold-omni-bangle-set.html',
  '/gold-sol-earrings.html',
  '/gold-veritas-cuff-set.html',
  '/laser-cut-stretch-belt.html',
  '/luna-scarf.html',
  '/natalia-scarf.html',
  '/night-out-collection.html',
  '/ombre-infinity-scarf.html',
  '/semper-bangle-set.html',
  '/silver-amor-bangle-set.html',
  '/silver-cirque-earrings.html',
  '/silver-sol-earrings.html',
  '/stretch-belt-with-leather-clasp.html',
  '/thick-leather-braided-belt.html',
  '/thin-leather-braided-belt.html',

  /// PDP - shop-the-look
  '/clara-wide-leg-pants.html',
  '/felicia-maxi-dress.html',
  '/flora-tank-dress.html',
  '/hanna-sweater.html',
  '/helena-cardigan.html',
  '/honora-wide-leg-pants.html',
  '/stretch-belt-with-leather-clasp.html',
  '/tatiana-skirt.html',
  '/valeria-two-layer-tank.html',
  '/vitalia-top.html',
];

const cacheRoutes = [
  // HP
  '/',
  // PLP
  `/shop-${SUFFIX_SPLAT}`,
  `/venia-${SUFFIX_SPLAT}`,
  // PDP
  `/agatha-${SUFFIX_SPLAT}`,
  `/alexia-${SUFFIX_SPLAT}`,
  `/amara-${SUFFIX_SPLAT}`,
  `/angelina-${SUFFIX_SPLAT}`,
  `/anna-${SUFFIX_SPLAT}`,
  `/antonia-${SUFFIX_SPLAT}`,
  `/athena-${SUFFIX_SPLAT}`,
  `/augusta-${SUFFIX_SPLAT}`,
  `/aurora-${SUFFIX_SPLAT}`,
  `/bella-${SUFFIX_SPLAT}`,
  `/bellona-${SUFFIX_SPLAT}`,
  `/brigid-${SUFFIX_SPLAT}`,
  `/calista-${SUFFIX_SPLAT}`,
  `/camilla-${SUFFIX_SPLAT}`,
  `/candace-${SUFFIX_SPLAT}`,
  `/carina-${SUFFIX_SPLAT}`,
  `/carmina-${SUFFIX_SPLAT}`,
  `/carola-${SUFFIX_SPLAT}`,
  `/chloe-${SUFFIX_SPLAT}`,
  `/clara-${SUFFIX_SPLAT}`,
  `/claudia-${SUFFIX_SPLAT}`,
  `/cora-${SUFFIX_SPLAT}`,
  `/corina-${SUFFIX_SPLAT}`,
  `/daria-${SUFFIX_SPLAT}`,
  `/davina-${SUFFIX_SPLAT}`,
  `/dulcea-${SUFFIX_SPLAT}`,
  `/echo-${SUFFIX_SPLAT}`,
  `/emilia-${SUFFIX_SPLAT}`,
  `/fauna-${SUFFIX_SPLAT}`,
  `/felicia-${SUFFIX_SPLAT}`,
  `/flora-${SUFFIX_SPLAT}`,
  `/gloria-${SUFFIX_SPLAT}`,
  `/gold-${SUFFIX_SPLAT}`,
  `/hanna-${SUFFIX_SPLAT}`,
  `/helena-${SUFFIX_SPLAT}`,
  `/honora-${SUFFIX_SPLAT}`,
  `/iona-${SUFFIX_SPLAT}`,
  `/isabella-${SUFFIX_SPLAT}`,
  `/isadora-${SUFFIX_SPLAT}`,
  `/jillian-${SUFFIX_SPLAT}`,
  `/johanna-${SUFFIX_SPLAT}`,
  `/juno-${SUFFIX_SPLAT}`,
  `/karena-${SUFFIX_SPLAT}`,
  `/laser-${SUFFIX_SPLAT}`,
  `/lenora-${SUFFIX_SPLAT}`,
  `/leona-${SUFFIX_SPLAT}`,
  `/liana-${SUFFIX_SPLAT}`,
  `/lorena-${SUFFIX_SPLAT}`,
  `/luna-${SUFFIX_SPLAT}`,
  `/natalia-${SUFFIX_SPLAT}`,
  `/night-${SUFFIX_SPLAT}`,
  `/ombre-${SUFFIX_SPLAT}`,
  `/paulina-${SUFFIX_SPLAT}`,
  `/penelope-${SUFFIX_SPLAT}`,
  `/petra-${SUFFIX_SPLAT}`,
  `/phoebe-${SUFFIX_SPLAT}`,
  `/pomona-${SUFFIX_SPLAT}`,
  `/portia-${SUFFIX_SPLAT}`,
  `/rosalina-${SUFFIX_SPLAT}`,
  `/rowena-${SUFFIX_SPLAT}`,
  `/roxana-${SUFFIX_SPLAT}`,
  `/sabina-${SUFFIX_SPLAT}`,
  `/samara-${SUFFIX_SPLAT}`,
  `/selena-${SUFFIX_SPLAT}`,
  `/semper-${SUFFIX_SPLAT}`,
  `/serena-${SUFFIX_SPLAT}`,
  `/silver-${SUFFIX_SPLAT}`,
  `/stretch-${SUFFIX_SPLAT}`,
  `/susanna-${SUFFIX_SPLAT}`,
  `/tatiana-${SUFFIX_SPLAT}`,
  `/thick-${SUFFIX_SPLAT}`,
  `/thin-${SUFFIX_SPLAT}`,
  `/valentina-${SUFFIX_SPLAT}`,
  `/valeria-${SUFFIX_SPLAT}`,
  `/veronica-${SUFFIX_SPLAT}`,
  `/vitalia-${SUFFIX_SPLAT}`,
];

export { prerenderRoutes, cacheRoutes }