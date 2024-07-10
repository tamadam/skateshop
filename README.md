# Skateshop Introduction

This project is an e-commerce platform designed to provide a seamless shopping experience. It includes an admin interface for managing products, orders, and related information such as categories, billboards, colors, and sizes. Additionally, it features a user-facing shop where customers can browse and purchase products.

You can try out the app by visiting the following link: https://skateshop-silk.vercel.app/

# Features & Technologies Used

- **Next.js & React**: Frontend built with Next.js for server-side rendering and React for a dynamic user interface.
- **CSS Styling**: Custom styles created using CSS.
- **Image Upload**: Functionality to upload and manage product images.
- **Admin Layout**: Dedicated admin interface for managing the webshop.
- **Stripe Integration**: Secure payment processing using Stripe.
- **Zod Validation**: Data validation using Zod for robust error handling.
- **Responsive Design**: Mobile-friendly design to provide a great user experience on any device.

# Screenshots

## Shop
You can browse skateboards, clothes and accessories and filter them by subcategory, brand, size, or color. Additionally, you can sort them using various options. <br /><br />
![shop1_skateboards](https://github.com/tamadam/skateshop/assets/60942087/9826c0a5-7de3-4181-8f64-30a4a94ea9ea)
<br /><br />
![image](https://github.com/tamadam/skateshop/assets/60942087/545766be-f880-433a-a4b3-9cc13a24701f)
<br /><br />
You can open the product page by clicking on the product, where you can find more detailed information about it.
<br /><br />
![image](https://github.com/tamadam/skateshop/assets/60942087/15f691c2-de2d-4e44-afd7-72fce4eb5d0d)

You can view your cart by clicking on the cart icon or by navigating to the cart page. <br /><br />
![image](https://github.com/tamadam/skateshop/assets/60942087/d177a7f0-48fc-4792-bf2a-d978024f657f) <br />
![image](https://github.com/tamadam/skateshop/assets/60942087/f2849ec7-3937-4504-9a4e-1a31c7a1680b)

You can make payments using Stripe. <br /><br />
![image](https://github.com/tamadam/skateshop/assets/60942087/3e8865b0-c1bf-4efb-8b62-fe0cd3c9568e)

You can view your previous orders on the Orders page. <br /><br />
![image](https://github.com/tamadam/skateshop/assets/60942087/a763a178-96d6-455d-bb63-c1e785a09b50)


## Admin Interface
If your role is admin, you can access the admin interface. Here, you can add new products, modify existing ones, and perform other administrative tasks.
<br /><br />
![image](https://github.com/tamadam/skateshop/assets/60942087/bb424cfe-fd35-4828-980f-098f836ef117)
<br />
![image](https://github.com/tamadam/skateshop/assets/60942087/f9547ad3-608c-4c8a-a7d8-ea792fc3390d)
<br />
![image](https://github.com/tamadam/skateshop/assets/60942087/f0ab187d-f9e7-48fb-9854-d4baaf2a9427)

# Installation

To run the program in development, you'll need to set up **NextAuth** for authentication, **Cloudinary** for managing images, a **Stripe** account for managing payments, and a PostgreSQL database, for example, using **Supabase**. Once you've completed these steps, create a `.env` file and include the following variables:

```
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_CLOUDINARY_API_KEY= 
NEXT_PUBLIC_CLOUDINARY_API_SECRET= 
STRIPE_API_SECRET=
STRIPE_WEBHOOK_SECRET=
```

Then, start the development server:

```bash
npm run dev
```

