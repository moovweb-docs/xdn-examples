/**
 * -------- PLPs -----------
 * - /venia-bottoms.html
 * - /venia-bottoms/venia-pants.html
 * - /venia-bottoms/venia-skirts.html
 * - /venia-tops.html
 * - /venia-tops/venia-blouses.html
 * - /venia-tops/venia-sweaters.html
 * - /venia-dresses.html
 * - /venia-accessories.html
 * - /venia-accessories/venia-belts.html
 * - /venia-accessories/venia-jewelry.html
 * - /venia-accessories/venia-scarves.html
 * - /shop-the-look.html
 * - /shop-the-look/minimalist-sensibility.html
 * - /shop-the-look/outside-the-lines.html
 * - /shop-the-look/carefree-days.html
 * - /shop-the-look/perfectly-beachy.html
 * - /shop-the-look/retire-your-lbd.html
 * - /shop-the-look/timeless-sophistication.html
 */

/* SCRAPPER CODE 1 START: scrapPdpHrefs */
/* paste the following code in Chrome -> DevTools -> Console */
async function scrapPdpHrefs({
  pdpLinkSelector,
  nextPageSelector,
  _pdpHrefs = [],
}) {
  console.log('__  ~ scrapPdpHrefs ~ _pdpHrefs', _pdpHrefs);
  const pdpLinks = document.querySelectorAll(pdpLinkSelector);
  pdpLinks.forEach(link => _pdpHrefs.push(link.attributes.href.value));

  nextPage = document.querySelector(nextPageSelector);
  if (nextPage) {
    nextPage.click();
    await new Promise(resolve => setTimeout(resolve, 2000)); // sleep
    return scrapPdpHrefs({
      pdpLinkSelector,
      nextPageSelector,
      _pdpHrefs,
    });
  } else {
    return _pdpHrefs;
  }
}

let res = await scrapPdpHrefs({
  pdpLinkSelector: '[class*="gallery-items"] a[class*="item-name"]',
  nextPageSelector: 'button[aria-label="move to the next page"]:not([disabled])',
});
res = res.sort()
console.log('res: ', res);

console.log('!!! RESULT OUT: ');
console.log(res.reduce((acc, link) => acc.concat(`'${link}',` + '\n'), ''))
/* SCRAPPER CODE 1 END: scrapPdpHrefs */

// RESULT:
/*
/// bottoms
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

/// tops
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

/// dresses:
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

/// accessories
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

/// shop-the-look
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
*/