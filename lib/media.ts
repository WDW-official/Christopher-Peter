const cloudinary = 'https://res.cloudinary.com/dzn1k1z8r/image/upload';
const photo = (version: string, name: string) =>
  `${cloudinary}/v${version}/${name}.jpg`;

// Supplied originals; retain archive spreads intact and keep source identifiers.
export const photos = {
  surveying8: photo('1795039906', 'Quantity_Surveying_8_luhstf'),
  surveying9: photo('1795039916', 'Quantity_Surveying_9_xufbwe'),
  surveying10: photo('1795039926', 'Quantity_Surveying_10_r57uz8'),
  surveying11: photo('1795039936', 'Quantity_Surveying_11_srmcap'),
  workshop4: photo('1795040276', 'Indoor_Workshop_4_e5poqr'),
  knitting1: photo('1795040286', 'Knitting_1_vpc8ly'),
  knitting2: photo('1795040301', 'Knitting_2_uivrpi'),
  tieDye4: photo('1795040430', 'Tie-Dye_4_haxthc'),
  tieDye8: photo('1795040471', 'Tie-Dye_8_fuxer6'),
  construction1: photo('1795040726', 'Building_Construction_1_itkvrb'),
  construction4: photo('1795040742', 'Building_Construction_4_evzcsu'),
  construction2: photo('1795040805', 'Building_Construction_2_cgpn5v'),
  construction3: photo('1795041003', 'Building_Construction_3_zimx7x'),
  construction5: photo('1795041015', 'Building_Construction_5_nzqb5o'),
  tiling4: photo('1795041026', 'Tiling_and_Decorative_4_eu1xhv'),
  construction6: photo('1795041039', 'Building_Construction_6_tfnrtk'),
  construction7: photo('1795041307', 'Building_Construction_7_wgrifu'),
  construction8: photo('1795041412', 'Building_Construction_8_elmtaw'),
  tiling1: photo('1795041427', 'Tiling_and_Decorative_1_rnks54'),
  tiling2: photo('1795041442', 'Tiling_and_Decorative_2_ebfocm'),
  tiling3: photo('1795041458', 'Tiling_and_Decorative_3_nlgwxg'),
  tiling5: photo('1795041474', 'Tiling_and_Decorative_5_nwsfb2'),
  tiling6: photo('1795041486', 'Tiling_and_Decorative_6_iqrh9z'),
  tiling7: photo('1795041500', 'Tiling_and_Decorative_7_rolo4i'),
  tiling8: photo('1795041521', 'Tiling_and_Decorative_8_wwjqzp'),

  crafts2021: photo('1794721764', '79453_xu2p2s'),
  shoemaking2021: photo('1794721769', '79451_kjgour'),
  certificates2021: photo('1794721791', '79461_vx1k0h'),
  livelihoods2021: photo('1794721800', '79455_oocnyy'),
  graduation2021: photo('1794721806', '79457_vuj3pk'),
  edition1: photo('1794721813', '79486_ny8h7p'),
  trainingRegister: photo('1794721835', '79498_awzqmw'),
  learningArchive: photo('1794721843', '79496_etvlzf'),
  literacyGraduates: photo('1794721850', '79500_h8f1uq'),
  plumbing2022: photo('1794721858', '79470_u283l5'),
  building2022: photo('1794721865', '79468_goetaa'),
  textiles2022: photo('1794721873', '79472_a1j70f'),
  livelihoods2022: photo('1794721880', '79475_n9xih9'),
  edition3: photo('1794721887', '79479_qzetyn'),
  recognition2022: photo('1794721894', '79482_x7yaa0'),
  workshop2: photo('1794721916', 'Indoor_Workshop_2_fhq4oa'),
  workshop3: photo('1794721924', 'Indoor_Workshop_3_gwoh3u'),
  surveying1: photo('1794721931', 'Quantity_Surveying_1_qufwds'),
  surveying2: photo('1794721938', 'Quantity_Surveying_2_ssnido'),
  surveying3: photo('1794721946', 'Quantity_Surveying_3_qmytjr'),
  surveying4: photo('1794721957', 'Quantity_Surveying_4_mg835e'),
  surveying5: photo('1794721972', 'Quantity_Surveying_5_vwwr6f'),
  surveying6: photo('1794721985', 'Quantity_Surveying_6_bfqvxu'),
  surveying7: photo('1794721995', 'Quantity_Surveying_7_rav01j'),
  tieDye: photo('1794722007', 'Tie-Dye_1_tw90r5'),
  tieDye3: photo('1794722605', 'Tie-Dye_3_kyaxg9'),
  solar1: photo('1794722610', 'Solar_Panels_1_xxmrcg'),
  solar2: photo('1794722618', 'Solar_Panels_2_uvihcr'),
  solar3: photo('1794722626', 'Solar_Panels_3_mmfcsk'),
  solar4: photo('1794722633', 'Solar_Panels_4_shzkwk'),
  solar5: photo('1794722639', 'Solar_Panels_5_mpgkat'),
};

// Remove screenshot borders from web views; gallery links retain the originals.
const displayCrops = new Map([
  ...[
    photos.solar1,
    photos.solar2,
    photos.solar3,
    photos.solar4,
    photos.solar5,
  ].map((url) => [url, 'c_crop,g_north_west,x_0,y_180,w_670,h_1150'] as const),
  [photos.tieDye3, 'c_crop,g_north_west,x_0,y_0,w_1536,h_1155'] as const,
]);
export function displayPhoto(url: string) {
  const crop = displayCrops.get(url);
  return crop ? url.replace('/image/upload/', `/image/upload/${crop}/`) : url;
}

export const billiriCredit =
  'Nigerian Correctional Service, Billiri Medium Security Custodial Centre';
export const archiveCredit = (period?: string) =>
  `${billiriCredit}${period ? ` · ${period}` : ' · Historical newsletter archive'}`;
