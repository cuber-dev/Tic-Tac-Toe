let formatPaths = [
    '5.x/identicon',
    '5.x/bottts',
    '4.x/pixel-art',
    '5.x/pixel-art-neutral',
    '5.x/adventurer',
    '5.x/thumbs',
    '5.x/icons',
    '5.x/adventurer-neutral',
    '5.x/avataaars',
    '5.x/avataaars-neutral',
    '5.x/big-ears',
    '5.x/big-ears-neutral',
    '5.x/big-smile',
    '5.x/bottts-neutral',
    '5.x/croodles',
    '5.x/croodles-neutral',
    '5.x/fun-emoji',
    '5.x/lorelei',
    '5.x/lorelei-neutral',
    '5.x/shapes'
  ];
  
export async function getImage(playerName){
  let random = Math.floor(Math.random() * formatPaths.length);
  let response = await fetch(`https://api.dicebear.com/${formatPaths[random]}/svg?seed=${playerName}`);
  let blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
}

getImage('Nandhu');
