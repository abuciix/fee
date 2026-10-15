// Generated from UPDATED_PRICE_LIST.xlsx: HS chapters (categories) and the HS headings (sub-categories) found in the price list.
// `examples` are the most common product names under each heading.
export type HsHeading = { code: string; items: number; examples: string[] };
export type HsCategory = { chapter: string; name: string; headings: HsHeading[] };

export const HS_CATEGORIES: HsCategory[] = [
  {
    chapter: "33",
    name: "Cosmetics, perfumery & toiletries",
    headings: [
      { code: "3303", items: 487, examples: ["Conditioner", "Shampoo", "Body Lotion"] },
    ],
  },
  {
    chapter: "35",
    name: "Starches, glues & enzymes",
    headings: [
      { code: "3505", items: 6, examples: ["Industrial Starch", "Sole Glue", "Sole Glue Carmyfix Cm-"] },
      { code: "3506", items: 27, examples: ["Silicon Sealant", "Uhu All Purpose", "Strong Adhessive All Purpose"] },
    ],
  },
  {
    chapter: "36",
    name: "Explosives, fireworks & matches",
    headings: [
      { code: "3604", items: 19, examples: ["Firework", "Birthday Fire Sparklers Candle", "Roman Candle Firework"] },
      { code: "3605", items: 2, examples: ["Safety Matches"] },
    ],
  },
  {
    chapter: "39",
    name: "Plastics & plastic articles",
    headings: [
      { code: "3917", items: 114, examples: ["Pvc Transparent Hose", "Pvc Conduit", "Pvc Lay Flat Hose"] },
      { code: "3919", items: 37, examples: ["Ptfe Thread Seal Tape", "Flash Band", "Pvc Insulating Tape"] },
      { code: "3920", items: 3, examples: ["Sap", "Acrylic Sheet Any Size", "Polycarbonate"] },
      { code: "3921", items: 136, examples: ["Printed Table Cover", "Clear", "Pvc Foam Board"] },
      { code: "3923", items: 68, examples: ["Pet Bottle Preforms", "Shopping Plastic Bag", "Plastic Strawberry Clamshell Punnet Fruit Packaging"] },
      { code: "3924", items: 48, examples: ["Waste Bin", "Kitchen Dish Washing Cleaning Scrubber Sponge Pad", "Plastic Baby Nipple"] },
      { code: "3925", items: 17, examples: ["Pvc Cable Trunking", "Pvc Roofing Corrugated Sheet", "Pvc Corner Molding"] },
      { code: "3926", items: 286, examples: ["Melamine", "Pvc", "Baby Feeding Bottle With Or Without Brush"] },
    ],
  },
  {
    chapter: "42",
    name: "Leather articles, bags & belts",
    headings: [
      { code: "4202", items: 42, examples: ["Ladies Wallet", "School Bag Fabric", "Men Wallet"] },
      { code: "4203", items: 18, examples: ["Belt Waist", "Fabric Gym Glove", "Disposable Transparent Plastic Glove"] },
    ],
  },
  {
    chapter: "43",
    name: "Furskins & artificial fur",
    headings: [
      { code: "4304", items: 2, examples: ["Artificial Fur"] },
    ],
  },
  {
    chapter: "44",
    name: "Wood & wooden articles",
    headings: [
      { code: "4401", items: 2, examples: ["Carbonized Wooden Saw Dust", "Wooden Saw Dust"] },
      { code: "4405", items: 2, examples: ["Bamboo Stick For Incense Making"] },
      { code: "4407", items: 2, examples: ["Sawn Soft Timber"] },
      { code: "4411", items: 112, examples: ["Melamine Mdf", "Veneered Mdf", "Plain Mdf"] },
      { code: "4418", items: 3, examples: ["Wooden Timber Beam"] },
      { code: "4419", items: 1, examples: ["Wooden Kitchen Cooking Set"] },
      { code: "4421", items: 32, examples: ["Wooden Tooth Pick", "Wooden Tooth Pick Minted", "Wooden Match Splints"] },
    ],
  },
  {
    chapter: "48",
    name: "Paper & paperboard",
    headings: [
      { code: "4814", items: 5, examples: ["Wall Decore Paper", "Wall Paper", "Religious Poster"] },
    ],
  },
  {
    chapter: "54",
    name: "Man-made filaments & fabrics",
    headings: [
      { code: "5407", items: 202, examples: ["Sofa Material", "Polyester Suiting Material", "Lining Material"] },
    ],
  },
  {
    chapter: "56",
    name: "Nonwovens, twine & cordage",
    headings: [
      { code: "5603", items: 1, examples: ["Diaper Liner"] },
      { code: "5604", items: 1, examples: ["Center Cord Nylon Zipper Line Yarn"] },
      { code: "5609", items: 16, examples: ["Rope", "P.E.Ropes", "Cord Material"] },
    ],
  },
  {
    chapter: "57",
    name: "Carpets & floor coverings",
    headings: [
      { code: "5703", items: 7, examples: ["Wall To Wall Carpet", "Floor Carpet Or Rug", "Rug"] },
      { code: "5705", items: 6, examples: ["Praying Mat", "Bath Room Mat"] },
    ],
  },
  {
    chapter: "58",
    name: "Special woven fabrics & trimmings",
    headings: [
      { code: "5801", items: 6, examples: ["Trouser Lining"] },
      { code: "5806", items: 70, examples: ["Red Ribbon", "Trimming Material", "Fringe Band"] },
    ],
  },
  {
    chapter: "59",
    name: "Coated & laminated textiles",
    headings: [
      { code: "5903", items: 56, examples: ["Artificial", "Bag Material Polyester With P.V.C Baking Width"] },
    ],
  },
  {
    chapter: "60",
    name: "Knitted or crocheted fabrics",
    headings: [
      { code: "6001", items: 27, examples: ["Polyster Semi Finished Material", "Ready Made Sofa Cover Set", "Track Jacket Material Streched"] },
    ],
  },
  {
    chapter: "61",
    name: "Apparel, knitted or crocheted",
    headings: [
      { code: "6104", items: 17, examples: ["Children", "Bra", "Bra With Pant"] },
      { code: "6107", items: 13, examples: ["Mens Brief", "Childrens Brief", "Babys Brief"] },
      { code: "6108", items: 35, examples: ["Gown", "Swimming Cloth", "Swimming Pant"] },
      { code: "6109", items: 44, examples: ["Body T-Shirt", "T-Shirt", "Lady Track T-Shirt"] },
      { code: "6115", items: 40, examples: ["Strech Type Tight", "Short Tight", "Socks Children"] },
      { code: "6117", items: 9, examples: ["Muslim Lady Head And Face Cover", "Ladies Niqab", "Children"] },
    ],
  },
  {
    chapter: "62",
    name: "Apparel, not knitted",
    headings: [
      { code: "6203", items: 103, examples: ["Suit", "Jacket", "Coat"] },
      { code: "6204", items: 283, examples: ["Complete", "Trousers", "Frock Dress"] },
      { code: "6205", items: 15, examples: ["Shirt", "Shoulder Pad"] },
      { code: "6207", items: 12, examples: ["Singlet"] },
      { code: "6208", items: 36, examples: ["Pyjama", "Under Wear Skirt", "Maxi Under Wear"] },
      { code: "6209", items: 38, examples: ["Infant", "Romper", "Baby Flannel"] },
      { code: "6211", items: 201, examples: ["Track Suit Or Jogging Suit Jacket Only", "Track Suit Or Jogging Suit Trouser Only", "Track Suit Or Jogging Suit Jacket And Trouser"] },
      { code: "6213", items: 6, examples: ["Handkerchief"] },
      { code: "6214", items: 22, examples: ["Vello", "Sharp", "Scarf"] },
      { code: "6215", items: 6, examples: ["Neck Tie -"] },
    ],
  },
  {
    chapter: "63",
    name: "Other made-up textile articles",
    headings: [
      { code: "6301", items: 62, examples: ["Comfort", "Blanket", "Semi Finished Blanket"] },
      { code: "6302", items: 108, examples: ["Ready Made Bed Cover Without Pillow", "Ready Made Bed Sheet Without Pillow", "Ready Made Bed Sheet With Pillow"] },
      { code: "6303", items: 32, examples: ["Curtain Material Fabric", "Curtain Net", "Plastic Curtain"] },
      { code: "6304", items: 13, examples: ["Ready Made Sofa Cover Set"] },
      { code: "6306", items: 8, examples: ["Pe Tarpaulin Of Synthetic Fibers"] },
      { code: "6307", items: 3, examples: ["Synthetic Plas Chamois Fabric Car Cleaning Cloth", "Syntetical Chamois", "Aion Chamois Polishing Cloth"] },
    ],
  },
  {
    chapter: "64",
    name: "Footwear",
    headings: [
      { code: "6401", items: 1000, examples: ["Shoe", "Sport Shoe", "Leather Shoe"] },
      { code: "6402", items: 42, examples: ["Upper Shoe", "Out Sole", "Insole Pad Pvc"] },
      { code: "6403", items: 35, examples: ["Mid-Calf Boots Shoe", "Normal Shoe", "Over Knee High Boots Shoe"] },
      { code: "6404", items: 3, examples: ["Safety Shoes", "Men Sport Shoe Imitation Non Brand", "Men Safety Shoe Fabric"] },
      { code: "6405", items: 1, examples: ["Warm Bedroom Indoor Slipper Fabric"] },
    ],
  },
  {
    chapter: "65",
    name: "Headgear",
    headings: [
      { code: "6501", items: 26, examples: ["Cap", "Fabric Cap", "Ladys Cap With Scarf"] },
      { code: "6506", items: 6, examples: ["Safety Helmet", "Welding Face Shield", "Welding Mask"] },
    ],
  },
  {
    chapter: "66",
    name: "Umbrellas & walking sticks",
    headings: [
      { code: "6601", items: 24, examples: ["Beach Umbrella", "Garden Umbralla", "Umbrella"] },
    ],
  },
  {
    chapter: "67",
    name: "Artificial flowers & hair articles",
    headings: [
      { code: "6702", items: 58, examples: ["Flower", "Small Flower", "Artificial Flower"] },
      { code: "6703", items: 2, examples: ["Human Hair"] },
      { code: "6704", items: 2, examples: ["Synthetic Hair", "Animal Fiber"] },
    ],
  },
  {
    chapter: "68",
    name: "Stone, plaster & cement articles",
    headings: [
      { code: "6802", items: 8, examples: ["Marble Tile", "Granite Tile"] },
      { code: "6805", items: 18, examples: ["Sand Paper"] },
    ],
  },
  {
    chapter: "69",
    name: "Ceramic products",
    headings: [
      { code: "6907", items: 60, examples: ["Decorative Ceramics", "Mosaic Glass Tiles", "Mosaic Ceramics"] },
      { code: "6910", items: 51, examples: ["Bathtub", "Soap Holder", "Bath Tub"] },
      { code: "6911", items: 3, examples: ["Water Closet With Seat Cover", "Hand Wash Basin + Pedestal", "Flat Water Closet"] },
      { code: "6912", items: 197, examples: ["Plate", "Kitchen Equipment Granite Sinks Size", "Ceramic"] },
      { code: "6913", items: 27, examples: ["Ceramic Table Decoration", "Ceramic Flower Vase"] },
    ],
  },
  {
    chapter: "70",
    name: "Glass & glassware",
    headings: [
      { code: "7009", items: 208, examples: ["Glass Mirror", "Glass Photo Frame", "Glass Face Mirror"] },
      { code: "7013", items: 556, examples: ["Waterglass", "Wine Glass", "Storage Bowl"] },
    ],
  },
  {
    chapter: "71",
    name: "Imitation jewellery & stones",
    headings: [
      { code: "7117", items: 28, examples: ["Necklace", "Bangle", "Chain Jewllery"] },
    ],
  },
  {
    chapter: "73",
    name: "Iron & steel articles",
    headings: [
      { code: "7307", items: 12, examples: ["Galvnaized Malleable Iron Fittings", "Malleable", "Cast Iron Pipe Fittings"] },
      { code: "7313", items: 10, examples: ["Brush Wire", "Wire Rope Sling", "Wire Rope Steel"] },
      { code: "7315", items: 18, examples: ["Dog Chain", "Key Chain", "Chain"] },
      { code: "7317", items: 12, examples: ["Pin Nails", "Railing Rope", "Horse Shoe Nail"] },
      { code: "7318", items: 40, examples: ["Bolt", "Flat Washer", "Tie Clips"] },
      { code: "7320", items: 3, examples: ["Leaf Spring"] },
      { code: "7323", items: 476, examples: ["Tiffin", "Stainless Steel", "Deep Basin S"] },
      { code: "7324", items: 53, examples: ["Shower Head", "Flexible Hose", "Stainless Steel Floor Drain"] },
      { code: "7326", items: 43, examples: ["Plumb Bob", "Ladder Galvanized Double", "Key Hanger"] },
    ],
  },
  {
    chapter: "76",
    name: "Aluminium & aluminium articles",
    headings: [
      { code: "7604", items: 8, examples: ["Aluminium Bars", "Aluminium Profiles Ivory", "Aluminium Profile Silver"] },
      { code: "7607", items: 5, examples: ["Wrapping Material", "Aluminium Foil Roll Box", "Aluminium Foil Container"] },
      { code: "7608", items: 4, examples: ["Aluminium Pipe", "Aluminium Tubes"] },
      { code: "7610", items: 25, examples: ["Aluminium", "Aluminium Washer", "Aluminium Ladder"] },
      { code: "7615", items: 49, examples: ["Water Bottle", "Aluminium Pressure Pan With Lid", "Tope Casserole"] },
      { code: "7616", items: 32, examples: ["Aluminium Conductor", "Aluminium Coupling", "Aluminium Cover Plate"] },
    ],
  },
  {
    chapter: "82",
    name: "Tools, implements & cutlery",
    headings: [
      { code: "8201", items: 75, examples: ["Hoe Head", "Fork Head", "Pick Axe Head"] },
      { code: "8202", items: 2, examples: ["Bow Saw"] },
      { code: "8203", items: 103, examples: ["Combination Plier", "Long Nose Pliers", "Circlip Plier"] },
      { code: "8204", items: 305, examples: ["Combination Wrench", "Double Open End Wrench", "Double Open Ended Spanner"] },
      { code: "8205", items: 117, examples: ["Hammer With", "Claw Hammer With", "Screw Driver"] },
      { code: "8207", items: 183, examples: ["Drill Bits", "Drill Bit", "H.S Drill Bit"] },
      { code: "8211", items: 102, examples: ["Knife", "Kitchen Knife", "Carving Knife"] },
      { code: "8213", items: 21, examples: ["Scissors", "Folding Scissors"] },
      { code: "8215", items: 16, examples: ["Dinner", "Coffee", "Fork"] },
    ],
  },
  {
    chapter: "83",
    name: "Miscellaneous base-metal articles",
    headings: [
      { code: "8301", items: 16, examples: ["Padlock Brass", "Car Blank Key", "Door Blank Key"] },
      { code: "8302", items: 99, examples: ["Caster Wheel Set Of", "Gate", "Steel Tower Bolt"] },
      { code: "8305", items: 40, examples: ["Staples Wire", "Stapler Wire F-", "Binder Clip"] },
      { code: "8307", items: 4, examples: ["Curtain Rod", "Shower Curtain Rod"] },
      { code: "8308", items: 17, examples: ["Shelf Hook", "Shoe Hook", "Metal Shoe Hook"] },
      { code: "8311", items: 3, examples: ["Welding Electrodes", "Soldering Wire"] },
    ],
  },
  {
    chapter: "84",
    name: "Machinery & mechanical appliances",
    headings: [
      { code: "8423", items: 16, examples: ["Electronic Plate Form Scale", "Hanging Scale", "Portable Mini Digital Scale"] },
      { code: "8471", items: 4, examples: ["Computer Mouse Usb", "Wired Keyboard", "Computer Mouse Wireless"] },
      { code: "8481", items: 90, examples: ["Brass", "Ppr Ball Valve", "Ppr Stop Valve"] },
    ],
  },
  {
    chapter: "85",
    name: "Electrical machinery & equipment",
    headings: [
      { code: "8504", items: 7, examples: ["Mobile Phone Charger With", "Mobile Phone Charger Small Pin No Usb For Feature Phone", "Mobile Phone Chareger Head"] },
      { code: "8506", items: 6, examples: ["Drycell Battery"] },
      { code: "8507", items: 1, examples: ["Mobile Phone Battery"] },
      { code: "8509", items: 33, examples: ["High Speed Multifunctional Coffee Grinder", "Electrical Multifunctional Onion Chopper", "Multi Functional Electric Juice Blender"] },
      { code: "8512", items: 11, examples: ["Wiper Blade"] },
      { code: "8516", items: 72, examples: ["Water Boiler", "Electric Steam Iron", "Electric Kettle"] },
      { code: "8518", items: 26, examples: ["Multimedia Speaker With Woofer", "Trolley Speaker", "Box Active Speaker With Wireless Mic"] },
      { code: "8527", items: 1, examples: ["Car Mp"] },
      { code: "8529", items: 8, examples: ["Dish Satellite", "Universal Lnb Ku Band", "Satellite Receiver In Skd"] },
      { code: "8536", items: 46, examples: ["Plastic Distribution Box", "Plastic Junction Box", "Connector"] },
      { code: "8543", items: 1, examples: ["Tv Remote Control"] },
      { code: "8544", items: 101, examples: ["Electric Cable", "Electric Extension Cable", "Hdmi Cable"] },
    ],
  },
  {
    chapter: "86",
    name: "Railway equipment & containers",
    headings: [
      { code: "8609", items: 6, examples: [] },
    ],
  },
  {
    chapter: "90",
    name: "Optical & measuring instruments",
    headings: [
      { code: "9017", items: 18, examples: ["Measuring Tape"] },
    ],
  },
  {
    chapter: "91",
    name: "Clocks & watches",
    headings: [
      { code: "9102", items: 978, examples: ["Citizen Brand Hand Watch", "Hand Watch For Men", "Bulova Brand Hand Watch"] },
      { code: "9105", items: 2, examples: ["Table Clock", "Wall Clock With Out Battery"] },
    ],
  },
  {
    chapter: "94",
    name: "Furniture, bedding & lighting",
    headings: [
      { code: "9401", items: 448, examples: ["Chair", "Fabric Sofa Set", "Half Leather Sofa Set"] },
      { code: "9403", items: 885, examples: ["Rectangular", "Tv Stand", "Dining Set"] },
      { code: "9404", items: 13, examples: ["Sleeping Bag", "Steel Shelf"] },
      { code: "9405", items: 359, examples: ["Crystal Chandelier Light Fixture", "Led Ceiling Light", "Led Crystal Modern Flash Mount Ceiling Light With Bt Speaker"] },
    ],
  },
  {
    chapter: "95",
    name: "Toys, games & sports goods",
    headings: [
      { code: "9503", items: 127, examples: ["Toy", "Toy Gun", "Baby Toy Kitchen Set"] },
      { code: "9504", items: 5, examples: ["Joystick", "Playing Card", "Joystick For Computer Game"] },
      { code: "9505", items: 32, examples: ["Birthday Decoration", "Birthday Balloon Stand Plastic", "Birthday Balloon Stick"] },
      { code: "9506", items: 112, examples: ["Foot Ball", "Volley Ball", "Hand Ball"] },
    ],
  },
  {
    chapter: "96",
    name: "Miscellaneous manufactured articles",
    headings: [
      { code: "9603", items: 59, examples: ["Brush", "Wheel Brush", "Tooth Brush"] },
      { code: "9606", items: 2, examples: ["Button"] },
      { code: "9607", items: 21, examples: ["Zipper", "Metal Zipper", "Jacket Zipper"] },
      { code: "9608", items: 4, examples: ["Permanent Marker", "Executive", "White Board Marker"] },
      { code: "9609", items: 2, examples: ["Chalk"] },
      { code: "9610", items: 39, examples: ["White Board", "Notice Board", "Cork Board"] },
      { code: "9611", items: 22, examples: ["Self Inking Stamp", "Stamp", "Stamp Pad Frame Plastic"] },
      { code: "9613", items: 5, examples: ["Gas Lighter", "Disposable Gas Lighter", "Disposable Gas Lighter With Torch"] },
      { code: "9615", items: 32, examples: ["Hair Band", "Baby Ponytail", "Colour Comb"] },
      { code: "9616", items: 7, examples: ["Nilo Cottonstick Plastic", "Cotton Bud", "Cotton Buds"] },
      { code: "9617", items: 32, examples: ["Flask"] },
      { code: "9618", items: 34, examples: ["Mannequin", "Inflatable Mannequin"] },
    ],
  },
];
