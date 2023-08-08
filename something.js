//verz reds
const bellatorScyP2 = 0.6235;
const bellatorScyRed = 0.8986;
const bellatorMax = [49, 24, 12];

const bellatorClawP2 = 0.5114;
const bellatorClawMax = 44;

const bellatorChallyP2 = 0.6235;
const bellatorChallyMax = 64;

const bellatorSotdAcc = 0.6047;
const bellatorSotdMax = 50;

const bellatorSwiftAcc = 0.4312;
const bellatorSwiftMax = 32;

const ultorScyP2 = 0.5878;
const ultorScyRed = 0.889;
const ultorMax = [50, 25, 12];

const ultorClawP2 = 0.4542;
const ultorClawMax = 46;

const ultorChallyP2 = 0.5878;
const ultorChallyMax = 67;

const ultorSotdAcc = 0.5651;
const ultorSotdMax = 51;

const ultorSwiftAcc = 0.3737;
const ultorSwiftMax = 34;

const ultorSalveScyAcc = 35044;
const ultorSalveScyMax = [57, 26, 13];
const ultorSalveBgsAcc = 77956;
const ultorSalveBgsMax = 89;

const scySwing = (acc, max, size = 3) => {
  let damage = 0;
  if (Math.random() < acc) {
    damage += Math.floor(Math.random() * (max[0] + 1));
  }
  if (Math.random() < acc) {
    damage += Math.floor(Math.random() * (max[1] + 1));
  }
  if (Math.random() < acc && size > 2) {
    damage += Math.floor(Math.random() * (max[2] + 1));
  }
  return damage;
};

const challySpec = (acc, max) => {
  let damage = 0;
  const secondAcc = acc * 0.75;
  if (Math.random() < acc) {
    damage += Math.floor(Math.random() * (max + 1));
  }
  if (Math.random() < secondAcc) {
    damage += Math.floor(Math.random() * (max + 1));
  }
  return damage;
};

const clawSpec = (acc, max) => {
  let damage = 0;
  //first roll
  if (Math.random() <= acc) {
    let newMax = max - 1;
    const hit = Math.floor(
      Math.random() * (newMax - Math.floor(max / 2) + 1) + Math.floor(max / 2)
    );
    damage += hit; //first
    damage += Math.floor(hit / 2); //second
    damage += 2 * Math.floor(Math.floor(hit / 2) / 2); //third & 4th
    damage += Math.random() < 0.5 ? 1 : 0; //extra
  }
  //second roll
  else if (damage === 0 && Math.random() <= acc) {
    const hit = Math.floor(
      Math.random() *
        (Math.floor((max * 7) / 8) - Math.floor((max * 3) / 8 + 1)) +
        Math.floor((3 / 8) * max)
    );
    damage += hit; //first
    damage += 2 * Math.floor(hit / 2); //second & third
    damage += Math.random() < 0.5 ? 1 : 0; //extra
  }
  //third roll
  else if (damage === 0 && Math.random() <= acc) {
    const hit = Math.floor(
      Math.random() *
        (Math.floor((max * 3) / 4) - Math.floor((max * 1) / 4) + 1) +
        Math.floor((1 / 4) * max)
    );
    damage += 2 * hit; //first & second
    damage += Math.random() < 0.5 ? 1 : 0; //extra
  }
  //fourth roll
  else if (damage === 0 && Math.random() <= acc) {
    const hit = Math.floor(
      Math.random() *
        (Math.floor((max * 5) / 4) - Math.floor((max * 1) / 4) + 1) +
        Math.floor((max * 1) / 4)
    );
    damage = hit;
  }
  //fifth roll
  else if (damage === 0 && Math.random() <= 0.5) {
    damage += 2;
  }
  return damage;
};

const normAtt = (acc, max) => {
  let damage = 0;
  if (Math.random() < acc) damage += Math.floor(Math.random() * (max + 1));
  return damage;
};

//25scy 2swift 2chally 4clawspec, 2claw scratch
//25scy 1swift 1chally 5clawspec, 3claw scratch
//25scy 6clawspec 4claw scratch

const redSkip = (start) => {
  let verzHP = Math.floor(3500 * start);
  let eastHP = 200;
  let westHP = 200;
  let swings = 25;
  let claws = 5;
  let chally = 1;
  let scratches = 3;
  let swifts = 1;
  let sotd = 0;
  let hitCrabs = !true // true = hit crabs (killed purple), !true = ignoreCrabs (left purple alive)

  // // reds
  if (hitCrabs) {
    for (let i = 0; i < 5; i++) {
      eastHP -= scySwing(ultorScyRed, ultorMax, 2);
      westHP -= scySwing(ultorScyRed, ultorMax, 2);
    }
  }

  // //  if dont need to 5t, scy verz
  if (hitCrabs) {
    if (eastHP >= 32) {
      eastHP -= scySwing(ultorScyRed, ultorMax, 2);
    } else {
      swings++;
    }
    if (westHP >= 32) {
      westHP -= scySwing(ultorScyRed, ultorMax, 2);
    } else {
        swings++;
    }
  }

  //   healing
  if (hitCrabs) {
    if (eastHP > 0) {
      verzHP += eastHP;
    }
    if (westHP > 0) {
      verzHP += westHP;
    }
    for (let h = 0; h < 7; h++) {
      if (Math.random() <= 0.75) {
        verzHP += Math.floor(Math.floor(Math.floor(Math.random() * 48) / 2) / 2);
      }
    }
  }

  //scythes
  for (let i = 0; i < swings; i++) {
    verzHP -= scySwing(bellatorScyP2, bellatorMax);
  }
  //claws
  for (let i = 0; i < claws; i++) {
    verzHP -= clawSpec(bellatorClawP2, bellatorClawMax);
  }

  //chally
  for (let i = 0; i < chally; i++) {
    verzHP -= challySpec(bellatorChallyP2, bellatorChallyMax);
  }

  //swift
  for (let i = 0; i < swifts; i++) {
    verzHP -= normAtt(bellatorSwiftAcc, bellatorSwiftMax);
  }

  //scratches
  for (let i = 0; i < scratches; i++) {
    verzHP -= normAtt(bellatorClawP2, bellatorClawMax);
  }

  //sotd
  for (let i = 0; i < sotd; i++) {
    verzHP -= normAtt(bellatorSotdAcc, bellatorSotdMax);
  }

  //thralls
  for (let t = 0; t < 30; t++) {
    verzHP -= Math.floor(Math.random() * 4);
  }

  // purple
  if (!hitCrabs) {
    verzHP -= (Math.floor(Math.random() * 11) + 65)
  }
  
  return verzHP <= 0;
};

for (let hp = 350; hp >= 300; hp -= 5) {
    let skips = 0;
    let attempts = 1000000;

    for (let i = 0; i < attempts; i++) {
        if (redSkip(hp / 1000)) {
            skips++
        }
    }

    console.log(`Starting HP = ${hp/10}% | skips odds = ${(skips / attempts * 100).toFixed(2)}%`)
}


// const timeToReds = () => {
//   let hp = 3500;
//   let hits = 0;
//   let autos = 0;
//   let timer = 3;
//   let playerTick = 3;
//   let purple = false;
//   let purpleSpawn;
//   while (hp >= (Math.floor(3500 * .35))) {
//     if (timer % 4 === 0) {
//       //Basic Purple Spawn Logic
//       if (Math.random() < (1 / 3) && purple === false) {
//         purple = true;
//         purpleSpawn = autos;
//         // hp -= ((Math.floor(Math.random() * 11) + 65) - scySwing(bellatorScyP2, bellatorMax))
//         // console.log(`Purple Spawned on tick: ${timer}!`)
//       }
      
//       // //Purple Left Alive
//       if (purple && autos >= (purpleSpawn + 2)) {
//         hp += (Math.floor(Math.random() * 3) + 9)
//       }
//       // console.log(`Verzik attaced on tick: ${timer}!`)
//       autos++
//     };

//     if (playerTick === timer) {
//       if (playerTick % 4 === 0) {
//         playerTick++;
//       }
//       if (timer % 4 != 0)  {
//           hp -= scySwing(ultorScyP2, ultorMax);
//           hp -= scySwing(ultorScyP2, ultorMax);
//           hp -= scySwing(ultorScyP2, ultorMax);
//           hp -= scySwing(ultorScyP2, ultorMax);
//           hp -= scySwing(ultorScyP2, ultorMax);
//           // console.log(`Players attacked on tick: ${timer}! - hp is now : ${hp}`)
//           playerTick += 5;
//           hits++
//         }
//     }
//     timer++;
//   }

//   return [hits, autos]

// }


// let avgHit = 0;
// let avgAutos = 0;
// let sims = 1000000;

// for (let i = 0; i < sims; i++) {
//   avgHit += timeToReds()[0]
//   avgAutos += timeToReds()[1]
// }

// console.log(`${avgHit / sims} , ${avgAutos / sims}`)


////////////////////////////////
/*

P1 :
accuracy formula to include str level
tick tracker
spec bar / regen tracker
rounding formula
brew/restore logic
+15ticks to p2 start
*/

/*
start tick
ignorePurple true/false
skip hit logic
lightning logic
purple logic - if (ignore) {} else {boak ticks lost}
red logic - if(ignore) {} else {hit reds to redThreshold | 5t thresholds , bp fixing}
*/

/*
log p1 time
log time to reds
log 1downs
log avg p2 end
*/