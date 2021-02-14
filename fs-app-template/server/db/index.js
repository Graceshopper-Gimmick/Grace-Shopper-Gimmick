//this is the access point for all things database related!

const db = require("./db");

//const { User, Product, Cart } = require('./models');
const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const Order = require("./models/order");
const { Card } = require("@material-ui/core");

//associations could go here!
User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Order);
Cart.hasMany(Order);
//User.hasMany(Order)
Order.belongsTo(Product);
Order.belongsTo(Cart);
//Order.belongsTo(User)
// Cart.belongsToMany(Product, { through: 'Order' })
// Product.belongsToMany(Cart, { through: 'Order' })

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const users = await Promise.all([
    User.create({ email: "sjhunter86@gmail.com", password: "123" }),
    User.create({ email: "monil2912@test.com", password: "123" }),
    User.create({ email: "Msze400@gmail.com", password: "123" }),
    User.create({
      email: "arwindersinghh@gmail.com",
      password: "123",
      isAdmin: true,
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Beer Curler",
      category: "Culinary",
      price: 10,
      thumbnailImgUrl: "/assets/thumbnails/Beer_Curler_Thumbnail.jpg",
      description:
        "Have you ever been binge drinking and thought to yourself, 'I should workout more.' Us, too! Presenting: the Beer Curler! Drink with confidence as you burn calories while you get your party on.",
    }),
    Product.create({
      name: "Money Toilet Paper",
      category: "Home Decor",
      price: 15.2,
      thumbnailImgUrl: "/assets/thumbnails/Money_Toilet_Paper_Thumbnail.jpg",
      description:
        "Do you like to wipe your butt with really soft paper after you drop a deuce? Well then this probably isn't for you, but if you want to feel like a baller while you wipe, then Money Toilet Paper is the perfect item for you.",
    }),
    Product.create({
      name: "Diet Water",
      category: "Gag Gifts",
      price: 20.34,
      thumbnailImgUrl: "/assets/thumbnails/Diet_Water_Thumbnail.jpg",
      description:
        "Thirsty, but tired of your boring no-calorie water? Introducing Diet Water! It's the same as regular water, only it's diet!",
    }),
    Product.create({
      name: "Buff Squidward",
      category: "Home Decor",
      price: 30,
      thumbnailImgUrl: "/assets/thumbnails/Buff_Squidward_Thumbnail.jpg",
      description:
        "Who lifts in a pineapple under the sea? Squidward, that's who. Whenever you need that extra motivation to get back to the gym, what's better than looking at a Buff Squidward on your desk?",
    }),
    Product.create({
      name: "Anti-Theft Bag",
      category: "Culinary",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Anti_Theft_Bag_Thumbnail.jpg",
      description:
        "We've all had food stolen by a roommate, a family member, or maybe even a school bus driver while long sideburns. Buy these Anti Theft Bags to make your food look moldy and unappealing, and never go hungry again.",
    }),
    Product.create({
      name: "AT-AT BBQ GRILL",
      category: "Star Wars",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/AT_AT_BBQ_Thumbnail.jpg",
      description:
        "Where the BBQ AT-AT? Look no further. It's right here. Literally. An AT-AT with a grill inside.",
    }),
    Product.create({
      name: "Baby Mop",
      category: "Gag Gifts",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Baby_Mop_Thumbnail.jpg",
      description:
        "You feed them, you clothe them, you change their diapers. It's time we put these free-loading babies to work! Get the Baby Mop and turn your baby into a cleaning machine while finally getting a return on your investment!",
    }),
    Product.create({
      name: "Bacon Perfume",
      category: "Gag Gifts",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Bacon_Perfume_Thumbnail.jpg",
      description:
        "Do you want to smell like you just left a wedding reception at a Denny's? You're damn right you do. A few pumps of this Bacon Perfume will have you attracting all those breakfast-loving singles.",
    }),
    Product.create({
      name: "Baguette Pack",
      category: "Gag Gifts",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Baguette_Pack_Thumbnail.jpg",
      description:
        "Oui oui, poo poo, c'est la vie. Look cultured AF with this Baguette Pack on your back so you can whip out some of the best bread on the planet like a battle-tested samurai.",
    }),
    Product.create({
      name: "Beard Hat",
      category: "Apparel",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Beard_Hat_Thumbnail.jpg",
      description:
        "Do you live in Williamsburg, Brooklyn? Then chances are you already own 5 of these. For those that don't, get yourself a Beard Hat today and blend in with the cool guys at the craft beer bar wearing plaid.",
    }),
    Product.create({
      name: "Computer Privacy Hood",
      category: "Apparel",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Computer_Privacy_Thumbnail.jpg",
      description:
        "Ever wanted to look at the NSFW Reddit thread while you're in fact at work? Computer Privacy Hood lets you look at whatever you want, wherever you want, while also confusing absolutely anyone that can see you.",
    }),
    Product.create({
      name: "Darth Vader BBQ Apron",
      category: "Star Wars",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Darth_Vader_BBQ_Apron_Thumbnail.jpg",
      description:
        "If you're looking at this item, chances are you already own the AT-AT BBQ Grill and you need to complete the set. Complete your training and become a Dark Grill Lord of the Sith with this Darth Vader BBQ Apron.",
    }),
    Product.create({
      name: "Darth Vader Face Mask",
      category: "Star Wars",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Darth_Vader_Face_Mask_Thumbnail.jpg",
      description:
        "I know what you're thinking, and no, this mask doesn't change your voice when you talk. However, it does make you look like the baddest Skywalker to ever do it. Buy the Darth Vader Face Mask and make the voice sound effects yourself like the rest of us.",
    }),
    Product.create({
      name: "Eye Drop Funnel",
      category: "Gag Gifts",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Eyedrop_Funnel_Thumbnail.jpg",
      description:
        "How many dollars worth of eye drops have you wasted COMPLETELY missing your eye? Probably more than this Eye Drop Funnel costs. Make the investment and never waste your precious drops again.",
    }),
    Product.create({
      name: "Finger Pants",
      category: "Gag Gifts",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Finger_Pants_Thumbnail.jpg",
      description:
        "You want a roundhouse kick to the face while I'm wearing these bad boys? Forget about it. Get our your old tech-deck finger skateboard with a pair of these on your fingers and show Tony Hawk how it's done.",
    }),
    Product.create({
      name: "Han Solo Icecube Tray",
      category: "Star Wars",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Han_Solo_Icecube_Tray_Thumbnail.jpg",
      description:
        "He's no good to you dead. Have you ever seen something as spot-on as Han Solo Icecubes? Cool down your drink while feeling like the coolest person in the room with this Han Solo Icecube Tray.",
    }),
    Product.create({
      name: "Hand Holder",
      category: "Culinary",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Hand_Holder_Thumbnail.jpg",
      description:
        "If you don't trust yourself to chop those vegetables using your own hand as the guide, buy this freaky mannequin Hand Holder and feel like a serial killer while you chop your food. Hell, leave it in your fridge or freezer to scare unsuspecting company!",
    }),
    Product.create({
      name: "Hand Glass",
      category: "Culinary",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Handglass_Thumbnail.jpg",
      description:
        "There is no chance you'll lose your grip on this Hand Glass. Perfect indentations allow you to ergonomically hold this glass and look like Hulk after you put it down.",
    }),
    Product.create({
      name: "It's A Nap! Pillowcase",
      category: "Star Wars",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Its_A_Nap_Pillow_Case_Thumbnail.jpg",
      description:
        "Admiral Ackbar get's tired, too. He also wants to help you in your time of need. Catch some much needed zzz's while you're saving the Republic with the It's A Nap! pillowcase.",
    }),
    Product.create({
      name: "Noodle Fan",
      category: "Star Wars",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Noodle_Fan_Thumbnail.jpg",
      description:
        "What's worse than being so excited to eat your noodles that you burn the roof of your mouth because you didn't even blow on them? Noodle Fan to the rescue! Mount this awesome fan to your chopsticks and never burn your mouth again.",
    }),
    Product.create({
      name: "Shoe Umbrella",
      category: "Apparel",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Shoe_Umbrella_Thumbnail.jpg",
      description:
        "We're going to be honest with you here. These do not work, but they look hilarious. Make a statement with the Shoe Umbrella and see how many people compliment your trend-setting fashion choices.",
    }),
    Product.create({
      name: "T-Shirt Mask",
      category: "Apparel",
      price: 1,
      thumbnailImgUrl: "/assets/thumbnails/Tshirt_Mask_Thumbnail.jpg",
      description:
        "If you forgot your mask and home and also want to make strangers feel uncomfortable, get this T-Shirt Mask which offers you no real protection, but at least it looks hilarious.",
    }),
  ]);
  const [cody, murphy] = users;

  const cart = await Promise.all([
    Cart.create({
      userId: 1,
      active: true,
    }),
    Cart.create({ userId: 1, active: false }),
    Cart.create({ userId: 2, active: true }),
    Cart.create({ userId: 3, active: true }),
    Cart.create({ userId: 4, active: true }),
  ]);

  // Cart.create({ userId: 1, active: false }),

  // await cart.addProduct(products, {
  //     through: { Order: { productId: 1, cartId: 1 } },
  // })

  const order = await Promise.all([
    Order.create({ cartId: 1, productId: 5, quantity: 2 }), // active cart order
    Order.create({ cartId: 2, productId: 6, quantity: 1 }), // checked out cart order
    Order.create({ cartId: 2, productId: 4, quantity: 3 }), // checked out cart order
    Order.create({ cartId: 2, productId: 7, quantity: 5 }), // checked out cart order
  ]);
  return {
    users: {
      cody,
      murphy,
    },
  };
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Product,
    Cart,
    Order,
  },
};
