const questionsByCategory = {
  music: [
    { number: 1, text: "Is the band Khruangbin originally from Thailand?" }, // ❌ No (they're from Texas)
    { number: 2, text: "Was Aretha Franklin the first woman ever inducted into the Rock and Roll Hall of Fame?" }, // ✅ Yes
    { number: 3, text: "Did Meshuggah's 1995 album popularize acoustic folk elements in metal?" }, // ❌ No
    { number: 4, text: "Did Toto compose the soundtrack for the 1984 film Dune directed by David Lynch?" }, // ✅ Yes
    { number: 5, text: "Does Pantera's 1992 album 'Vulgar Display of Power' feature the track 'Cemetery Gates'?" } // ❌ No
  ],
  health: [
    { number: 6, text: "Can an adult get shingles if they have never been exposed to the varicella zoster virus?" }, // ❌ No
    { number: 7, text: "Is vitamin B12 deficiency the primary cause of Parkinson’s disease?" }, // ❌ No
    { number: 8, text: "Is paralytic polio the most common form of poliovirus infection?" }, // ❌ No 
    { number: 9, text: "Is it safe for someone with a penicillin allergy to take a cephalosporin antibiotic?" }, // ✅ Yes
    { number: 10, text: "Is cataracts the most common cause of preventable blindness worldwide?" } // ✅ Yes
  ],
  geography: [
    { number: 11, text: "Is Kazakhstan the least populous country ending in '–stan'?" }, // ❌ No
    { number: 12, text: "Is Cuzco the oldest continuously inhabited city in South America?" }, // ✅ Yes
    { number: 13, text: "Is Tristan da Cunha the most remote island in the southern Atlantic Ocean?" }, // ✅ Yes
    { number: 14, text: "Is the River Liffey the principal river of Ireland?" }, // ❌ No (Shannon is)
    { number: 15, text: "Is the manat the currency of Azerbaijan?" } // ✅ Yes
  ],
  physics: [
    { number: 16, text: "Are electrons classified as fermions?" }, // ✅ Yes
    { number: 17, text: "Does the Planck distribution describe the velocity of particles in a gas at thermal equilibrium?" }, // ❌ No (Maxwell-Boltzmann does)
    { number: 18, text: "Does carbon-12 have a nuclear spin of zero in its ground state?" }, // ✅ Yes
    { number: 19, text: "When standing still on Earth, are we in an inertial frame of reference?" }, // ❌ No
    { number: 20, text: "Does a photon have a spin of 2?" } // ❌ No (spin = 1)
  ]
};

export default questionsByCategory;
